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
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BidsComponentDialog({ onAdd }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // Modal window for edit
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAlertOpen = () => {
        setOpenAlert(true);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    // validation
    const regexPayment = /^(100000|[1-9][0-9]{0,4})$/;

    const [nameError, setNameError] = useState("");
    const [descError, setDescError] = useState("");
    const [paymentError, setPaymentError] = useState("");

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
                            name: formJson.name,
                            desc: formJson.desc,
                            spec: formJson.needed,
                            payment: Number(formJson.payment),
                        };

                        if (
                            !Boolean(nameError) &&
                            !Boolean(descError) &&
                            !Boolean(paymentError)
                        ) {
                            onAdd({ bidObject });
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
