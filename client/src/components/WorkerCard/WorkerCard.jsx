import React from "react";
import "./WorkerCard.css";
import { Divider, Rating } from "@mui/material";
import WebDevPic from "../../img/workerspec/webdev.png";
import { useTranslation } from "react-i18next";

export default function WorkerCard({ name, surname, spec, header, rating }) {
    const { t } = useTranslation();

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
        </div>
    );
}
