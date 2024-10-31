import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    workers: [
        {
            id: 1,
            name: "Anatoli",
            surname: "Karpov",
            spec: "Web Developer",
            header: "I will create a website from scratch. Hit me up with any offer.",
            rating: 4.2,
        },
        {
            id: 2,
            name: "Maria",
            surname: "Ivanova",
            spec: "UI Designer",
            header: "I design intuitive and beautiful user interfaces that enhance user experience.",
            rating: 4.8,
        },
        {
            id: 3,
            name: "John",
            surname: "Smith",
            spec: "Backend Software Engineer",
            header: "I build scalable and efficient backend systems to power your applications.",
            rating: 4.5,
        },
        {
            id: 4,
            name: "Elena",
            surname: "Petrova",
            spec: "Web Developer",
            header: "I create responsive websites that look great on any device.",
            rating: 4.7,
        },
        {
            id: 5,
            name: "David",
            surname: "Brown",
            spec: "Backend Software Engineer",
            header: "I specialize in building robust APIs and backend services for web applications.",
            rating: 4.6,
        },
        {
            id: 6,
            name: "Sofia",
            surname: "Garcia",
            spec: "UI Designer",
            header: "I craft stunning user interfaces that engage and delight users.",
            rating: 4.9,
        },
    ],
};

const workersSlice = createSlice({
    name: "workers",
    initialState,
    reducers: {
        deleteWorker: (state, action) => {
            state.workers = state.workers.filter(
                (worker) => worker.id !== action.payload
            );
        },
        updateWorker: (state, action) => {
            state.workers = state.workers.map((worker) => {
                if (worker.id === action.payload.id) {
                    return { ...worker, ...action.payload };
                }

                return worker;
            });
        },
        addWorker: (state, action) => {
            state.workers = [...state.workers, action.payload];
        },
    },
});

export const { deleteWorker, updateWorker, addWorker } = workersSlice.actions;
export default workersSlice.reducer;
