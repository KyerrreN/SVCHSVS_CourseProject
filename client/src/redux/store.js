import { configureStore } from "@reduxjs/toolkit";
import workersReducer from "./workers/workersSlice";
import bidsReducer from "./bids/bidsSlice";
import freelancerBidsReducer from "./freelancerbids/freelancerBidsSlice";

const store = configureStore({
    reducer: {
        freelancers: workersReducer,
        bids: bidsReducer,
        freelancerBids: freelancerBidsReducer,
    },
});

export default store;
