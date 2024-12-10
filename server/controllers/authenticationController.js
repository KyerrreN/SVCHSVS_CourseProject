const db = require("../db/models");
const bcrypt = require("bcrypt");
const smth = require("../");
require("dotenv").config({ path: "../.env" });
const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "some_secret_phrase";

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

    async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    message: "Specify both username and password",
                });
            }

            let user;
            let role;

            user = await db.Freelancer.findOne({
                where: {
                    username: username,
                },
            });
            role = "Freelancer";

            if (!user) {
                user = await db.Client.findOne({
                    where: {
                        username: username,
                    },
                });

                role = "Client";
            }

            if (!user) {
                return res.status(404).json({
                    message: `No user exists with username: ${username}`,
                });
            }

            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordCorrect) {
                return res.status(401).json({
                    message: "Invalid password",
                });
            }

            const token = jsonwebtoken.sign(
                {
                    role: role,
                    name: user.name,
                    surname: user.surname,
                    id: user.id,
                },
                JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );

            res.status(200).json({
                token,
                role: role,
                name: user.name,
                surname: user.surname,
                id: user.id,
            });
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    }
}

module.exports = new AuthenticationController();
