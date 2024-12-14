const db = require("../db/models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

class BidHistoryController {
    async getHistory(req, res) {
        const { freelancerId } = req.params;

        if (!freelancerId) {
            return res.status(400).json({
                message: "In route, freelancer id must be specified",
            });
        }

        const normalizedFreelancerId = Number(freelancerId);

        if (!Number.isInteger(normalizedFreelancerId)) {
            return res.status(400).json({
                message: "FreelancerId must be an integer",
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
                    message: "Access denied, you are not a freelancer",
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

            if (normalizedFreelancerId !== decoded.id) {
                return res.status(401).json({
                    message: "Forger JWT detected. Access denied.",
                });
            }

            const foundHistory = await db.BidHistory.findAll({
                where: {
                    freelancerId: normalizedFreelancerId,
                },
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                        "freelancerId",
                        "clientId",
                    ],
                },
                include: [
                    {
                        model: db.Freelancer,
                        attributes: {
                            exclude: [
                                "createdAt",
                                "updatedAt",
                                "specId",
                                "userId",
                            ],
                        },
                        include: {
                            model: db.Spec,
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "id"],
                            },
                        },
                    },
                    {
                        model: db.Client,
                        attributes: {
                            exclude: [
                                "createdAt",
                                "updatedAt",
                                "id",
                                "piclink",
                                "userId",
                            ],
                        },
                        required: false,
                    },
                ],
            });

            return res.status(200).json({
                message: foundHistory,
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
            res.status(500).json({
                message: e.message,
            });
        }
    }
}

module.exports = new BidHistoryController();
