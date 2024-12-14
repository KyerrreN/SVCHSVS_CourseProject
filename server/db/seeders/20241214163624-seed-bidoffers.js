"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("BidOffers", [
            {
                freelancerId: 1,
                bidId: 21,
                freelancerMessage: "I can do it",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 1,
                bidId: 22,
                freelancerMessage: "I can do it",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 1,
                bidId: 23,
                freelancerMessage: "I can do it",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 1,
                bidId: 24,
                freelancerMessage: "I can do it",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 1,
                bidId: 25,
                freelancerMessage: "I can do it",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 1,
                bidId: 26,
                freelancerMessage: "I can do it",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 1,
                bidId: 27,
                freelancerMessage: "I can do it",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 1,
                bidId: 28,
                freelancerMessage: "I can do it",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                freelancerId: 1,
                bidId: 29,
                freelancerMessage: "I can do it",

                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("BidOffers", null, {});
    },
};
