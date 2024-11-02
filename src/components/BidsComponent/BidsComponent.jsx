import React from "react";
import "./BidsComponent.css";
import { Button } from "@mui/material";
import Bid from "../Bid/Bid";
import { useSelector } from "react-redux";
import { useState } from "react";
import FilterDialog from "../FilterDialog/FilterDialog";
import { useTranslation } from "react-i18next";
import BidsComponentDialog from "../BidsComponentDialog/BidsComponentDialog";

function BidsComponent() {
    const { t } = useTranslation();

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
    const bids = useSelector((state) => state.bids.bids);
    const filter = useSelector((state) => state.bids.filter);

    const filteredBids =
        filter === ""
            ? [...bids]
            : [...bids.filter((bid) => bid.needed === filter)];

    const sortedBids = [...filteredBids].sort((a, b) => {
        return sortOrder === "asc"
            ? a.payment - b.payment
            : b.payment - a.payment;
    });

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

            {bids.length > 0 ? (
                <>
                    <Button
                        variant="contained"
                        color="white"
                        onClick={handleFilterOpen}
                    >
                        {t("filter")}
                    </Button>

                    <Button
                        variant="contained"
                        color="blue"
                        onClick={() => {
                            setSortOrder((prevOrder) =>
                                prevOrder === "asc" ? "desc" : "asc"
                            );
                        }}
                    >
                        {t("bid-sort")}
                    </Button>

                    {(sortedBids.length > 0 ? sortedBids : filteredBids).map(
                        (bid) => {
                            return (
                                <Bid
                                    key={bid.id}
                                    name={bid.name}
                                    desc={bid.desc}
                                    needed={bid.needed}
                                    payment={bid.payment}
                                    deadline={bid.deadline}
                                    id={bid.id}
                                />
                            );
                        }
                    )}
                </>
            ) : (
                <h1 style={{ textAlign: "center" }}>There are no bids</h1>
            )}
        </div>
    );
}

export default BidsComponent;
