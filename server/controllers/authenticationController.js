const db = require("../db/models");
const bcrypt = require("bcrypt");
const smth = require("../");
require("dotenv").config({ path: "../.env" });
const jsonwebtoken = require("jsonwebtoken");
const User = require("../db/models/user");
const sequelize = require("sequelize");

const JWT_SECRET = process.env.JWT_SECRET || "some_secret_phrase";

class AuthenticationController {
    async registerFreelancer(req, res) {
        const { username, password, name, surname, spec, header } = req.body;

        console.log({
            username,
            password,
            name,
            surname,
            spec,
            header,
        });

        try {
            if (
                !username ||
                !password ||
                !name ||
                !surname ||
                !spec ||
                !header
            ) {
                return res.status(400).json({
                    message:
                        "You haven't specified all the fields: username, password, name, surname, spec, header",
                });
            }

            const user = await db.User.findOne({
                where: {
                    username: username,
                },
            });

            if (user) {
                return res.status(400).json({
                    message: `Freelancer with username: ${username} already exists`,
                });
            }

            const specToUse = await db.Spec.findOne({
                where: {
                    name: spec,
                },
            });

            if (!specToUse) {
                return res.status(400).json({
                    message: `Specialty "${spec}" doesn't exist`,
                });
            }

            const hashedPassword = await bcrypt.hash(password, 5);

            const newUser = await db.User.create({
                username: username,
                password: hashedPassword,
                role: "Freelancer",
            });

            const newFreelancer = await db.Freelancer.create({
                name: name,
                surname: surname,
                specId: specToUse.id,
                header: header,
                rating: 0,
                piclink: null,
                userId: newUser.id,
            });

            res.status(201).json({
                user: newUser,
                freelancer: newFreelancer,
            });
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
                    message:
                        "You haven't specified all the fields: username, password, name, surname, email",
                });
            }

            const user = await db.User.findOne({
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

            const newUser = await db.User.create({
                username,
                password: hashedPassword,
                role: "Client",
            });

            const newClient = await db.Client.create({
                name: name,
                surname: surname,
                email: email,
                piclink: null,
                userId: newUser.id,
            });

            res.status(201).json({
                user: newUser,
                client: newClient,
            });
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
                    // expiresIn: 1,
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
            const { id, oldPassword, newPassword } = req.body;

            if (!id || !oldPassword || !newPassword) {
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
                    id: id,
                },
            });

            if (!user) {
                user = await db.Client.findOne({
                    where: {
                        id: id,
                    },
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: `User with id: ${id} is not found`,
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
