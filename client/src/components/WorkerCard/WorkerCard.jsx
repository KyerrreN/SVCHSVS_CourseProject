import React from "react";
import "./WorkerCard.css";
import { Button, Divider, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WebDevPic from "../../img/workerspec/webdev.png";
import { useDispatch } from "react-redux";
import { deleteWorker } from "../../redux/workers/workersSlice";
import { useTranslation } from "react-i18next";
import WorkerCardEditDialog from "../WorkerCardEditDialog/WorkerCardEditDialog";

export default function WorkerCard({
    name,
    surname,
    spec,
    header,
    rating,
    id,
}) {
    const { t } = useTranslation();
    // redux hooks
    const dispatch = useDispatch();

    return (
        <div className="workercard">
            <img
                src={WebDevPic}
                style={{ width: 160, height: 160, alignSelf: "center" }}
                alt="Worker"
            ></img>

            <div className="workercard-cred">
                <span>
                    {name} {surname}
                </span>
                <Divider />
                <span>{spec}</span>
                <span>{header}</span>
                <Divider />
                <span>{t("freelancers-worker-rating")}</span>
                <Rating
                    readOnly
                    defaultValue={rating}
                    precision={0.1}
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
                    }}
                >
                    {t("freelancers-delete")}
                </Button>

                <WorkerCardEditDialog
                    name={name}
                    id={id}
                    surname={surname}
                    spec={spec}
                    rating={rating}
                    header={header}
                />
            </div>
        </div>
    );
}
