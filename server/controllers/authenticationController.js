const db = require("../db/models");
const bcrypt = require("bcrypt");

class AuthenticationController {
    async registerFreelancer(req, res) {
        const { username, password, name, surname, spec, header, rating } =
            req.body;

        try {
            if (
                !username ||
                !password ||
                !name ||
                !surname ||
                !spec ||
                !header ||
                !rating
            ) {
                return res.status(400).json({
                    message: "You haven't specified all the fields",
                });
            }

            const user = await db.Freelancer.findOne({
                where: {
                    username: username,
                },
            });

            if (user) {
                return res.status(400).json({
                    message: `User with username: ${username} already exists`,
                });
            }

            const hashedPassword = await bcrypt.hash(password, 5);

            console.log(hashedPassword);

            const newUser = await db.Freelancer.create({
                username,
                password: hashedPassword,
                name,
                surname,
                spec,
                header,
                rating,
                piclink: "fadsfa",
                hardskills: ["Dev"],
                softskills: ["Compassionate"],
            });

            res.status(201).json(newUser);
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    }

    async registrateClient(req, res) {
        try {
            const { username, password, name, surname, email } = req.body;

            if (!username || !password || !name || !surname || !email) {
                return res.status(400).json({
                    message: "You haven't specified all the fields",
                });
            }

            const user = await db.Client.findOne({
                where: {
                    username,
                },
            });

            if (user) {
                return res.status(400).json({
                    message: `Client with username: ${username} already exists`,
                });
            }

            const hashedPassword = await bcrypt.hash(password, 5);

            const newUser = await db.Client.create({
                username,
                password: hashedPassword,
                name,
                surname,
                email,
            });

            res.status(201).json(newUser);
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    }
}

module.exports = new AuthenticationController();
