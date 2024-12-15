const db = require("../db/models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

class ClientController {
    // 1) Получение 1 клиента
    async getClient(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Id is not specified",
            });
        }

        const normalizedId = Number(id);

        if (!Number.isInteger(normalizedId)) {
            return res.status(400).json({
                message: "Id is not a number",
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

            const client = await db.Client.findOne({
                where: {
                    id: normalizedId,
                },
                attributes: {
                    exclude: ["userId", "createdAt", "updatedAt"],
                },
            });

            if (!client) {
                return res.status(404).json({
                    message: `Client with id: ${normalizedId} doesn't exist`,
                });
            }

            return res.status(200).json({
                message: client,
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

    // 2) Принятие решения о выполнении проекта
    async decideCompletion(req, res) {
        const { bidId } = req.params;

        const { status, clientMessage, rating } = req.body;

        if (!bidId) {
            return res.status(400).json({
                message: "Id of a bid is required",
            });
        }

        const normalizedBidId = Number(bidId);

        if (!Number.isInteger(normalizedBidId)) {
            return res.status(400).json({
                message: "Bid Id and Freelancer Id must be an integer",
            });
        }

        if (!status) {
            return res.status(400).json({
                message:
                    "Status is required. Message from the client is optional, if status is not Done",
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

            const existingClient = await db.Client.findOne({
                where: {
                    id: decoded.id,
                },
                include: {
                    model: db.Bid,
                },
            });

            if (existingClient.Bid.id !== normalizedBidId) {
                return res.status(401).json({
                    message: "Not your project.",
                });
            }

            const found = await db.FreelancerBid.findOne({
                where: {
                    bidId: normalizedBidId,
                },
            });

            if (!found) {
                return res.status(404).json({
                    message: `Taken bid with bid: ${normalizedBidId} doesn't exist`,
                });
            }

            if (status === "Done") {
                if (!rating) {
                    return res.status(400).json({
                        message: "Please, rate a project",
                    });
                }

                const bid = await db.Bid.findOne({
                    where: {
                        id: normalizedBidId,
                    },
                });

                await db.BidHistory.create({
                    freelancerId: found.freelancerId,
                    clientId: existingClient.id,
                    rated: rating,
                    name: bid.name,
                    desc: bid.desc,
                    deadline: found.deadline,
                    assigned: found.deadline,
                    done: new Date(),
                });

                await found.destroy();

                return res.status(204).json();
            }

            if (!clientMessage) {
                return res.status(400).json({
                    message:
                        "If status isn't Done, clientMessage must be specified",
                });
            }

            await found.update({
                status: status,
                clientMessage: clientMessage,
                freelancerMessage: null,
            });

            return res.status(200).json({
                message: {
                    bidId: found.id,
                    deadline: found.deadline,
                    assigned: found.assigned,
                    clientMessage: found.clientMessage,
                },
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

module.exports = new ClientController();
