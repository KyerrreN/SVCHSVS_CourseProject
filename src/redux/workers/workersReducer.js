import { GET_WORKERS } from "./workersTypes";

const initialState = [
    {
        name: "Anatoli",
        surname: "Karpov",
        spec: "Web Development",
        header: "I will create a website from scratch. Hit me up with any offer.",
        rating: 4.2,
    },
    {
        name: "Maria",
        surname: "Ivanova",
        spec: "UI Designer",
        header: "I design intuitive and beautiful user interfaces that enhance user experience.",
        rating: 4.8,
    },
    {
        name: "John",
        surname: "Smith",
        spec: "Backend Software Engineering",
        header: "I build scalable and efficient backend systems to power your applications.",
        rating: 4.5,
    },
    {
        name: "Elena",
        surname: "Petrova",
        spec: "Web Development",
        header: "I create responsive websites that look great on any device.",
        rating: 4.7,
    },
    {
        name: "David",
        surname: "Brown",
        spec: "Backend Software Engineering",
        header: "I specialize in building robust APIs and backend services for web applications.",
        rating: 4.6,
    },
    {
        name: "Sofia",
        surname: "Garcia",
        spec: "UI Designer",
        header: "I craft stunning user interfaces that engage and delight users.",
        rating: 4.9,
    },
];

const workersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WORKERS:
            return state;

        default:
            return state;
    }
};

export default workersReducer;
