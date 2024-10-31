import { Component } from "react";
import "./Bid.css";
import GavelIcon from "@mui/icons-material/Gavel";
import BidInfo from "../BidInfo/BidInfo";
import { Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteBid } from "../../redux/bids/bidsSlice";

export default function Bid({ name, desc, needed, payment, deadline, id }) {
    const dispatch = useDispatch();

    return (
        <>
            <div className="bid-container">
                <div className="bid">
                    <div className="bid-header">
                        <GavelIcon sx={{ width: 120, height: 120 }} />

                        <span>{name}</span>
                    </div>

                    <div className="bid-desc">
                        <BidInfo header="Project Description" content={desc} />
                        <BidInfo header="Who do we need?" content={needed} />
                        <BidInfo header="Payment" content={payment} />
                        <BidInfo header="Deadline" content={deadline} />
                    </div>
                </div>

                <div className="bid-control">
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => dispatch(deleteBid(id))}
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
