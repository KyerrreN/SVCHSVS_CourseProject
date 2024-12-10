"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Clients", [
            {
                username: "ClientLogin1",
                password:
                    "$2b$05$TBHfeUJRBUSDKuhpctUhBu27IOt12UCEV9Xo6MqIoDTYeGnSbawhe",
                name: "Elliot",
                surname: "Cooper",
                email: "example@google.com",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "ClientLogin2",
                password:
                    "$2b$05$TBHfeUJRBUSDKuhpctUhBu27IOt12UCEV9Xo6MqIoDTYeGnSbawhe",
                name: "Alice",
                surname: "Smith",
                email: "example@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "ClientLogin3",
                password:
                    "$2b$05$TBHfeUJRBUSDKuhpctUhBu27IOt12UCEV9Xo6MqIoDTYeGnSbawhe",
                name: "Bob",
                surname: "Johnson",
                email: "example@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "ClientLogin4",
                password:
                    "$2b$05$TBHfeUJRBUSDKuhpctUhBu27IOt12UCEV9Xo6MqIoDTYeGnSbawhe",
                name: "Charlie",
                surname: "Brown",
                email: "example@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "ClientLogin5",
                password:
                    "$2b$05$TBHfeUJRBUSDKuhpctUhBu27IOt12UCEV9Xo6MqIoDTYeGnSbawhe",
                name: "Diana",
                surname: "White",
                email: "example@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "ClientLogin6",
                password:
                    "$2b$05$TBHfeUJRBUSDKuhpctUhBu27IOt12UCEV9Xo6MqIoDTYeGnSbawhe",
                name: "Ethan",
                surname: "Green",
                email: "example@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Clients", null, {});
    },
};
