import { Component } from "react";
import "./WorkerCard.css";
import { Button, Divider, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WebDevPic from "../../img/workerspec/webdev.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorker } from "../../redux";

export default function WorkerCard({
    name,
    surname,
    spec,
    header,
    rating,
    id,
}) {
    const dispatch = useDispatch();
    const workers = useSelector((state) => state.workers);

    return (
        <div className="workercard">
            <img
                src={WebDevPic}
                style={{ width: 160, height: 160, alignSelf: "center" }}
            ></img>

            <div className="workercard-cred">
                <span>
                    {name} {surname}
                </span>
                <Divider />
                <span>{spec}</span>
                <span>{header}</span>
                <Divider />
                <span>Worker Rating</span>
                <Rating
                    readOnly
                    defaultValue={rating}
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
                    onClick={() => {
                        dispatch(deleteWorker(id));
                        console.log("updated state: " + workers);
                    }}
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
