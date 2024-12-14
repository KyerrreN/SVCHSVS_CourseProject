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
            specId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "Specs",
                    key: "id",
                },
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
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
                allowNull: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
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
