const db = require("../db/models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

class ClientController {
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
}

module.exports = new ClientController();
