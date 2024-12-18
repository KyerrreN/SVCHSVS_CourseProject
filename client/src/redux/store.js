import { configureStore } from "@reduxjs/toolkit";
import workersReducer from "./workers/workersSlice";
import bidsReducer from "./bids/bidsSlice";
import freelancerBidsReducer from "./freelancerbids/freelancerBidsSlice";
import bidOffersReducer from "./bidOffer/bidOfferSlice";
import clientBidsReducer from "./clientBids/clientBidsSlice";
import manageBidsReducer from "./manageBid/manageBidSlice";

const store = configureStore({
    reducer: {
        freelancers: workersReducer,
        bids: bidsReducer,
        freelancerBids: freelancerBidsReducer,
        bidOffers: bidOffersReducer,
        clientBids: clientBidsReducer,
        manageBids: manageBidsReducer,
    },
});

export default store;
