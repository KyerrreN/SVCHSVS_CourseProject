import { Component } from "react";
import "./Workers.css";
import WorkerCard from "../WorkerCard/WorkerCard";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Workers() {
    return (
        <div className="container workers-container">
            <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                sx={{ alignSelf: "center" }}
            >
                Add worker
            </Button>

            <div className="workers">
                <WorkerCard />
                <WorkerCard />
                <WorkerCard />
                <WorkerCard />
                <WorkerCard />
                <WorkerCard />
                <WorkerCard />
            </div>
        </div>
    );
}
