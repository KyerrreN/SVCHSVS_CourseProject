"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Specs", [
            {
                name: "Web Developer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Graphic Designer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "UI/UX Designer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Kotlin Developer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Backend Developer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Frontend Developer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Cybersecurity Engineer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "DevOps Engineer",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Database Administrator",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
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
