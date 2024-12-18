import React from "react";
import "./BidsComponent.css";
import Bid from "../Bid/Bid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchBids, postBidOfferThunk } from "../../redux/bids/bidsSlice";

function BidsComponent() {
    const dispatch = useDispatch();

    // redux
    const { bids, loading, error } = useSelector((state) => state.bids);

    const handleOfferBid = async (bidObject) => {
        try {
            await dispatch(postBidOfferThunk(bidObject)).unwrap();
            await dispatch(
                fetchBids({ id: sessionStorage.getItem("id") })
            ).unwrap();
        } catch (e) {
            console.error("Failed to post an offer: ", e);
        }
    };

    useEffect(() => {
        dispatch(fetchBids({ id: sessionStorage.getItem("id") }));
    }, [dispatch]);

    return (
        <div className="container bids-container">
            {error && <h1>Error: {error}</h1>}

            {loading === true ? (
                <h1>Bids are loading...</h1>
            ) : bids.length > 0 ? (
                bids.map((bid) => {
                    return (
                        <Bid
                            key={bid.id}
                            name={bid.name}
                            desc={bid.desc}
                            needed={bid.Spec.name}
                            payment={bid.payment}
                            id={bid.id}
                            clientName={bid.Client.name}
                            clientSurname={bid.Client.surname}
                            onOffer={handleOfferBid}
                        />
                    );
                })
            ) : (
                <h1>No bids to display</h1>
            )}
        </div>
    );
}

export default BidsComponent;
