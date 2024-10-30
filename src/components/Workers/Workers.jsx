import { Component } from "react";
import "./Workers.css";
import WorkerCard from "../WorkerCard/WorkerCard";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getWorkers } from "../../redux";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        workers: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getWorkers: () => dispatch(getWorkers()),
    };
};

function Workers(props) {
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

            {props.workers.length > 0 ? (
                <div className="workers">
                    {props.workers.map((worker) => {
                        return (
                            <WorkerCard
                                key={worker.id}
                                name={worker.name}
                                surname={worker.surname}
                                spec={worker.spec}
                                header={worker.header}
                                rating={worker.rating}
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

export default connect(mapStateToProps, mapDispatchToProps)(Workers);
