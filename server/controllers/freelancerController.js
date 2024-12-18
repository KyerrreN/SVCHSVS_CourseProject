const db = require("../db/models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

class FreelancerController {
    // 1) получение списка записей с поддержкой пагинации;
    async getAllPaging(req, res) {
        const { page = 1, limit = 10 } = req.query;

        const offset = (page - 1) * limit;

        if (
            !Number.isInteger(Number(limit)) ||
            !Number.isInteger(Number(offset))
        ) {
            res.status(400).json({
                message: "Page and limit values must be integers",
            });

            return;
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
                    message: "Access denied, you are not a client",
                });
            }

            const freelancers = await db.Freelancer.findAndCountAll({
                limit,
                offset,
                attributes: {
                    exclude: ["userId", "specId", "createdAt", "updatedAt"],
                },
                include: {
                    model: db.Spec,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "id"],
                    },
                },
            });

            if (freelancers.rows.length === 0) {
                if (freelancers.count > 0) {
                    res.status(404).json({
                        message:
                            "No more rows using your paging parameters are available",
                    });

                    return;
                }

                res.status(404).json({
                    message: "There are no freelancers yet.",
                });

                return;
            }

            res.status(200).json({
                message: freelancers,
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

    // 3) сорт по рейтингу
    async getByRating(req, res) {
        const { order } = req.query;

        console.log(order);

        if (!order) {
            return res.status(400).json({
                message:
                    "Order must be specified, either ASC or DESC (case insensitive)",
            });
        }

        const normalizedOrder = order.toUpperCase();

        if (normalizedOrder !== "ASC" && normalizedOrder !== "DESC") {
            return res.status(400).json({
                message: "Order can be either ASC or DESC",
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

            const freelancers = await db.Freelancer.findAll({
                order: [["rating", normalizedOrder]],
                attributes: {
                    exclude: ["specId", "userId", "createdAt", "updatedAt"],
                },
                include: {
                    model: db.Spec,
                    attributes: {
                        exclude: ["id", "createdAt", "updatedAt"],
                    },
                },
            });

            return res.status(200).json({
                message: freelancers,
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

    // 4) Поиск по имени
    async getSearchByName(req, res) {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                message: "Query must be specified",
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

            const freelancers = await db.Freelancer.findAll({
                where: {
                    name: {
                        [Op.like]: `%${query}%`,
                    },
                },
                attributes: {
                    exclude: ["userId", "specId", "createdAt", "updatedAt"],
                },
                include: {
                    model: db.Spec,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "id"],
                    },
                },
            });

            if (freelancers.length === 0) {
                return res.status(400).json({
                    message: "No match for query: " + query,
                });
            }

            return res.status(200).json({
                message: freelancers,
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

    // 5) Фильтр по предметной области
    async getFilterBySpec(req, res) {
        const { spec } = req.query;

        if (!spec) {
            return res.status(400).json({
                message: "Spec must be specified",
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

            const existingSpec = await db.Spec.findOne({
                where: {
                    name: spec,
                },
            });

            if (!existingSpec) {
                return res.status(404).json({
                    message: `Spec with name: ${spec} doesn't exist`,
                });
            }

            const freelancers = await db.Freelancer.findAll({
                where: {
                    specId: existingSpec.id,
                },
                attributes: {
                    exclude: ["userId", "specId", "createdAt", "updatedAt"],
                },
                include: {
                    model: db.Spec,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "id"],
                    },
                },
            });

            if (freelancers.length === 0) {
                return res.status(404).json({
                    message: `Couldn't find freelancers with specialty "${spec}"`,
                });
            }

            return res.status(200).json({
                message: freelancers,
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

module.exports = new FreelancerController();
