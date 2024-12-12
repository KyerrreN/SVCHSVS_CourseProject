"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Specs", [
            {
                id: 1,
                name: "Web Developer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: "Graphic Designer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                name: "UI/UX Designer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                name: "Kotlin Developer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                name: "Backend Developer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 6,
                name: "Frontend Developer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 7,
                name: "Cybersecurity Engineer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 8,
                name: "DevOps Engineer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 9,
                name: "Database Administrator",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 10,
                name: "Game Developer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Specs", null, {});
    },
};
