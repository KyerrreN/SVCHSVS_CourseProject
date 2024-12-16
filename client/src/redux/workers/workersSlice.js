import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_URL;

// Async thunk to fetch freelancers
export const fetchFreelancers = createAsyncThunk(
    "freelancers/fetchFreelancers",
    async (filter, { rejectWithValue }) => {
        if (sessionStorage.getItem("token") === null) {
            return rejectWithValue({
                message: "Please, log in as a client",
            });
        }

        console.log(filter);

        if (!filter || filter === "null" || filter === "") {
            try {
                const response = await axios.get(
                    `${API_URL}/freelancers?page=1&limit=100`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                if (response.status === 200) {
                    return response.data.message.rows;
                }
            } catch (e) {
                return rejectWithValue({
                    message:
                        e.response?.data?.message ||
                        "Failed to fetch freelancers",
                });
            }
        } else {
            try {
                const response = await axios.get(
                    `${API_URL}/freelancers/filter?spec=${filter}`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                if (response.status === 200) {
                    return response.data.message;
                }
            } catch (e) {
                return rejectWithValue({
                    message:
                        e.response?.data?.message ||
                        "Failed to fetch freelancers",
                });
            }
        }
    }
);

// Async thunk to add a new freelancer
export const addFreelancerThunk = createAsyncThunk(
    "freelancers/addFreelancerThunk",
    async (newFreelancer) => {
        const response = await axios.post(
            "http://localhost:3001/api/freelancers",
            newFreelancer
        );

        if (response.data.success) {
            return response.data.data;
        }
        throw new Error("Failed to add freelancer");
    }
);

// Async thunk to delete a freelancer
export const deleteFreelancerThunk = createAsyncThunk(
    "freelancers/deleteFreelancerThunk",
    async (freelancerId) => {
        const response = await axios.delete(
            `http://localhost:3001/api/freelancers/${freelancerId}`
        );

        console.log(response.status);
        if (response.status !== 204) {
            throw new Error("Failed to delete freelancer");
        }
    }
);

// Async thunk to update a freelancer
export const updateFreelancerThunk = createAsyncThunk(
    "freelancers/updateFreelancerThunk",
    async ({ id, updatedFreelancer }) => {
        const response = await axios.put(
            `http://localhost:3001/api/freelancers/${id}`,
            updatedFreelancer
        );

        if (response.status === 204) {
            return { id, updatedFreelancer };
        }
        throw new Error("Failed to update freelancer");
    }
);

const handleError = (error) => {
    if (error.response) {
        return error.response.data.message || "An error occurred";
    }

    return error.message;
};

const initialState = {
    freelancers: [],
    filter: "",
    loading: false,
    error: null,
};

const freelancersSlice = createSlice({
    name: "freelancers",
    initialState,
    reducers: {
        updateFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFreelancers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFreelancers.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancers = action.payload;
            })
            .addCase(fetchFreelancers.rejected, (state, action) => {
                console.error(action.error.message);
                console.error(action.payload.message);
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(addFreelancerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFreelancerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancers.push(action.payload);
            })
            .addCase(addFreelancerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteFreelancerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFreelancerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancers = state.freelancers.filter(
                    (freelancer) => freelancer.id !== action.payload
                );
            })
            .addCase(deleteFreelancerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateFreelancerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFreelancerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancers = state.freelancers.map((freelancer) => {
                    if (freelancer.id === action.payload.id) {
                        return {
                            ...freelancer,
                            ...action.payload.updatedFreelancer,
                        };
                    }
                    return freelancer;
                });
            })
            .addCase(updateFreelancerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export actions
export const { updateFilter } = freelancersSlice.actions;

// Export the reducer
export default freelancersSlice.reducer;
