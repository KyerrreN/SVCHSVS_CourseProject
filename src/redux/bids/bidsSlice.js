import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bids: [
        {
            id: 1,
            name: "Client server application for a freelance platform",
            desc: "This project is all about making sure that your course work will be completed in time. Time constraints are pretty important here. Please, use your time responsibly.",
            needed: "Web Developer",
            payment: 950,
            deadline: new Date("2024-12-30"),
        },
        {
            id: 2,
            name: "API Development for Mobile App",
            desc: "Develop a RESTful API for a mobile application with user authentication.",
            needed: "Backend Software Engineer",
            payment: 1500,
            deadline: new Date("2024-10-05"),
        },
        {
            id: 3,
            name: "UI/UX Design for Startup",
            desc: "Design a user-friendly interface for a new startup's application.",
            needed: "UI Designer",
            payment: 800,
            deadline: new Date("2024-09-30"),
        },
        {
            id: 4,
            name: "Website Redesign",
            desc: "Revamp the existing website to improve user experience and aesthetics.",
            needed: "Web Developer",
            payment: 950,
            deadline: new Date("2024-12-01"),
        },
        {
            id: 5,
            name: "Dashboard Development",
            desc: "Create an interactive dashboard for data visualization and reporting.",
            needed: "Backend Software Engineer",
            payment: 1300,
            deadline: new Date("2024-11-20"),
        },
    ],
};

const bidsSlice = createSlice({
    name: "bids",
    initialState,
    reducers: {
        deleteBid: (state, action) => {
            state.bids = state.bids.filter(
                (worker) => worker.id !== action.payload
            );
        },
        updateBid: (state, action) => {
            state.bids = state.bids.map((bid) => {
                if (bid.id === action.payload.id) {
                    return { ...bid, ...action.payload };
                }

                return bid;
            });
        },
        addBid: (state, action) => {
            state.bids = [...state.bids, action.payload];
        },
    },
});

export const { deleteBid, updateBid, addBid } = bidsSlice.actions;
export default bidsSlice.reducer;
