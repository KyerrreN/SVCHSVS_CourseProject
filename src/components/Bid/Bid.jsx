import React from "react";
import "./Bid.css";
import GavelIcon from "@mui/icons-material/Gavel";
import BidInfo from "../BidInfo/BidInfo";
import {
    Button,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteBid, updateBid } from "../../redux/bids/bidsSlice";
import Specs from "../../util/specs.json";
import { useState } from "react";

export default function Bid({ name, desc, needed, payment, deadline, id }) {
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
        <>
            <div className="bid-container">
                <div className="bid">
                    <div className="bid-header">
                        <GavelIcon sx={{ width: 120, height: 120 }} />

                        <span>{name}</span>
                    </div>

                    <div className="bid-desc">
                        <BidInfo header="Project Description" content={desc} />
                        <BidInfo header="Who do we need?" content={needed} />
                        <BidInfo header="Payment" content={payment} />
                        <BidInfo header="Deadline" content={deadline} />
                    </div>
                </div>

                <div className="bid-control">
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => dispatch(deleteBid(id))}
                    >
                        Delete bid
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<EditIcon />}
                        onClick={handleClickOpen}
                    >
                        Edit bid
                    </Button>
                </div>

                <Divider sx={{ paddingTop: 2 }} />

                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: "form",
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(
                                formData.entries()
                            );
                            const bidObject = {
                                id: id,
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
                                dispatch(updateBid(bidObject));
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
                            defaultValue={name}
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
                            defaultValue={desc}
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
                            defaultValue={needed}
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
                            defaultValue={payment}
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
                            defaultValue={deadline}
                            InputLabelProps={{ shrink: true }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                        >
                            <EditIcon />
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
