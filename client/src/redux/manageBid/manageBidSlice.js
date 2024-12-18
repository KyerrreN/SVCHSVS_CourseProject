import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_URL;

export const manageFetchClientBids = createAsyncThunk(
    "bids/manageFetchClientBids",
    async ({ bidId }, { rejectWithValue }) => {
        if (sessionStorage.getItem("token") === null) {
            return rejectWithValue({
                message: "Please, log in as a client",
            });
        }

        try {
            const response = await axios.get(
                `${API_URL}/bids/client/${bidId}`,
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
                    "Failed to fetch your non-taken bids",
            });
        }
    }
);

export const manageDeleteBidThunk = createAsyncThunk(
    "bids/manageDeleteBidThunk",
    async ({ bidId, clientId }, { rejectWithValue }) => {
        if (sessionStorage.getItem("token") === null) {
            return rejectWithValue({
                message: "Please, log in as a client",
            });
        }

        try {
            const response = await axios.delete(
                `${API_URL}/bids/client/${bidId}/${clientId}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (response.status === 204) {
                return bidId;
            }
        } catch (e) {
            return rejectWithValue({
                message:
                    e.response?.data?.message ||
                    "Failed to fetch your non-taken bids",
            });
        }
    }
);

export const manageAddBidThunk = createAsyncThunk(
    "bids/manageAddBidThunk",
    async ({ bidObject }, { rejectWithValue }) => {
        if (sessionStorage.getItem("token") === null) {
            return rejectWithValue({
                message: "Please, log in as a client",
            });
        }

        if (sessionStorage.getItem("id") === null) {
            return rejectWithValue({
                message: "Please, log in as a client. No id detected",
            });
        }
        try {
            const response = await axios.post(
                `${API_URL}/clients/${sessionStorage.getItem("id")}`,
                bidObject,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            if (response.status === 201) {
                return response.data.message;
            }
        } catch (e) {
            console.log(e.response);
            return rejectWithValue({
                message:
                    e.response?.data?.message ||
                    "Failed to fetch your non-taken bids",
            });
        }
    }
);

export const manageUpdateBidThunk = createAsyncThunk(
    "bids/manageUpdateBidThunk",
    async ({ id, updatedBid }) => {
        const response = await axios.put(
            `http://localhost:3001/api/bids/${id}`,
            updatedBid
        );

        if (response.status === 204) {
            return { id, updatedBid };
        } else {
            throw new Error("Failed to update bid");
        }
    }
);

export const managePostBidOfferThunk = createAsyncThunk(
    "bids/managePostBidOfferThunk",
    async (bidOffer, { rejectWithValue }) => {
        if (sessionStorage.getItem("token") === null) {
            return rejectWithValue({
                message: "Please, log in as a client",
            });
        }

        console.log(bidOffer);

        try {
            const response = await axios.post(`${API_URL}/offers/`, bidOffer, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });

            if (response.status === 201) {
                return { message: "Bid offer posted successfully" };
            }
        } catch (e) {
            return rejectWithValue({
                message:
                    e.response?.data?.message || "Failed to post bid offer",
            });
        }
    }
);

const initialState = {
    manageBids: [],
    filter: "",
    loading: false,
    error: null,
};

const bidsSlice = createSlice({
    name: "manageBids",
    initialState,
    reducers: {
        deleteBid: (state, action) => {
            state.bids = state.bids.filter(
                (worker) => worker.id !== action.payload
            );
        },
        updateBid: (state, action) => {
            state.bids = state.bids.map((bid) => {
                if (bid.id === action.payload.id) {
                    return { ...bid, ...action.payload };
                }

                return bid;
            });
        },
        addBid: (state, action) => {
            state.bids = [...state.bids, action.payload];
        },
        filterBids: (state, action) => {
            state.filter = action.payload;
        },
        updateSort: (state, action) => {
            state.sortByPayment = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(manageAddBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(manageAddBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.manageBids.push(action.payload);
            })
            .addCase(manageAddBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(manageDeleteBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(manageDeleteBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.manageBids = state.manageBids.filter(
                    (bid) => bid.id !== action.payload
                );
            })
            .addCase(manageDeleteBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(manageUpdateBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(manageUpdateBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.manageBids = state.manageBids.map((bid) => {
                    if (bid.id === action.payload.id) {
                        return { ...bid, ...action.payload.updatedBid };
                    }
                    return bid;
                });
            })
            .addCase(manageUpdateBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(manageFetchClientBids.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(manageFetchClientBids.fulfilled, (state, action) => {
                state.loading = false;
                state.manageBids = action.payload;
            })
            .addCase(manageFetchClientBids.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(managePostBidOfferThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(managePostBidOfferThunk.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Bid offer posted:", action.payload);
            })
            .addCase(managePostBidOfferThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export const { deleteBid, updateBid, addBid, filterBids, updateSort } =
    bidsSlice.actions;
export default bidsSlice.reducer;
