import React from "react";
import "./BidsComponent.css";
import { Button } from "@mui/material";
import Bid from "../Bid/Bid";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import FilterDialog from "../FilterDialog/FilterDialog";
import { useTranslation } from "react-i18next";
import BidsComponentDialog from "../BidsComponentDialog/BidsComponentDialog";
import { fetchBids } from "../../redux/bids/bidsSlice";

function BidsComponent() {
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

    useEffect(() => {
        dispatch(fetchBids());
    }, [dispatch]);

    return (
        <div className="container bids-container">
            <BidsComponentDialog />

            <FilterDialog
                selectedValue=""
                open={openFilter}
                onClose={handleFilterClose}
                header="Choose needed specialty"
                sliceToHandle="bids"
            />
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
                            needed={bid.spec}
                            payment={bid.payment}
                            id={bid.id}
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
