import { GET_WORKERS, DELETE_WORKER, UPDATE_WORKER } from "./workersTypes";

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

export const updateWorker = (workerObject) => {
    return {
        type: UPDATE_WORKER,
        payload: workerObject,
    };
};
