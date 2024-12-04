import React from "react";
import { addBid, addBidThunk } from "../../redux/bids/bidsSlice";
import Specs from "../../util/specs.json";
import { Add } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    TextField,
    MenuItem,
    Snackbar,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FreelancerBidAddDialog({ onAdd }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // Modal window for edit
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // validation
    const positiveIntegerRgx = /^[1-9]\d*$/;

    const [freelancerIdError, setFreelancerIdError] = useState("");
    const [bidIdError, setBidIdError] = useState("");
    const [deadlineError, setDeadlineError] = useState("");

    const handleFreelancerIdChange = (event) => {
        if (!positiveIntegerRgx.test(event.target.value)) {
            setFreelancerIdError(
                "Error: freelancer id must be a positive integer"
            );
            return;
        }

        setFreelancerIdError("");
    };

    const handleBidIdChange = (event) => {
        if (!positiveIntegerRgx.test(event.target.value)) {
            setBidIdError("Error: bid id must be a positive integer");
            return;
        }

        setBidIdError("");
    };

    const handleDeadlineChange = (event) => {
        const inputDate = new Date(event.target.value);
        const currentDate = new Date();

        const validDate = new Date(currentDate);
        validDate.setDate(currentDate.getDate() + 7);

        if (inputDate < validDate) {
            setDeadlineError(t("error-bid-deadline"));
            return;
        }

        setDeadlineError("");
    };

    return (
        <>
            <Button
                variant="contained"
                color="success"
                onClick={handleClickOpen}
            >
                {"Assign a bid"}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const bidObject = {
                            freelancerId: Number(formJson.freelancerid),
                            bidId: Number(formJson.bidid),
                            assigned: new Date().toISOString().slice(0, 10),
                            deadline: formJson.deadline,
                        };
                        if (
                            !Boolean(freelancerIdError) &&
                            !Boolean(bidIdError) &&
                            !Boolean(deadlineError)
                        ) {
                            console.log(bidObject);
                            onAdd(bidObject);
                            handleClose();
                        }
                    },
                }}
            >
                <DialogTitle>{"Assign a bid"}</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        id="bidid"
                        name="bidid"
                        label="Bid Id"
                        type="text"
                        fullWidth
                        margin="dense"
                        onChange={handleBidIdChange}
                        error={Boolean(bidIdError)}
                        helperText={bidIdError}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        required
                        id="freelancerid"
                        name="freelancerid"
                        label="Freelancer Id"
                        type="text"
                        fullWidth
                        margin="dense"
                        onChange={handleFreelancerIdChange}
                        error={Boolean(freelancerIdError)}
                        helperText={freelancerIdError}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        required
                        id="deadline"
                        name="deadline"
                        label={t("bid-deadline")}
                        type="date"
                        fullWidth
                        margin="dense"
                        onChange={handleDeadlineChange}
                        error={Boolean(deadlineError)}
                        helperText={deadlineError}
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained" color="secondary">
                        <Add />
                        {t("bid-add")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
