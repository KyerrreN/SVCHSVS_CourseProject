import React from "react";
import "../BidsComponent/BidsComponent.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import BidsComponentDialog from "../BidsComponentDialog/BidsComponentDialog";
import ClientBidCard from "../ClientBidCard/ClientBidCard";
import {
    manageAddBidThunk,
    manageDeleteBidThunk,
    manageFetchClientBids,
} from "../../redux/manageBid/manageBidSlice";

function ClientBids() {
    const dispatch = useDispatch();

    // redux
    const { manageBids, loading, error } = useSelector(
        (state) => state.manageBids
    );

    const handleDeleteBid = async ({ clientId, bidId }) => {
        try {
            await dispatch(manageDeleteBidThunk({ clientId, bidId })).unwrap();
            dispatch(
                manageFetchClientBids({ bidId: sessionStorage.getItem("id") })
            );
            console.log("Bid deleted successfully, fetching updated bids.");
        } catch (error) {
            console.error("Failed to delete bid:", error);
        }
    };

    const handleAddBid = async ({ bidObject }) => {
        try {
            const addedBid = await dispatch(
                manageAddBidThunk({ bidObject })
            ).unwrap();

            console.log("ADDED BID: ", addedBid);
            await dispatch(
                manageFetchClientBids({ bidId: sessionStorage.getItem("id") })
            ).unwrap();
            console.log("Bid added succesfully, fetching updated bids");
        } catch (error) {
            console.error("Failed to add bid:", error);
        }
    };

    useEffect(() => {
        dispatch(
            manageFetchClientBids({ bidId: sessionStorage.getItem("id") })
        );
    }, [dispatch]);

    return (
        <div className="container bids-container">
            <BidsComponentDialog onAdd={handleAddBid} />

            {error && <h1>Error: {error}</h1>}

            {loading === true ? (
                <h1>Bids are loading...</h1>
            ) : manageBids.length > 0 ? (
                <>
                    <h1 style={{ alignSelf: "center", textAlign: "center" }}>
                        Here are the bids that have not been yet taken
                    </h1>

                    {manageBids.map((bid) => {
                        return (
                            <ClientBidCard
                                key={bid.id}
                                name={bid.name}
                                desc={bid.desc}
                                needed={bid.Spec.name}
                                payment={bid.payment}
                                id={bid.id}
                                clientId={bid.clientId}
                                onDelete={handleDeleteBid}
                            />
                        );
                    })}
                </>
            ) : (
                <h1>No bids to display</h1>
            )}
        </div>
    );
}

export default ClientBids;
