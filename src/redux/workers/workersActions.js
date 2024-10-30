import {
    GET_WORKERS,
    DELETE_WORKER,
    UPDATE_WORKER,
    ADD_WORKER,
} from "./workersTypes";

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

export const addWorker = (workerObject) => {
    return {
        type: ADD_WORKER,
        payload: workerObject,
    };
};
