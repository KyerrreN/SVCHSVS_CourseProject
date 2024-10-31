import { configureStore } from "@reduxjs/toolkit";
import workersReducer from "./workers/workersSlice";

const store = configureStore({
    reducer: {
        workers: workersReducer,
    },
});

export default store;
