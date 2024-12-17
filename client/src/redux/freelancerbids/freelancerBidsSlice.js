import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_URL;

// Async thunk to fetch freelancer bids
export const fetchFreelancerBids = createAsyncThunk(
    "freelancerBids/fetchFreelancerBids",
    async (_, { rejectWithValue }) => {
        if (sessionStorage.getItem("token") === null) {
            return rejectWithValue({
                message: "Please, log in as a client",
            });
        }
        try {
            const clientId = sessionStorage.getItem("id");

            const response = await axios.get(
                `${API_URL}/freelancers/bids/client/${clientId}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            console.log(response.data.message);

            if (response.status === 200) {
                return response.data.message;
            }
        } catch (e) {
            return rejectWithValue({
                message:
                    e.response?.data?.message ||
                    "Failed to fetch your active projects",
            });
        }
    }
);
// Async thunk to update a freelancer bid
export const updateFreelancerBidThunk = createAsyncThunk(
    "freelancerBids/updateFreelancerBidThunk",
    async ({ bidId, bidObject }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL}/clients/${bidId}`,
                bidObject,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (response.status !== 200) {
                return rejectWithValue("Failed to update freelancer bid");
            }

            return bidId;
        } catch (e) {
            return rejectWithValue({
                message: e.response?.data?.message || "Failed to update",
            });
        }
    }
);

export const abortFreelancerBidThunk = createAsyncThunk(
    "freelancerBids/abortFreelancerBidThunk",
    async ({ bidId, bidObject }, { rejectWithValue }) => {
        bidId = Number(bidId);

        try {
            const response = await axios.put(
                `${API_URL}/clients/${bidId}`,
                bidObject,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (response.status !== 204) {
                return rejectWithValue("Failed to abort freelancer bid");
            }

            return bidId;
        } catch (e) {
            return rejectWithValue({
                message: e.response?.data?.message || "Failed to update",
            });
        }
    }
);

export const completeFreelancerBidThunk = createAsyncThunk(
    "freelancerBids/completeFreelancerBidThunk",
    async ({ bidId, bidObject }, { rejectWithValue }) => {
        bidId = Number(bidId);

        try {
            const response = await axios.put(
                `${API_URL}/clients/${bidId}`,
                bidObject,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (response.status !== 204) {
                return rejectWithValue("Failed to complete freelancer bid");
            }

            return bidId;
        } catch (e) {
            return rejectWithValue({
                message: e.response?.data?.message || "Failed to complete",
            });
        }
    }
);

// Async thunk to add a new freelancer bid
export const addFreelancerBidThunk = createAsyncThunk(
    "freelancerBids/addFreelancerBidThunk",
    async (newFreelancerBid) => {
        const response = await axios.post(
            "http://localhost:3001/api/freelancers/bids",
            newFreelancerBid
        );

        if (response.data.success) {
            return response.data.data;
        }
        throw new Error("Failed to add freelancer bid");
    }
);

// Async thunk to delete a freelancer bid
export const deleteFreelancerBidThunk = createAsyncThunk(
    "freelancerBids/deleteFreelancerBidThunk",
    async ({ freelancerId, bidId }) => {
        console.log("freel: ", freelancerId, ". bid: ", bidId);
        const response = await axios.delete(
            `http://localhost:3001/api/freelancers/bids/${freelancerId}/${bidId}`
        );

        if (response.status !== 204) {
            throw new Error("Failed to delete freelancer bid");
        }
        // return freelancerBidId; // Return the ID for further processing
    }
);

const initialState = {
    freelancerBids: [],
    filter: "",
    loading: false,
    error: null,
};

const freelancerBidsSlice = createSlice({
    name: "freelancerBids",
    initialState,
    reducers: {
        updateFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFreelancerBids.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFreelancerBids.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancerBids = action.payload;
            })
            .addCase(fetchFreelancerBids.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(addFreelancerBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFreelancerBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancerBids.push(action.payload);
            })
            .addCase(addFreelancerBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteFreelancerBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFreelancerBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancerBids = state.freelancerBids.filter(
                    (bid) => bid.id !== action.payload
                );
            })
            .addCase(deleteFreelancerBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateFreelancerBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFreelancerBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancerBids = state.freelancerBids.map((bid) => {
                    if (bid.id === action.payload.id) {
                        return {
                            ...bid,
                            ...action.payload.updatedFreelancerBid,
                        };
                    }
                    return bid;
                });
            })
            .addCase(updateFreelancerBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(abortFreelancerBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(abortFreelancerBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancerBids = state.freelancerBids.map((bid) => {
                    if (bid.id === action.payload.bidId) {
                        return {
                            ...bid,
                            ...action.payload.updatedFreelancerBid,
                        };
                    }
                    return bid;
                });
            })
            .addCase(abortFreelancerBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(completeFreelancerBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(completeFreelancerBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.freelancerBids = state.freelancerBids.map((bid) => {
                    if (bid.id === action.payload.bidId) {
                        return {
                            ...bid,
                            ...action.payload.updatedFreelancerBid,
                        };
                    }
                    return bid;
                });
            })
            .addCase(completeFreelancerBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export actions
export const { updateFilter } = freelancerBidsSlice.actions;

// Export the reducer
export default freelancerBidsSlice.reducer;
