import React from "react";
import "./WorkerCard.css";
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WebDevPic from "../../img/workerspec/webdev.png";
import { useDispatch, useSelector } from "react-redux";
import Specs from "../../util/specs.json";
import { useState } from "react";
import { deleteWorker, updateWorker } from "../../redux/workers/workersSlice";

export default function WorkerCard({
    name,
    surname,
    spec,
    header,
    rating,
    id,
}) {
    // Regex
    const regexOneEnglishWord = /^[a-zA-Z]*$/;

    // Modal window for edit
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // redux hooks
    const dispatch = useDispatch();
    const workers = useSelector((state) => state.workers.workers);

    // validation
    const [userNameError, setUserNameError] = useState("");
    const [userSurnameError, setUserSurnameError] = useState("");
    const [userHeaderError, setUserHeaderError] = useState("");

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

    return (
        <div className="workercard">
            <img
                src={WebDevPic}
                style={{ width: 160, height: 160, alignSelf: "center" }}
            ></img>

            <div className="workercard-cred">
                <span>
                    {name} {surname}
                </span>
                <Divider />
                <span>{spec}</span>
                <span>{header}</span>
                <Divider />
                <span>Worker Rating</span>
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
                        console.log("updated state: " + workers);
                    }}
                >
                    Delete worker
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<EditIcon />}
                    onClick={handleClickOpen}
                >
                    Edit worker
                </Button>
            </div>

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
                            id: id,
                            name: formJson.name,
                            surname: formJson.surname,
                            spec: formJson.spec,
                            header: formJson.header,
                            rating: rating,
                        };
                        if (
                            !Boolean(userNameError) &&
                            !Boolean(userSurnameError) &&
                            !Boolean(userHeaderError)
                        ) {
                            dispatch(updateWorker(workerObject));
                            console.log(workerObject);
                            handleClose();
                        }
                    },
                }}
            >
                <DialogTitle>
                    Edit worker "{name} {surname}"
                </DialogTitle>
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
                        defaultValue={name}
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
                        defaultValue={surname}
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
                        defaultValue={spec}
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
                        defaultValue={header}
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained" color="secondary">
                        <EditIcon />
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
