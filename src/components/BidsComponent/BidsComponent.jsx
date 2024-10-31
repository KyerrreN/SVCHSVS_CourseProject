import { Component } from "react";
import "./BidsComponent.css";
import { Button } from "@mui/material";
import Bid from "../Bid/Bid";
import { useSelector } from "react-redux";

function BidsComponent(props) {
    const bids = useSelector((state) => state.bids.bids);

    return (
        <div className="container bids-container">
            <Button variant="contained" color="success">
                Add bid
            </Button>

            {bids.map((bid) => {
                console.log("iteration");

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
            })}
        </div>
    );
}

export default BidsComponent;
