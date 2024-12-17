const db = require("../db/models");
const { Op, where } = require("sequelize");
const jwt = require("jsonwebtoken");

class FreelanceBidController {
    // 1) Просмотр всех проектов для клиента
    async getAllClient(req, res) {
        const { clientId } = req.params;

        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "No token provided, authorization denied",
            });
        }

        const normalizedClientId = Number(clientId);

        if (!Number.isInteger(normalizedClientId)) {
            return res.status(400).json({
                message: "Client id must be an integer",
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
                    message: "Forget JWT detected. Access denied",
                });
            }

            const foundClient = await db.Client.findAll({
                where: {
                    id: normalizedClientId,
                },
                include: {
                    model: db.Bid,
                },
            });

            // console.log(foundClient);

            let bidsToSearch = [];

            foundClient.forEach((element) => {
                if (element.Bid !== null) {
                    bidsToSearch.push({
                        bidId: element.Bid.id,
                    });
                }
            });

            console.log(bidsToSearch);

            const freelancerBids = await db.FreelancerBid.findAll({
                where: {
                    [Op.or]: bidsToSearch,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                include: [
                    {
                        model: db.Bid,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    },
                    {
                        model: db.Freelancer,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                        include: {
                            model: db.Spec,
                            exclude: ["createdAt", "updatedAt", "id"],
                        },
                    },
                ],
            });

            // if (freelancerBids.length === 0) {
            //     return res.status(404).json({
            //         message: "You have no active projects",
            //     });
            // }

            return res.status(200).json({
                message: freelancerBids,
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

    // 2) Все нынешние проекты фрилансера
    async getAllFreelancer(req, res) {
        const { freelancerId } = req.params;

        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "No token provided, authorization denied",
            });
        }

        const normalizedFreelancerId = Number(freelancerId);

        if (!Number.isInteger(normalizedFreelancerId)) {
            return res.status(400).json({
                message: "Freelancer id must be an integer",
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== "Freelancer") {
                return res.status(401).json({
                    message: "You are not a freelancer",
                });
            }

            if (decoded.id !== normalizedFreelancerId) {
                return res.status(403).json({
                    message: "Forget JWT detected. Access denied",
                });
            }

            const found = await db.FreelancerBid.findAll({
                where: {
                    freelancerId: normalizedFreelancerId,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                include: {
                    model: db.Bid,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                    include: {
                        model: db.Client,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"],
                        },
                    },
                },
            });

            if (found.length === 0) {
                return res.status(404).json({
                    message: "You have no active projects",
                });
            }

            return res.status(200).json({
                message: found,
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
    // 5) получение детальной информации по ID;
    async getById(req, res) {
        const { id } = req.params;
        const jsonRes = {
            success: false,
        };

        const numberId = Number(id);
        if (!Number.isInteger(numberId)) {
            jsonRes.data = "Id can only be an integer number";

            res.status(400).json(jsonRes);
            return;
        }

        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                data: "No token provided, authorization denied",
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.role !== "Freelancer") {
                return res.status(403).json({
                    success: false,
                    data: "Access denied, you are not a freelancer",
                });
            }
            const found = await db.FreelancerBid.findAll({
                where: {
                    freelancerId: numberId,
                },
                include: { all: true },
            });

            if (found.length === 0) {
                jsonRes.data =
                    "Couldn't find a row with specified id. Id: " + numberId;

                res.status(404).json(jsonRes);
                return;
            }

            jsonRes.success = true;
            jsonRes.data = found;

            res.status(200).json(jsonRes);
        } catch (e) {
            jsonRes.data = e.message;
            if (e.name === "JsonWebTokenError") {
                return res.status(401).json({
                    success: false,
                    data: "Invalid token",
                });
            }
            if (e.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    data: "Token has expired",
                });
            }

            res.status(500).json(jsonRes);
        }
    }
    // 1) Отсылка заказчику задания
    async reportCompletion(req, res) {
        const { freelancerMessage } = req.body;
        const { freelid, bidid } = req.params;

        const numberFreelid = Number(freelid);
        if (!Number.isInteger(numberFreelid)) {
            return res.status(400).json({
                message: "Id can only be integer",
            });
        }

        const numberBidid = Number(bidid);
        if (!Number.isInteger(numberBidid)) {
            return res.status(400).json({
                message: "Id can only be integer",
            });
        }

        if (!freelancerMessage) {
            return res.status(400).json({
                message: "Specify freelancerMessage",
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
                    message: "You are not a freelancer. Access denied.",
                });
            }

            if (decoded.id !== numberFreelid) {
                return res.status(401).json({
                    message: "Forged JWT detected. Access denied.",
                });
            }

            const existingFreelancer = await db.Freelancer.findOne({
                where: {
                    id: numberFreelid,
                },
            });

            if (!existingFreelancer) {
                return res.status(404).json({
                    message: `Freelancer with id: ${numberFreelid} doesn't exist`,
                });
            }

            const found = await db.FreelancerBid.findOne({
                where: {
                    freelancerId: numberFreelid,
                    bidId: numberBidid,
                },
            });

            if (!found) {
                return res.status(404).json({
                    message: "Couldn't find your bid with id: " + numberBidid,
                });
            }

            if (found.status === "Pending Review") {
                return res.status(409).json({
                    message:
                        "The project is already pending review. You cannot update it.",
                });
            }

            await found.update({
                freelancerMessage: freelancerMessage,
                status: "Pending Review",
            });

            res.status(204).json();
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

module.exports = new FreelanceBidController();
