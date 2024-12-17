const db = require("../db/models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

class BidController {
    // Просмотреть все выложенные невзятые проекты
    async getBidsBySpec(req, res) {
        const { id } = req.params;

        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "No token provided, authorization denied",
            });
        }

        const normalizedId = Number(id);

        if (!Number.isInteger(normalizedId)) {
            return res.status(400).json({
                message: "Freelancer Id must be an integer",
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== "Freelancer") {
                return res.status(401).json({
                    message: "You are not a freelancer",
                });
            }

            if (decoded.id !== normalizedId) {
                return res.status(403).json({
                    message: "Forged JWT detected. Access denied",
                });
            }

            const freelancer = await db.Freelancer.findOne({
                where: {
                    id: normalizedId,
                },
            });

            if (!freelancer) {
                return res.status(404).json({
                    message: `Freelancer with id: ${normalizedId} doesn't exist`,
                });
            }

            const foundBids = await db.Bid.findAll({
                where: {
                    isTaken: false,
                    specId: freelancer.specId,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "specId"],
                },
                include: [
                    {
                        model: db.Spec,
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "id"],
                        },
                    },
                    {
                        model: db.Client,
                        attributes: {
                            exclude: [
                                "createdAt",
                                "updatedAt",
                                "userId",
                                "id",
                                "piclink",
                            ],
                        },
                    },
                ],
            });

            if (foundBids.length === 0) {
                return res.status(404).json({
                    message: "There are available bids",
                });
            }

            return res.status(200).json({
                message: foundBids,
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
    async getClientBids(req, res) {
        const { clientId } = req.params;

        const normalizedClientId = Number(clientId);

        if (!Number.isInteger(normalizedClientId)) {
            return res.status(400).json({
                message: "Client id must be an integer",
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
                    message: "Forged JWT detected. Access denied",
                });
            }

            const bids = await db.Bid.findAll({
                where: {
                    clientId: normalizedClientId,
                    isTaken: false,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "specId"],
                },
                include: {
                    model: db.Spec,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "id"],
                    },
                },
            });

            return res.status(200).json({
                message: bids,
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

module.exports = new BidController();
