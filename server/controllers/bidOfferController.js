const db = require("../db/models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

class BidOfferController {
    async getBidOffers(req, res) {
        const { clientId } = req.params;

        if (!clientId) {
            return res.status(400).json({
                message: "Id of a bid is required",
            });
        }

        const normalizedClientId = Number(clientId);

        if (!Number.isInteger(normalizedClientId)) {
            return res.status(400).json({
                message: "Bid Id must be an integer",
            });
        }

        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "No token provided, authorization denied",
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== "Client") {
                return res.status(401).json({
                    message: "You are not a client",
                });
            }

            if (decoded.id !== normalizedClientId) {
                return res.status(403).json({
                    message: "Forger JWT detected. Access denied",
                });
            }

            const foundBids = await db.Bid.findAll({
                where: {
                    clientId: normalizedClientId,
                    isTaken: false,
                },
                include: {
                    model: db.Client,
                },
            });

            let offersToSearch = [];

            foundBids.forEach((element) => {
                offersToSearch.push({ bidId: element.id });
            });

            console.log(offersToSearch);

            const foundOffers = await db.BidOffer.findAll({
                where: {
                    [Op.or]: offersToSearch,
                },
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                        "freelancerId",
                        "bidId",
                    ],
                },
                include: [
                    {
                        model: db.Freelancer,
                        attributes: {
                            exclude: [
                                "createdAt",
                                "updatedAt",
                                "piclink",
                                "specId",
                                "userId",
                                "id",
                            ],
                        },
                    },
                    {
                        model: db.Bid,
                        attributes: {
                            exclude: [
                                "createdAt",
                                "updatedAt",
                                "id",
                                "specId",
                                "isTaken",
                                "clientId",
                            ],
                        },
                    },
                ],
            });

            return res.status(200).json({
                message: foundOffers,
            });
        } catch (e) {
            if (e.name === "JsonWebTokenError") {
                return res.status(401).json({
                    message: "Invalid token",
                });
            }
            if (e.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Token has expired",
                });
            }

            return res.status(500).json({
                message: e.message,
            });
        }
    }
    // 1) Выложить оффер
    async createOffer(req, res) {
        const { freelancerId, bidId, freelancerMessage } = req.body;

        if (!freelancerId || !bidId || !freelancerMessage) {
            return res.status(400).json({
                message:
                    "freelancerId, bidId, freelancerMessage cannot be null",
            });
        }

        const normalizedFreelancerId = Number(freelancerId);
        const normalizedBidId = Number(bidId);

        if (
            !Number.isInteger(normalizedFreelancerId) ||
            !Number.isInteger(normalizedBidId)
        ) {
            return res.status(400).json({
                message: "freelancerId and/or bidId must be an integer number",
            });
        }

        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "No token provided, authorization denied",
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== "Freelancer") {
                return res.status(403).json({
                    message: "You are not a freelancer",
                });
            }

            const existingFreelancer = await db.Freelancer.findOne({
                where: {
                    id: normalizedFreelancerId,
                },
            });

            if (!existingFreelancer) {
                return res.status(404).json({
                    message: `Freelancer with id: ${normalizedFreelancerId} doesn't exist`,
                });
            }

            if (existingFreelancer.id !== decoded.id) {
                return res.status(401).json({
                    message: "Forged token detected. Access denied.",
                });
            }

            const existingBid = await db.Bid.findOne({
                where: {
                    id: normalizedBidId,
                },
            });

            if (!existingBid) {
                return res.status(404).json({
                    message: `Bid with id: ${normalizedBidId} doesn't exist`,
                });
            }

            if (existingBid.isTaken === true) {
                return res.status(409).json({
                    message: "This bid is already taken",
                });
            }

            const existingBidOffer = await db.BidOffer.findOne({
                where: {
                    freelancerId: normalizedFreelancerId,
                    bidId: normalizedBidId,
                },
            });

            if (existingBidOffer) {
                return res.status(400).json({
                    message: "Offer already exists",
                });
            }

            const newBidOffer = await db.BidOffer.create({
                freelancerId: normalizedFreelancerId,
                bidId: normalizedBidId,
                freelancerMessage: freelancerMessage,
            });

            console.log("SUCCESS");
            return res.status(201).json({
                message: newBidOffer,
            });
        } catch (e) {
            if (e.name === "JsonWebTokenError") {
                return res.status(401).json({
                    message: "Invalid token",
                });
            }
            if (e.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Token has expired",
                });
            }

            return res.status(500).json({
                message: e.message,
            });
        }
    }

    async rejectOffer(req, res) {
        const { id } = req.params;

        const normalizedId = Number(id);

        if (!Number.isInteger(normalizedId)) {
            return res.status(400).json({
                message: "Id must be an integer",
            });
        }
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "No token provided, authorization denied",
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== "Client") {
                return res.status(403).json({
                    message: "You are not a client",
                });
            }

            const foundBidOffer = await db.BidOffer.findByPk(normalizedId, {
                include: {
                    model: db.Bid,
                    include: {
                        model: db.Client,
                    },
                },
            });

            if (!foundBidOffer) {
                return res.status(404).json({
                    message: "Couldn't find bid offer with id " + normalizedId,
                });
            }

            if (foundBidOffer.Bid.Client.id !== decoded.id) {
                return res.status(403).json({
                    message: "Not your project",
                });
            }

            await foundBidOffer.destroy();

            return res.status(204).json();
        } catch (e) {
            if (e.name === "JsonWebTokenError") {
                return res.status(401).json({
                    message: "Invalid token",
                });
            }
            if (e.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Token has expired",
                });
            }

            return res.status(500).json({
                message: e.message,
            });
        }
    }

    async acceptBidOffer(req, res) {
        const { id } = req.params;

        const normalizedId = Number(id);

        if (!Number.isInteger(normalizedId)) {
            return res.status(400).json({
                message: "Id must be an integer",
            });
        }
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "No token provided, authorization denied",
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== "Client") {
                return res.status(403).json({
                    message: "You are not a client",
                });
            }

            const foundBidOffer = await db.BidOffer.findByPk(normalizedId, {
                include: {
                    model: db.Bid,
                    include: {
                        model: db.Client,
                    },
                },
            });

            if (!foundBidOffer) {
                return res.status(404).json({
                    message: "Couldn't find bid offer with id " + normalizedId,
                });
            }

            if (foundBidOffer.Bid.Client.id !== decoded.id) {
                return res.status(403).json({
                    message: "Not your project",
                });
            }

            const foundBid = await db.Bid.findByPk(foundBidOffer.bidId);
            await foundBid.update({
                isTaken: true,
            });

            const newFreelancerBid = await db.FreelancerBid.create({
                freelancerId: foundBidOffer.freelancerId,
                bidId: foundBidOffer.bidId,
                deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                assigned: new Date(),
                clientMessage: null,
                freelancerMessage: null,
                status: "In Progress",
            });

            await foundBidOffer.destroy();

            return res.status(204).json();
        } catch (e) {
            if (e.name === "JsonWebTokenError") {
                return res.status(401).json({
                    message: "Invalid token",
                });
            }
            if (e.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Token has expired",
                });
            }

            return res.status(500).json({
                message: e.message,
            });
        }
    }
}

module.exports = new BidOfferController();
