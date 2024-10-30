import { createStore } from "redux";
import workersReducer from "./workers/workersReducer";

const store = createStore(workersReducer);

export default store;
