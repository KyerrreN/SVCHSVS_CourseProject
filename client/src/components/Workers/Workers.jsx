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
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Logo from "../../img/logo/logo-no-background.png";

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

    // REPORT
    const API_URL = `${process.env.REACT_APP_URL}/freelancers/sort?order=DESC`;
    const HEADERS = {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    };

    const generateFreelancerReport = async () => {
        try {
            const response = await axios.get(API_URL, HEADERS);
            const freelancers = response.data.message;

            const doc = new jsPDF();

            doc.setFontSize(24);
            doc.text(
                "Freelancers on our platform",
                doc.internal.pageSize.getWidth() / 2,
                60,
                { align: "center" }
            );

            const logoWidth = 120;
            const logoHeight = 60;
            doc.addImage(
                Logo,
                "PNG",
                (doc.internal.pageSize.getWidth() - logoWidth) / 2,
                100,
                logoWidth,
                logoHeight
            );

            const date = new Date().toLocaleDateString();
            doc.setFontSize(12);
            doc.text(
                `Report Date: ${date}`,
                doc.internal.pageSize.getWidth() / 2,
                doc.internal.pageSize.getHeight() - 30,
                { align: "center" }
            );

            doc.addPage();
            doc.setFontSize(16);
            doc.text(
                "Freelancer List",
                doc.internal.pageSize.getWidth() / 2.5,
                20
            );

            const lineY = 25;
            doc.setLineWidth(0.5);
            doc.line(10, lineY, doc.internal.pageSize.getWidth() - 10, lineY);

            const columns = [
                { header: "Name", dataKey: "name" },
                { header: "Surname", dataKey: "surname" },
                { header: "Specialty", dataKey: "specName" },
                { header: "Rating", dataKey: "rating" },
            ];

            const data = freelancers.map((freelancer) => ({
                name: freelancer.name,
                surname: freelancer.surname,
                specName: freelancer.Spec.name,
                rating: freelancer.rating,
            }));

            autoTable(doc, {
                columns: columns,
                body: data,
                startY: 30,
            });

            doc.save("freelancers_report.pdf");
        } catch (error) {
            console.error("Error fetching freelancers data: ", error);
        }
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
                <>
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
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={generateFreelancerReport}
                    >
                        Download info
                    </Button>
                </>
            ) : (
                <h1>No freelancers to display</h1>
            )}
        </div>
    );
}

export default Workers;
