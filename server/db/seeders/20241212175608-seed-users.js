"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Users", [
            {
                id: 1,
                username: "Freelancer1",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                username: "Freelancer2",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                username: "Freelancer3",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                username: "Freelancer4",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                username: "Freelancer5",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 6,
                username: "Freelancer6",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 7,
                username: "Freelancer7",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 8,
                username: "Freelancer8",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 9,
                username: "Freelancer9",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 10,
                username: "Freelancer10",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 11,
                username: "Freelancer11",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 12,
                username: "Freelancer12",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 13,
                username: "Freelancer13",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 14,
                username: "Freelancer14",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 15,
                username: "Freelancer15",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 16,
                username: "Freelancer16",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 17,
                username: "Freelancer17",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 18,
                username: "Freelancer18",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 19,
                username: "Freelancer19",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 20,
                username: "Freelancer20",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Freelancer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 21,
                username: "Client1",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 22,
                username: "Client2",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 23,
                username: "Client3",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 24,
                username: "Client4",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 25,
                username: "Client5",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 26,
                username: "Client6",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 27,
                username: "Client7",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 28,
                username: "Client8",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 29,
                username: "Client9",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 30,
                username: "Client10",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 31,
                username: "Client11",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 32,
                username: "Client12",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 33,
                username: "Client13",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 34,
                username: "Client14",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 35,
                username: "Client15",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 36,
                username: "Client16",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 37,
                username: "Client17",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 38,
                username: "Client18",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 39,
                username: "Client19",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 40,
                username: "Client20",
                password:
                    "$2b$05$YV3zYLNxfBBbcjdX5XfJLeX2jeFa6f4qPmuLHDjgYmnhXiAyP0Hey",
                role: "Client",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
