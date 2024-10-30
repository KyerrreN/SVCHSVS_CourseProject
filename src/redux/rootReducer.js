import { combineReducers } from "redux";
import workersReducer from "./workers/workersReducer";

const rootReducer = combineReducers({
    workers: workersReducer,
});

export default rootReducer;
