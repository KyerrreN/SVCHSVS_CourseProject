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

            const client = await db.Client.findOne({
                where: {
                    username,
                },
            });

            if (client) {
                return res.status(400).json({
                    message: `There is already an account with username: ${username}`,
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

            const freelancer = await db.Freelancer.findOne({
                where: {
                    username,
                },
            });

            if (freelancer) {
                return res.status(400).json({
                    message: `There is already an account with username: ${username}`,
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

    async changePassword(req, res) {
        try {
            const { username, oldPassword, newPassword } = req.body;

            if (!username || !oldPassword || !newPassword) {
                return res.status(400).json({
                    message: "Specify username, oldPassword, newPassword",
                });
            }

            if (oldPassword === newPassword) {
                return res.status(400).json({
                    message: "Old password cannot be the same as new password",
                });
            }

            let user = await db.Freelancer.findOne({
                where: {
                    username: username,
                },
            });

            if (!user) {
                user = await db.Client.findOne({
                    where: {
                        username: username,
                    },
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: `User with username: ${username} is not found`,
                });
            }

            const isPasswordValid = await bcrypt.compare(
                oldPassword,
                user.password
            );

            if (!isPasswordValid) {
                return res.status(403).json({
                    message: `Old password doesnt match your current password`,
                });
            }

            const changedPassword = await bcrypt.hash(newPassword, 5);

            user.password = changedPassword;

            await user.save();

            res.status(204).send();
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    }
}

module.exports = new AuthenticationController();
