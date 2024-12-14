const db = require("../db/models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

class BidOfferController {
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
}

module.exports = new BidOfferController();
