import React from "react";
import "./BidsComponent.css";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    TextField,
    MenuItem,
} from "@mui/material";
import Bid from "../Bid/Bid";
import { useSelector, useDispatch } from "react-redux";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { addBid } from "../../redux/bids/bidsSlice";
import Specs from "../../util/specs.json";

function BidsComponent(props) {
    const bids = useSelector((state) => state.bids.bids);

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
    const regexPayment = /^(100000|[1-9][0-9]{0,4})$/;

    const [nameError, setNameError] = useState("");
    const [descError, setDescError] = useState("");
    const [paymentError, setPaymentError] = useState("");
    const [deadlineError, setDeadlineError] = useState("");

    const handleNameChange = (event) => {
        if (event.target.value.length > 60) {
            setNameError("Project name cannot exceed 60 characters");
            return;
        }

        setNameError("");
    };

    const handleDescChange = (event) => {
        if (event.target.value.length > 400) {
            setDescError("Project description cannot exceed 400 characters");
            return;
        }

        setDescError("");
    };

    const handlePaymentChange = (event) => {
        if (!regexPayment.test(event.target.value)) {
            setPaymentError(
                "Payment for this project can only be integer number ranging from 1 to 100.000"
            );
            return;
        }

        setPaymentError("");
    };

    const handleDeadlineChange = (event) => {
        const inputDate = new Date(event.target.value);
        const currentDate = new Date();

        const validDate = new Date(currentDate);
        validDate.setDate(currentDate.getDate() + 7);

        if (inputDate < validDate) {
            setDeadlineError(
                "Deadline can only be set to one week from now and later"
            );
            return;
        }

        setDeadlineError("");
    };

    return (
        <div className="container bids-container">
            <Button
                variant="contained"
                color="success"
                onClick={handleClickOpen}
            >
                Add bid
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
                            id: bids.length + 1,
                            name: formJson.name,
                            desc: formJson.desc,
                            needed: formJson.needed,
                            payment: formJson.payment,
                            deadline: formJson.deadline,
                        };
                        console.log(formJson);
                        if (
                            !Boolean(nameError) &&
                            !Boolean(descError) &&
                            !Boolean(paymentError) &&
                            !Boolean(deadlineError)
                        ) {
                            dispatch(addBid(bidObject));
                            handleClose();
                        }
                    },
                }}
            >
                <DialogTitle>Edit bid</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        id="name"
                        name="name"
                        label="Project name"
                        type="text"
                        fullWidth
                        margin="dense"
                        onChange={handleNameChange}
                        error={Boolean(nameError)}
                        helperText={nameError}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        required
                        id="desc"
                        name="desc"
                        label="Project description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        margin="dense"
                        onChange={handleDescChange}
                        error={Boolean(descError)}
                        helperText={descError}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        select
                        id="needed"
                        name="needed"
                        required
                        label="Who is needed for this project?"
                        fullWidth
                        margin="dense"
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
                        id="payment"
                        name="payment"
                        label="Payment"
                        type="text"
                        fullWidth
                        margin="dense"
                        onChange={handlePaymentChange}
                        error={Boolean(paymentError)}
                        helperText={paymentError}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        required
                        id="deadline"
                        name="deadline"
                        label="Deadline"
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
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {bids.map((bid) => {
                console.log("iteration");

                return (
                    <Bid
                        key={bid.id}
                        name={bid.name}
                        desc={bid.desc}
                        needed={bid.needed}
                        payment={bid.payment}
                        deadline={bid.deadline}
                        id={bid.id}
                    />
                );
            })}
        </div>
    );
}

export default BidsComponent;
