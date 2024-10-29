import { Component } from "react";
import "./WorkerCard.css";
import { Button, Divider, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import WebDevPic from "../../img/workerspec/webdev.png";

export default function WorkerCard() {
    return (
        <div className="workercard">
            <img
                src={WebDevPic}
                style={{ width: 160, height: 160, alignSelf: "center" }}
            ></img>

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
                <Divider />
            </div>

            <div className="workercard-control">
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                >
                    Delete worker
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<EditIcon />}
                >
                    Edit worker
                </Button>
            </div>
        </div>
    );
}
