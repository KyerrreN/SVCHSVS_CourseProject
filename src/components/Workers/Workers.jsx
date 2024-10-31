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

function Workers(props) {
    const workers = useSelector((state) => state.workers.workers);
    const dispatch = useDispatch();

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
            setUserNameError("Name cannot exceed 20 characters");
        } else if (!regexOneEnglishWord.test(event.target.value)) {
            setUserNameError("Name must be singular english word");
        } else {
            setUserNameError("");
        }
    };

    const handleUserSurnameChange = (event) => {
        if (event.target.value.length > 20) {
            setUserSurnameError("Surname cannot exceed 20 characters");
        } else if (!regexOneEnglishWord.test(event.target.value)) {
            setUserSurnameError("Surname must be singular english word");
        } else {
            setUserSurnameError("");
        }
    };

    const handleUserHeaderChange = (event) => {
        if (event.target.value.length > 80) {
            setUserHeaderError("Header cannot exceed 80 characters");
        } else {
            setUserHeaderError("");
        }
    };

    const handleUserRatingChange = (event) => {
        const ratingValue = event.target.value;

        if (!regexDecimalNumber.test(ratingValue)) {
            setUserRatingError(
                "Rating can only be expressed as a positive decimal number"
            );
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
                <DialogTitle>Add new worker</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        id="name"
                        name="name"
                        label="Name"
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
                        label="Surname"
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
                        label="Specialization"
                        fullWidth
                        margin="dense"
                        defaultValue="Web Development"
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
                        label="Header"
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
                        label="Rating"
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
                        <Add /> Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Workers;
