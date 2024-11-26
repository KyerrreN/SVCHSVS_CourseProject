import React from "react";
import { addBid } from "../../redux/bids/bidsSlice";
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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BidsComponentDialog() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const bids = useSelector((state) => state.bids.bids);

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
            setNameError(t("error-bid-name"));
            return;
        }

        setNameError("");
    };

    const handleDescChange = (event) => {
        if (event.target.value.length > 400) {
            setDescError(t("error-bid-desc"));
            return;
        }

        setDescError("");
    };

    const handlePaymentChange = (event) => {
        if (!regexPayment.test(event.target.value)) {
            setPaymentError(t("error-bid-payment"));
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
                {t("bid-add")}
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
                            id: bids.length + 2,
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
                <DialogTitle>{t("bid-add")}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        id="name"
                        name="name"
                        label={t("bid-name")}
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
                        label={t("bid-desc")}
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
                        label={t("bid-needed")}
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
                        id="payment"
                        name="payment"
                        label={t("bid-payment")}
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