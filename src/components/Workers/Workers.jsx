import { Component, useState } from "react";
import "./Workers.css";
import WorkerCard from "../WorkerCard/WorkerCard";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    MenuItem,
    Rating,
    TextField,
} from "@mui/material";
import React from "react";
import Specs from "../../util/specs.json";
import { Add } from "@mui/icons-material";
import { addWorker } from "../../redux/workers/workersSlice";
import FilterDialog from "../FilterDialog/FilterDialog";
import { useTranslation } from "react-i18next";

function Workers(props) {
    // Redux selectors + dispatch
    const workers = useSelector((state) => state.workers.workers);
    const dispatch = useDispatch();
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

    // Regex
    const regexOneEnglishWord = /^[a-zA-Z]*$/;
    const regexDecimalNumber = /^\d\.\d$/;

    // Modal window for edit
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //validation
    const [userNameError, setUserNameError] = useState("");
    const [userSurnameError, setUserSurnameError] = useState("");
    const [userHeaderError, setUserHeaderError] = useState("");
    const [userRatingError, setUserRatingError] = useState("");

    const handleUserNameChange = (event) => {
        if (event.target.value.length > 20) {
            setUserNameError(t("error-freelancer-name-char"));
        } else if (!regexOneEnglishWord.test(event.target.value)) {
            setUserNameError(t("error-freelancer-name-word"));
        } else {
            setUserNameError("");
        }
    };

    const handleUserSurnameChange = (event) => {
        if (event.target.value.length > 20) {
            setUserSurnameError(t("error-freelancer-surname-char"));
        } else if (!regexOneEnglishWord.test(event.target.value)) {
            setUserSurnameError(t("error-freelancer-surname-word"));
        } else {
            setUserSurnameError("");
        }
    };

    const handleUserHeaderChange = (event) => {
        if (event.target.value.length > 80) {
            setUserHeaderError(t("error-freelancer-header"));
        } else {
            setUserHeaderError("");
        }
    };

    const handleUserRatingChange = (event) => {
        const ratingValue = event.target.value;

        if (!regexDecimalNumber.test(ratingValue)) {
            setUserRatingError(t("error-freelancer-rating"));
        } else if (+ratingValue > 5 || +ratingValue <= 0) {
            setUserRatingError("Rating must be in range [0.0-5.0]");
        } else {
            setUserRatingError("");
        }
    };

    return (
        <div className="container workers-container">
            <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                sx={{ alignSelf: "center" }}
                onClick={handleClickOpen}
            >
                {t("freelancers-add")}
            </Button>

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
                        {(sortedWorkers.length > 0
                            ? sortedWorkers
                            : filteredWorkers
                        ).map((worker) => (
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

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const workerObject = {
                            id: workers.length + 1,
                            name: formJson.name,
                            surname: formJson.surname,
                            spec: formJson.spec,
                            header: formJson.header,
                            rating: parseFloat(formJson.rating),
                        };
                        if (
                            !Boolean(userNameError) &&
                            !Boolean(userSurnameError) &&
                            !Boolean(userHeaderError) &&
                            !Boolean(userRatingError)
                        ) {
                            dispatch(addWorker(workerObject));
                            console.log(workerObject);
                            console.log(workers);
                            handleClose();
                        }
                    },
                }}
            >
                <DialogTitle>{t("bid-add")}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        id="name"
                        name="name"
                        label={t("freelancers-edit-name")}
                        type="text"
                        fullWidth
                        margin="dense"
                        onChange={handleUserNameChange}
                        error={Boolean(userNameError)}
                        helperText={userNameError}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        required
                        id="surname"
                        name="surname"
                        label={t("freelancers-edit-surname")}
                        type="text"
                        fullWidth
                        margin="dense"
                        onChange={handleUserSurnameChange}
                        error={Boolean(userSurnameError)}
                        helperText={userSurnameError}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        select
                        id="spec"
                        name="spec"
                        required
                        label={t("freelancers-edit-spec")}
                        fullWidth
                        margin="dense"
                        defaultValue="Web Developer"
                        InputLabelProps={{ shrink: true }}
                    >
                        {Specs.map((spec) => (
                            <MenuItem key={spec} value={spec}>
                                {spec}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        required
                        id="header"
                        name="header"
                        label={t("freelancers-edit-header")}
                        type="text"
                        fullWidth
                        margin="dense"
                        onChange={handleUserHeaderChange}
                        error={Boolean(userHeaderError)}
                        helperText={userHeaderError}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        required
                        id="rating"
                        name="rating"
                        label={t("freelancers-worker-rating")}
                        type="text"
                        fullWidth
                        margin="dense"
                        onChange={handleUserRatingChange}
                        error={Boolean(userRatingError)}
                        helperText={userRatingError}
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained" color="success">
                        <Add /> {t("freelancers-add")}
                    </Button>
                </DialogActions>
            </Dialog>

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
