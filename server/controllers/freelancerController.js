const db = require("../db/models");
const { Op, where } = require("sequelize");
const freelancer = require("../db/models/freelancer");

class FreelancerController {
    // 1) создание новой записи;
    async create(req, res) {
        const { name, surname, spec, rating, header, hardskills, softskills } =
            req.body;

        try {
            const newFreelancer = await db.Freelancer.create(req.body);
            res.status(201).json({
                success: true,
                data: newFreelancer,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                data: e.message,
            });
        }
    }
    // 2) получение списка записей с поддержкой пагинации;
    async getAllPaging(req, res) {
        const { page = 1, limit = 10 } = req.query;

        const offset = (page - 1) * limit;

        try {
            const freelancers = await db.Freelancer.findAndCountAll({
                limit,
                offset,
            });
            res.status(200).json({
                success: true,
                data: freelancers,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                data: e.message,
            });
        }
    }

    // 3) получение списка записей с поддержкой сортировки;
    // в моем случае по рейтингу
    async getAllSorted(req, res) {
        const { sort } = req.query;
        const jsonRes = {
            success: false,
        };

        const normalizedSort = sort.toUpperCase();
        console.log(normalizedSort);

        if (normalizedSort !== "ASC" && normalizedSort !== "DESC") {
            jsonRes.data =
                "Order has to be either ASC or DESC (case insensitive)";

            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.Freelancer.findAll({
                order: [["rating", normalizedSort]],
            });

            jsonRes.success = true;
            jsonRes.data = found;

            res.status(200).json(jsonRes);
        } catch (e) {
            jsonRes.data = e.message;

            res.status(500).json(jsonRes);
        }
    }

    // 4) получение списка записей с поддержкой фильтрации, в том
    // числе по нескольким полям одновременно
    async getAllFiltered(req, res) {
        const { name, surname, spec, rating } = req.query;
        const jsonRes = {
            success: false,
        };

        const filter = {};

        if (name) {
            filter.name = { [Op.like]: `%${name}%` };
        }

        if (surname) {
            filter.surname = { [Op.like]: `%${surname}%` };
        }

        if (spec) {
            filter.spec = { [Op.like]: `%${spec}%` };
        }

        if (rating) {
            filter.rating = rating;
        }

        if (JSON.stringify(filter) === "{}") {
            jsonRes.data =
                "Bad request. Accepted properties: name, surname, spec, rating";
            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.Freelancer.findAll({
                where: filter,
            });

            if (found.length > 0) {
                jsonRes.success = true;
                jsonRes.data = found;

                res.status(200).json(jsonRes);
            } else {
                jsonRes.data = "Couldn't find data with your request";

                res.status(404).json(jsonRes);
            }
        } catch (e) {
            jsonRes.data = e.message;

            res.status(500).json(jsonRes);
        }
    }

    // 5) получение списка записей с поддержкой поиска, в том числе по
    // нескольким полям одновременно;
    async getAllSearch(req, res) {
        const { query } = req.query;
        const jsonRes = {
            success: false,
        };

        if (!query) {
            jsonRes.data = 'Query "query" must be specified';

            res.status(400).json(jsonRes);
            return;
        }

        try {
            const found = await db.Freelancer.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query}%` } },
                        { surname: { [Op.like]: `%${query}%` } },
                        { spec: { [Op.like]: `%${query}%` } },
                    ],
                },
            });

            if (found.length === 0) {
                jsonRes.data = "No match for your search query.";

                res.status(404).json(jsonRes);
                return;
            }

            jsonRes.data = found;
            jsonRes.success = true;

            res.status(200).json(jsonRes);
        } catch (e) {
            jsonRes.data = e.message;

            res.status(500).json(jsonRes);
        }
    }

    // 6) получение детальной информации по ID;
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

        try {
            const found = await db.Freelancer.findAll({
                where: {
                    id: numberId,
                },
            });

            if (found.length === 0) {
                jsonRes.data =
                    "Couldn't find a row with specified id. Id: " + numberId;

                res.status(404).json(jsonRes);
                return;
            }

            if (found.length > 1) {
                jsonRes.data = "Several rows with id: " + numberId;

                res.status(500).json(jsonRes);
                return;
            }

            jsonRes.success = true;
            jsonRes.data = found;

            res.status(200).json(jsonRes);
        } catch (e) {
            jsonRes.data = e.message;

            res.status(500).json(jsonRes);
        }
    }
}

module.exports = new FreelancerController();
