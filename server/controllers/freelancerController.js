const db = require("../db/models");

class FreelancerController {
    // 1) создание новой записи;
    async create(req, res) {
        const { name, surname, spec, rating, header, hardskills, softskills } =
            req.body;

        try {
            const newFreelancer = await db.Freelancer.create(req.body);
            res.status(201).json({
                success: true,
                freelancer: newFreelancer,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                message: e.message,
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
                freelancers: freelancers,
            });
        } catch (e) {
            res.status(400).json({
                success: false,
                message: e.message,
            });
        }
    }
}

module.exports = new FreelancerController();
