import { GET_WORKERS, DELETE_WORKER } from "./workersTypes";

export const getWorkers = () => {
    return {
        type: GET_WORKERS,
    };
};

export const deleteWorker = (id) => {
    return {
        type: DELETE_WORKER,
        payload: id,
    };
};
