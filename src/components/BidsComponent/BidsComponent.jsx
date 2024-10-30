import { Component } from "react";
import "./BidsComponent.css";
import { Button } from "@mui/material";
import Bid from "../Bid/Bid";

function BidsComponent(props) {
    return (
        <div className="container bids-container">
            <Button variant="contained" color="success">
                Add bid
            </Button>

            <Bid />
            <Bid />
            <Bid />
            <Bid />
            <Bid />
            <Bid />
            <Bid />
        </div>
    );
}

export default BidsComponent;
