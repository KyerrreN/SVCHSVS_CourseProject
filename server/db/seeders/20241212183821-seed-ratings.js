"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Ratings", [
            {
                freelancerId: 1,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 1,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 1,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 1,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 1,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                freelancerId: 2,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 2,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 2,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 2,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 2,
                value: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                freelancerId: 3,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 3,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 3,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 3,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 3,
                value: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                freelancerId: 4,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 4,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 4,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 4,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 4,
                value: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                freelancerId: 5,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 5,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 5,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 5,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 5,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                freelancerId: 6,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 6,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 6,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 6,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 6,
                value: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                freelancerId: 7,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 7,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 7,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 7,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 7,
                value: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                freelancerId: 8,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 8,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 8,
                value: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 8,
                value: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 8,
                value: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Ratings", null, {});
    },
};
