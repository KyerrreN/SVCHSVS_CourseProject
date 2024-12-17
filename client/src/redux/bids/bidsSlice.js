import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosHeaders } from "axios";

const API_URL = process.env.REACT_APP_URL;

export const fetchBids = createAsyncThunk(
    "bids/fetchBids",
    async ({ id }, { rejectWithValue }) => {
        if (sessionStorage.getItem("token") === null) {
            return rejectWithValue({
                message: "Please, log in as a freelancer",
            });
        }

        try {
            const response = await axios.get(
                `${API_URL}/bids/freelancer/${id}`,
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

export const fetchClientBids = createAsyncThunk(
    "bids/fetchClientBids",
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

export const deleteBidThunk = createAsyncThunk(
    "bids/deleteBidThunk",
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

export const addBidThunk = createAsyncThunk(
    "bids/addBidThunk",
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

export const updateBidThunk = createAsyncThunk(
    "bids/updateBidThunk",
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

const initialState = {
    bids: [],
    filter: "",
    loading: false,
    error: null,
};

const bidsSlice = createSlice({
    name: "bids",
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
            .addCase(fetchBids.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBids.fulfilled, (state, action) => {
                state.loading = false;
                state.bids = action.payload;
            })
            .addCase(fetchBids.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.bids.push(action.payload);
            })
            .addCase(addBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.bids = state.bids.filter(
                    (bid) => bid.id !== action.payload
                );
            })
            .addCase(deleteBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateBidThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBidThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.bids = state.bids.map((bid) => {
                    if (bid.id === action.payload.id) {
                        return { ...bid, ...action.payload.updatedBid };
                    }
                    return bid;
                });
            })
            .addCase(updateBidThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchClientBids.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClientBids.fulfilled, (state, action) => {
                state.loading = false;
                state.bids = action.payload;
            })
            .addCase(fetchClientBids.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { deleteBid, updateBid, addBid, filterBids, updateSort } =
    bidsSlice.actions;
export default bidsSlice.reducer;
