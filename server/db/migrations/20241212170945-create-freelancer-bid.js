"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("FreelancerBids", {
            freelancerId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "Freelancers",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            bidId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "Bids",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            deadline: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            assigned: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("FreelancerBids");
    },
};
