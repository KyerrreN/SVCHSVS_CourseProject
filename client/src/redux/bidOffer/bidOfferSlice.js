import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_URL;

// Async thunk to fetch bid offers
export const fetchBidOffers = createAsyncThunk(
    "bidOffers/fetchBidOffers",
    async ({ clientId }, { rejectWithValue }) => {
        if (sessionStorage.getItem("token") === null) {
            return rejectWithValue({
                message: "Please log in to view bid offers",
            });
        }
        try {
            const response = await axios.get(`${API_URL}/offers/${clientId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });

            if (response.status === 200) {
                console.log(response.data);
                return response.data.message;
            }
        } catch (e) {
            return rejectWithValue({
                message:
                    e.response?.data?.message || "Failed to fetch bid offers",
            });
        }
    }
);

// Async thunk to delete a bid offer
export const deleteBidOfferThunk = createAsyncThunk(
    "bidOffers/deleteBidOfferThunk",
    async ({ bidId }, { rejectWithValue }) => {
        if (sessionStorage.getItem("token") === null) {
            return rejectWithValue({
                message: "Please log in to delete a bid offer",
            });
        }
        try {
            const response = await axios.delete(`${API_URL}/offers/${bidId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });

            if (response.status === 204) {
                return bidId;
            }
        } catch (e) {
            return rejectWithValue({
                message:
                    e.response?.data?.message || "Failed to delete bid offer",
            });
        }
    }
);

// Async thunk to accept a bid offer
export const addBidOfferThunk = createAsyncThunk(
    "bidOffers/addBidOfferThunk",
    async ({ bidId }, { rejectWithValue }) => {
        if (sessionStorage.getItem("token") === null) {
            return rejectWithValue({
                message: "Please log in to accept a bid offer",
            });
        }
        try {
            const response = await axios.post(
                `${API_URL}/offers/accept/${bidId}`,
                {},
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
                    e.response?.data?.message || "Failed to accept bid offer",
            });
        }
    }
);

// Initial state
const initialState = {
    bidOffers: [],
    loading: false,
    error: null,
};

// Create the slice
const bidOfferSlice = createSlice({
    name: "bidOffers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBidOffers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBidOffers.fulfilled, (state, action) => {
                state.loading = false;
                state.bidOffers = action.payload;
            })
            .addCase(fetchBidOffers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(addBidOfferThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBidOfferThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.bidOffers = state.bidOffers.filter(
                    (bid) => bid.id !== action.payload
                );
            })
            .addCase(addBidOfferThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(deleteBidOfferThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBidOfferThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.bidOffers = state.bidOffers.filter(
                    (bid) => bid.id !== action.payload
                );
            })
            .addCase(deleteBidOfferThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

// Export the reducer
export default bidOfferSlice.reducer;
