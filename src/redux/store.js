import { createStore } from "redux";
import rootReducer from "./rootReducer";
import workersReducer from "./workers/workersReducer";

const store = createStore(workersReducer);

export default store;
