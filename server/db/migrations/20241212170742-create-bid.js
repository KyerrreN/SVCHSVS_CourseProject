"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Bids", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            desc: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            specId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Specs",
                    key: "id",
                },
            },
            payment: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            isTaken: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            clientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Clients",
                    key: "id",
                },
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
        await queryInterface.dropTable("Bids");
    },
};
