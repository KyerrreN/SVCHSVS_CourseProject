import { Component } from "react";
import "./BidsComponent.css";
import { Button } from "@mui/material";
import Bid from "../Bid/Bid";

export default function BidsComponent() {
    return (
        <div className="container bids-container">
            <Button variant="contained" color="success">
                Add bid
            </Button>

            <Bid />
        </div>
    );
}
