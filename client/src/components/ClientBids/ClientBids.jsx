import React from "react";
import "../BidsComponent/BidsComponent.css";
import { Button } from "@mui/material";
import Bid from "../Bid/Bid";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import FilterDialog from "../FilterDialog/FilterDialog";
import { useTranslation } from "react-i18next";
import BidsComponentDialog from "../BidsComponentDialog/BidsComponentDialog";
import {
    addBidThunk,
    deleteBidThunk,
    fetchBids,
    fetchClientBids,
    updateBidThunk,
} from "../../redux/bids/bidsSlice";
import ClientBidCard from "../ClientBidCard/ClientBidCard";

function ClientBids() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // Sort states
    const [sortOrder, setSortOrder] = useState("asc");

    // Dialog for filter
    const [openFilter, setOpenFilter] = React.useState(false);

    const handleFilterOpen = () => {
        setOpenFilter(true);
    };

    const handleFilterClose = () => {
        setOpenFilter(false);
    };

    // redux
    const { bids, loading, error } = useSelector((state) => state.bids);

    const handleDeleteBid = async ({ clientId, bidId }) => {
        try {
            await dispatch(deleteBidThunk({ clientId, bidId })).unwrap();
            dispatch(fetchClientBids({ bidId: sessionStorage.getItem("id") }));
            console.log("Bid deleted successfully, fetching updated bids.");
        } catch (error) {
            console.error("Failed to delete bid:", error);
        }
    };

    const handleAddBid = async ({ bidObject }) => {
        try {
            const addedBid = await dispatch(
                addBidThunk({ bidObject })
            ).unwrap();

            console.log("ADDED BID: ", addedBid);
            await dispatch(
                fetchClientBids({ bidId: sessionStorage.getItem("id") })
            ).unwrap();
            console.log("Bid added succesfully, fetching updated bids");
        } catch (error) {
            console.error("Failed to add bid:", error);
        }
    };

    useEffect(() => {
        dispatch(fetchClientBids({ bidId: sessionStorage.getItem("id") }));
    }, [dispatch]);

    return (
        <div className="container bids-container">
            <BidsComponentDialog onAdd={handleAddBid} />

            {/* <FilterDialog
                selectedValue=""
                open={openFilter}
                onClose={handleFilterClose}
                header="Choose needed specialty"
                sliceToHandle="bids"
            /> */}
            {error && <h1>Error: {error}</h1>}

            {loading === true ? (
                <h1>Bids are loading...</h1>
            ) : bids.length > 0 ? (
                <>
                    <h1 style={{ alignSelf: "center", textAlign: "center" }}>
                        Here are the bids that have not been yet taken
                    </h1>

                    {bids.map((bid) => {
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
