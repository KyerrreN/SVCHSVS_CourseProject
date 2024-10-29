import { Component } from "react";
import "./Bid.css";
import GavelIcon from "@mui/icons-material/Gavel";
import BidInfo from "../BidInfo/BidInfo";
import { Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Bid() {
    return (
        <>
            <div className="bid-container">
                <div className="bid">
                    <div className="bid-header">
                        <GavelIcon sx={{ width: 120, height: 120 }} />

                        <span>
                            Client server application for a freelance platform
                        </span>
                    </div>

                    <div className="bid-desc">
                        <BidInfo
                            header="Project Description"
                            content="This project is all about making sure that your course work
                    will be completed in time. Time constraints are pretty
                    important here. Please, use your time responsibly."
                        />
                        <BidInfo
                            header="Who do we need?"
                            content="Web Developer"
                        />
                        <BidInfo header="Payment" content="950$" />
                        <BidInfo header="Deadline" content="19.02.2023" />
                    </div>
                </div>

                <div className="bid-control">
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                    >
                        Delete bid
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<EditIcon />}
                    >
                        Edit bid
                    </Button>
                </div>

                <Divider sx={{ paddingTop: 2 }} />
            </div>
        </>
    );
}
