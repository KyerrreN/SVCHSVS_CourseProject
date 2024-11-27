import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBids = createAsyncThunk("bids/fetchBids", async () => {
    const response = await axios.get("http://localhost:3001/api/bids");

    if (response.data.success) {
        return response.data.data.rows;
    }
});

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
            });
    },
});

export const { deleteBid, updateBid, addBid, filterBids, updateSort } =
    bidsSlice.actions;
export default bidsSlice.reducer;
