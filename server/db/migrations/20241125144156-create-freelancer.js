"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Freelancers", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(24),
                allowNull: false,
            },
            surname: {
                type: Sequelize.STRING(24),
                allowNull: false,
            },
            spec: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            header: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            rating: {
                type: Sequelize.REAL,
                allowNull: false,
            },
            piclink: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            hardskills: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: false,
            },
            softskills: {
                type: Sequelize.ARRAY(Sequelize.STRING),
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
        await queryInterface.dropTable("Freelancers");
    },
};
