import { configureStore } from "@reduxjs/toolkit";
import workersReducer from "./workers/workersSlice";
import bidsReducer from "./bids/bidsSlice";
import freelancerBidsReducer from "./freelancerbids/freelancerBidsSlice";
import bidOffersReducer from "./bidOffer/bidOfferSlice";

const store = configureStore({
    reducer: {
        freelancers: workersReducer,
        bids: bidsReducer,
        freelancerBids: freelancerBidsReducer,
        bidOffers: bidOffersReducer,
    },
});

export default store;
