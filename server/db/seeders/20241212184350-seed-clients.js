"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Clients", [
            {
                name: "Oliver",
                surname: "Smith",
                email: "oliver.smith@example.com",
                piclink: "1.jpg",
                userId: 21,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Emma",
                surname: "Johnson",
                email: "emma.johnson@example.com",
                piclink: "2.jpg",
                userId: 22,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Liam",
                surname: "Williams",
                email: "liam.williams@example.com",
                piclink: "3.jpg",
                userId: 23,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Ava",
                surname: "Brown",
                email: "ava.brown@example.com",
                piclink: "4.jpg",
                userId: 24,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Noah",
                surname: "Jones",
                email: "noah.jones@example.com",
                piclink: "5.jpg",
                userId: 25,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Sophia",
                surname: "Garcia",
                email: "sophia.garcia@example.com",
                piclink: "1.jpg",
                userId: 26,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Mason",
                surname: "Martinez",
                email: "mason.martinez@example.com",
                piclink: "2.jpg",
                userId: 27,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Isabella",
                surname: "Hernandez",
                email: "isabella.hernandez@example.com",
                piclink: "3.jpg",
                userId: 28,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Ethan",
                surname: "Lopez",
                email: "ethan.lopez@example.com",
                piclink: "4.jpg",
                userId: 29,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Mia",
                surname: "Gonzalez",
                email: "mia.gonzalez@example.com",
                piclink: "5.jpg",
                userId: 30,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Logan",
                surname: "Wilson",
                email: "logan.wilson@example.com",
                piclink: "1.jpg",
                userId: 31,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Charlotte",
                surname: "Anderson",
                email: "charlotte.anderson@example.com",
                piclink: "2.jpg",
                userId: 32,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Lucas",
                surname: "Thomas",
                email: "lucas.thomas@example.com",
                piclink: "3.jpg",
                userId: 33,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Amelia",
                surname: "Taylor",
                email: "amelia.taylor@example.com",
                piclink: "4.jpg",
                userId: 34,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Jackson",
                surname: "Moore",
                email: "jackson.moore@example.com",
                piclink: "5.jpg",
                userId: 35,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Harper",
                surname: "Jackson",
                email: "harper.jackson@example.com",
                piclink: "1.jpg",
                userId: 36,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Aiden",
                surname: "Martin",
                email: "aiden.martin@example.com",
                piclink: "2.jpg",
                userId: 37,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Ella",
                surname: "Lee",
                email: "ella.lee@example.com",
                piclink: "3.jpg",
                userId: 38,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Carter",
                surname: "Perez",
                email: "carter.perez@example.com",
                piclink: "4.jpg",
                userId: 39,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Scarlett",
                surname: "Thompson",
                email: "scarlett.thompson@example.com",
                piclink: "5.jpg",
                userId: 40,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Clients", null, {});
    },
};