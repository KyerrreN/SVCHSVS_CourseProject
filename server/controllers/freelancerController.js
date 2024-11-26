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
}

module.exports = new FreelancerController();
