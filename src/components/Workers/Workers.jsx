import { Component } from "react";
import "./Workers.css";
import WorkerCard from "../WorkerCard/WorkerCard";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getWorkers } from "../../redux";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Workers(props) {
    const workers = useSelector((state) => state.workers);

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

            {workers.length > 0 ? (
                <div className="workers">
                    {workers.map((worker) => {
                        return (
                            <WorkerCard
                                key={worker.id}
                                name={worker.name}
                                surname={worker.surname}
                                spec={worker.spec}
                                header={worker.header}
                                rating={worker.rating}
                                id={worker.id}
                            />
                        );
                    })}
                </div>
            ) : (
                <h1>There are no workers in state</h1>
            )}
        </div>
    );
}

export default Workers;
