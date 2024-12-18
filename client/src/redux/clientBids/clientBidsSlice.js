import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_URL;

export const completeClientBidThunk = createAsyncThunk(
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
// Async thunk to fetch client bids
export const fetchClientBidsThunk = createAsyncThunk(
    "clientBids/fetchClientBidsThunk",
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
                    e.response?.data?.message || "Failed to fetch client bids",
            });
        }
    }
);

// Async thunk to update a client bid
export const updateClientBidThunk = createAsyncThunk(
    "clientBids/updateClientBidThunk",
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
                return rejectWithValue("Failed to update client bid");
            }

            return bidId;
        } catch (e) {
            return rejectWithValue({
                message: e.response?.data?.message || "Failed to update",
            });
        }
    }
);

// Async thunk to delete a client bid
export const deleteClientBidThunk = createAsyncThunk(
    "clientBids/deleteClientBidThunk",
    async ({ bidId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${API_URL}/clients/bids/${bidId}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (response.status !== 204) {
                return rejectWithValue("Failed to delete client bid");
            }

            return bidId;
        } catch (e) {
            return rejectWithValue({
                message: e.response?.data?.message || "Failed to delete",
            });
        }
    }
);

export const abortClientBidThunk = createAsyncThunk(
    "clientBids/abortClientBidThunk",
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

const initialState = {
    clientBids: [],
    loading: false,
    error: null,
};

const clientBidsSlice = createSlice({
    name: "clientBids",
    initialState,
    reducers: {
        resetClientBids: (state) => {
            state.clientBids = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(abortClientBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(abortClientBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.clientBids = state.clientBids.map((bid) => {
                    if (bid.id === action.payload.bidId) {
                        return {
                            ...bid,
                            ...action.payload.updatedFreelancerBid,
                        };
                    }
                    return bid;
                });
            })
            .addCase(abortClientBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchClientBidsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClientBidsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.clientBids = action.payload;
            })
            .addCase(fetchClientBidsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(updateClientBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateClientBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                const updatedBidId = action.payload;
                state.clientBids = state.clientBids.map((bid) =>
                    bid.bidId === updatedBidId
                        ? { ...bid, ...action.payload }
                        : bid
                );
            })
            .addCase(updateClientBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(deleteClientBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteClientBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                const deletedBidId = action.payload;
                state.clientBids = state.clientBids.filter(
                    (bid) => bid.bidId !== deletedBidId
                );
            })
            .addCase(deleteClientBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(completeClientBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(completeClientBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.clientBids = state.clientBids.map((bid) => {
                    if (bid.id === action.payload.bidId) {
                        return {
                            ...bid,
                            ...action.payload.updatedFreelancerBid,
                        };
                    }
                    return bid;
                });
            })
            .addCase(completeClientBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export actions
export const { resetClientBids } = clientBidsSlice.actions;

// Export the reducer
export default clientBidsSlice.reducer;
