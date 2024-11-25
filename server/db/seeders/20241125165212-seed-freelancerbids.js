"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const today = new Date();

        const addDays = (days) => {
            const result = new Date(today);
            result.setDate(today.getDate() + days);
            return result;
        };

        await queryInterface.bulkInsert("FreelancerBids", [
            {
                freelancerId: 1,
                bidId: 1,
                assigned: today,
                deadline: addDays(3),
                createdAt: today,
                updatedAt: today,
            },
            {
                freelancerId: 1,
                bidId: 2,
                assigned: today,
                deadline: addDays(7),
                createdAt: today,
                updatedAt: today,
            },
            {
                freelancerId: 3,
                bidId: 3,
                assigned: today,
                deadline: addDays(8),
                createdAt: today,
                updatedAt: today,
            },
            {
                freelancerId: 3,
                bidId: 4,
                assigned: today,
                deadline: addDays(10),
                createdAt: today,
                updatedAt: today,
            },
            {
                freelancerId: 5,
                bidId: 5,
                assigned: today,
                deadline: addDays(3),
                createdAt: today,
                updatedAt: today,
            },
            {
                freelancerId: 5,
                bidId: 6,
                assigned: today,
                deadline: addDays(2),
                createdAt: today,
                updatedAt: today,
            },
            {
                freelancerId: 7,
                bidId: 7,
                assigned: today,
                deadline: addDays(6),
                createdAt: today,
                updatedAt: today,
            },
            {
                freelancerId: 7,
                bidId: 8,
                assigned: today,
                deadline: addDays(6),
                createdAt: today,
                updatedAt: today,
            },
            {
                freelancerId: 9,
                bidId: 9,
                assigned: today,
                deadline: addDays(4),
                createdAt: today,
                updatedAt: today,
            },
            {
                freelancerId: 9,
                bidId: 10,
                assigned: today,
                deadline: addDays(12),
                createdAt: today,
                updatedAt: today,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Bids", null, {});
    },
};
