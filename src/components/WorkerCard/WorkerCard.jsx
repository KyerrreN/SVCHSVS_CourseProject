import { Component } from "react";
import "./WorkerCard.css";
import HttpIcon from "@mui/icons-material/Http";
import { Divider, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function WorkerCard() {
    return (
        <div className="workercard">
            <HttpIcon sx={{ fontSize: 100 }} className="workercard-icon" />

            <div className="workercard-cred">
                <span>Anatoli Karpov</span>
                <Divider />
                <span>Web Developer</span>
                <span>
                    I will create a website from scratch. Hit me up with any
                    offer
                </span>
                <Divider />
                <span>Worker Rating</span>
                <Rating
                    readOnly
                    defaultValue={2}
                    precision={0.2}
                    sx={{ color: "black" }}
                />
            </div>
        </div>
    );
}
