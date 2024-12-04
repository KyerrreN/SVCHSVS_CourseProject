"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Freelancers", [
            {
                name: "Alice",
                surname: "Johnson",
                spec: "Web Developer",
                header: "Passionate web developer with a knack for coding.",
                rating: 4.3,
                piclink: "5.jpg",
                hardskills: ["JavaScript", "HTML", "CSS"],
                softskills: ["Teamwork", "Creativity"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Bob",
                surname: "Smith",
                spec: "Backend Software Engineer",
                header: "Expert in building scalable applications.",
                rating: 5.0,
                piclink: "4.jpg",
                hardskills: ["Node.js", "Express", "MongoDB"],
                softskills: ["Problem-solving", "Critical thinking"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Charlie",
                surname: "Brown",
                spec: "UI Designer",
                header: "Creative designer focused on user experience.",
                rating: 4.8,
                piclink: "3.jpg",
                hardskills: ["Figma", "Adobe XD", "Sketch"],
                softskills: ["Communication", "Empathy"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Diana",
                surname: "Prince",
                spec: "Web Developer",
                header: "Full-stack developer with a passion for coding.",
                rating: 5.0,
                piclink: "1.jpg",
                hardskills: ["React", "Node.js", "GraphQL"],
                softskills: ["Adaptability", "Collaboration"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Ethan",
                surname: "Hunt",
                spec: "Backend Software Engineer",
                header: "Skilled in cloud computing and microservices.",
                rating: 4.9,
                piclink: "1.jpg",
                hardskills: ["Java", "Spring", "MySQL"],
                softskills: ["Leadership", "Attention to detail"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Fiona",
                surname: "Glenanne",
                spec: "UI Designer",
                header: "UI/UX designer with a passion for aesthetics.",
                rating: 5.0,
                piclink: "2.jpg",
                hardskills: ["Photoshop", "Illustrator", "InVision"],
                softskills: ["Creativity", "Time management"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "George",
                surname: "Mason",
                spec: "Web Developer",
                header: "Dedicated developer with a knack for problem-solving.",
                rating: 4.7,
                piclink: "2.jpg",
                hardskills: ["Vue.js", "PHP", "Laravel"],
                softskills: ["Communication", "Empathy"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Hannah",
                surname: "Montana",
                spec: "Backend Software Engineer",
                header: "Experienced in cloud computing and microservices.",
                rating: 5.0,
                piclink: "4.jpg",
                hardskills: ["Python", "Django", "PostgreSQL"],
                softskills: ["Teamwork", "Flexibility"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Ian",
                surname: "Fleming",
                spec: "UI Designer",
                header: "UI designer focused on creating intuitive interfaces.",
                rating: 4.8,
                piclink: "5.jpg",
                hardskills: ["Adobe XD", "Sketch", "InVision"],
                softskills: ["Creativity", "Collaboration"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Jack",
                surname: "Ryan",
                spec: "Web Developer",
                header: "Web developer with a strong foundation in JavaScript.",
                rating: 4.5,
                piclink: "5.jpg",
                hardskills: ["Angular", "Node.js", "CSS"],
                softskills: ["Problem-solving", "Communication"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Kathy",
                surname: "Bates",
                spec: "Backend Software Engineer",
                header: "Specialist in API design and development.",
                rating: 5.0,
                piclink: "3.jpg",
                hardskills: ["Ruby", "Rails", "SQLite"],
                softskills: ["Critical thinking", "Adaptability"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Liam",
                surname: "Neeson",
                spec: "Web Developer",
                header: "Passionate about building responsive websites.",
                rating: 4.6,
                piclink: "3.jpg",
                hardskills: ["HTML", "CSS", "JavaScript"],
                softskills: ["Attention to detail", "Team player"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Mia",
                surname: "Wallace",
                spec: "UI Designer",
                header: "Experienced in creating user-friendly designs.",
                rating: 4.9,
                piclink: "2.jpg",
                hardskills: ["Figma", "Photoshop", "Sketch"],
                softskills: ["Creativity", "Communication"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Noah",
                surname: "Bennett",
                spec: "Backend Software Engineer",
                header: "Focused on building secure and scalable systems.",
                rating: 4.7,
                piclink: "1.jpg",
                hardskills: ["Java", "Spring Boot", "MySQL"],
                softskills: ["Problem-solving", "Collaboration"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Olivia",
                surname: "Pope",
                spec: "Web Developer",
                header: "Loves to create dynamic web applications.",
                rating: 5.0,
                piclink: "1.jpg",
                hardskills: ["React", "Node.js", "GraphQL"],
                softskills: ["Adaptability", "Time management"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Peter",
                surname: "Parker",
                spec: "Web Developer",
                header: "Skilled in front-end technologies and frameworks.",
                rating: 4.8,
                piclink: "5.jpg",
                hardskills: ["JavaScript", "React", "CSS"],
                softskills: ["Creativity", "Teamwork"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Quinn",
                surname: "Fabray",
                spec: "UI Designer",
                header: "Designing intuitive user interfaces with a focus on UX.",
                rating: 4.9,
                piclink: "4.jpg",
                hardskills: ["Figma", "Adobe XD", "InVision"],
                softskills: ["Attention to detail", "Communication"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Ryan",
                surname: "Gosling",
                spec: "Backend Software Engineer",
                header: "Expert in building robust server-side applications.",
                rating: 5.0,
                piclink: "4.jpg",
                hardskills: ["Python", "Django", "PostgreSQL"],
                softskills: ["Problem-solving", "Analytical thinking"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Sophie",
                surname: "Turner",
                spec: "Web Developer",
                header: "Full-stack developer with a passion for innovation.",
                rating: 4.6,
                piclink: "5.jpg",
                hardskills: ["Angular", "Node.js", "MongoDB"],
                softskills: ["Collaboration", "Flexibility"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Tom",
                surname: "Holland",
                spec: "UI Designer",
                header: "Creative designer with a flair for modern aesthetics.",
                rating: 4.7,
                piclink: "1.jpg",
                hardskills: ["Photoshop", "Illustrator", "Sketch"],
                softskills: ["Creativity", "Empathy"],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Freelancers", null, {});
    },
};
