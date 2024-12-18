import { useState, useEffect } from "react";
import "./Workers.css";
import WorkerCard from "../WorkerCard/WorkerCard";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import React from "react";
import FilterDialog from "../FilterDialog/FilterDialog";
import { useTranslation } from "react-i18next";
import {
    deleteFreelancerThunk,
    fetchFreelancers,
    updateFreelancerThunk,
} from "../../redux/workers/workersSlice";

function Workers(props) {
    const { freelancers, loading, error } = useSelector(
        (state) => state.freelancers
    );
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // sort
    const [isSorted, setIsSorted] = useState(false);

    // search
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // filter
    const [filter, setFilter] = useState(() => {
        return sessionStorage.getItem("workerFilter") || "";
    });
    const [openFilter, setOpenFilter] = useState(false);

    useEffect(() => {
        dispatch(fetchFreelancers(filter));
    }, [dispatch, filter]);

    const handleFilterOpen = () => {
        setOpenFilter(true);
    };

    const handleFilterClose = (newFilter) => {
        setOpenFilter(false);
        if (newFilter !== undefined) {
            setFilter(newFilter);
            sessionStorage.setItem("workerFilter", newFilter);
        }
    };

    const handleUpdate = async ({ id, freelancerObject }) => {
        try {
            await dispatch(
                updateFreelancerThunk({
                    id,
                    updatedFreelancer: freelancerObject,
                })
            ).unwrap();
            await dispatch(fetchFreelancers()).unwrap();
            console.log("Freelancer updated succesfully");
        } catch (e) {
            console.error("Failed to update freelancer: ", e);
        }
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteFreelancerThunk(id)).unwrap();
            dispatch(fetchFreelancers());
            console.log(
                "Freelancer deleted successfully, fetching updated freelancers."
            );
        } catch (error) {
            console.error("Failed to delete freelancer:", error);
        }
    };

    // Search
    const filteredFreelancers = freelancers.filter((freelancer) => {
        return freelancer.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
    });

    // Sort
    const sortedFreelancers = isSorted
        ? [...filteredFreelancers].sort((a, b) => b.rating - a.rating)
        : filteredFreelancers;

    const handleSortToggle = () => {
        setIsSorted((prev) => !prev);
    };

    return (
        <div className="container workers-container">
            <TextField
                label="Search freelancers"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ marginBottom: 2, width: "320px", alignSelf: "center" }}
            />
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
                color="primary"
                onClick={handleSortToggle}
                sx={{ alignSelf: "center", marginTop: 2 }}
            >
                {isSorted ? "Unsort by Rating" : "Sort by Rating"}
            </Button>

            <FilterDialog
                selectedValue={filter}
                open={openFilter}
                onClose={handleFilterClose}
                header="Choose freelancer's specialty"
                sliceToHandle="workers"
            />

            {loading ? (
                <h1>Freelancers are loading...</h1>
            ) : error ? (
                <h1>{error}</h1>
            ) : sortedFreelancers.length > 0 ? (
                <div className="workers">
                    {sortedFreelancers.map((freelancer) => (
                        <WorkerCard
                            key={freelancer.id}
                            name={freelancer.name}
                            surname={freelancer.surname}
                            spec={freelancer.spec}
                            header={freelancer.header}
                            rating={freelancer.rating}
                            id={freelancer.id}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <h1>No freelancers to display</h1>
            )}

            {/* {error ? <h1>{error}</h1> : <></>} */}
        </div>
    );
}

export default Workers;
