import { configureStore } from "@reduxjs/toolkit";
import workersReducer from "./workers/workersSlice";
import bidsReducer from "./bids/bidsSlice";

const store = configureStore({
    reducer: {
        workers: workersReducer,
        bids: bidsReducer,
    },
});

export default store;
