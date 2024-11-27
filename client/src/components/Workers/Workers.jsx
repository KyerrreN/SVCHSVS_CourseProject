import { useState, useEffect } from "react";
import "./Workers.css";
import WorkerCard from "../WorkerCard/WorkerCard";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import React from "react";
import FilterDialog from "../FilterDialog/FilterDialog";
import { useTranslation } from "react-i18next";
import WorkersAddDialog from "../WorkersAddDialog/WorkersAddDialog";

function Workers(props) {
    // Redux selectors + dispatch
    const workers = useSelector((state) => state.workers.workers);
    const filter = useSelector((state) => state.workers.filter);
    const { t } = useTranslation();

    // Filtering workers
    const filteredWorkers =
        filter === ""
            ? workers
            : workers.filter((worker) => worker.spec === filter);

    // Sorting
    const [sortOrder, setSortOrder] = useState("asc");

    const sortedWorkers = [...filteredWorkers].sort((a, b) => {
        return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
    });

    // Dialog for filter
    const [openFilter, setOpenFilter] = React.useState(false);

    const handleFilterOpen = () => {
        setOpenFilter(true);
    };

    const handleFilterClose = () => {
        setOpenFilter(false);
    };

    return (
        <div className="container workers-container">
            <WorkersAddDialog />

            {workers.length > 0 ? (
                <>
                    <Button
                        variant="contained"
                        color="white"
                        onClick={handleFilterOpen}
                        sx={{ alignSelf: "center", marginTop: 2 }}
                    >
                        {t("filter")}
                    </Button>
                    <Button
                        variant="contained"
                        color="blue"
                        onClick={() => {
                            setSortOrder((prevOrder) =>
                                prevOrder === "asc" ? "desc" : "asc"
                            );
                        }}
                        sx={{ alignSelf: "center", marginTop: 2 }}
                    >
                        {t("freelancers-sort")}
                    </Button>

                    <div className="workers">
                        {sortedWorkers.map((worker) => (
                            <WorkerCard
                                key={worker.id}
                                name={worker.name}
                                surname={worker.surname}
                                spec={worker.spec}
                                header={worker.header}
                                rating={worker.rating}
                                id={worker.id}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <h1 style={{ alignSelf: "center", textAlign: "center" }}>
                    There are no workers in state
                </h1>
            )}

            <FilterDialog
                selectedValue=""
                open={openFilter}
                onClose={handleFilterClose}
                header="Choose freelancer's specialty"
                sliceToHandle="workers"
            />
        </div>
    );
}

export default Workers;
