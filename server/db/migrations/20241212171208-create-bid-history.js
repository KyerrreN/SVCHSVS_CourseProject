"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("BidHistories", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            freelancerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Freelancers",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            clientId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "Clients",
                    key: "id",
                },
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            },
            rated: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            desc: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            deadline: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            assigned: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            done: {
                type: Sequelize.DATEONLY,
                allowNull: true,
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
        await queryInterface.dropTable("BidHistories");
    },
};
