import React from "react";
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
import Specs from "../../util/specs.json";
import { updateBid } from "../../redux/bids/bidsSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteBid } from "../../redux/bids/bidsSlice";

export default function BidEditDialog({
    id,
    name,
    desc,
    needed,
    payment,
    deadline,
}) {
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
            <div className="bid-control">
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => dispatch(deleteBid(id))}
                >
                    {t("bid-delete")}
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<EditIcon />}
                    onClick={handleClickOpen}
                >
                    {t("bid-edit")}
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
                        const formJson = Object.fromEntries(formData.entries());
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
                <DialogTitle>{t("bid-edit")}</DialogTitle>
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
                        defaultValue={name}
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
                        defaultValue={desc}
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
                        label={t("bid-payment")}
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
                        label={t("bid-deadline")}
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
                    <Button type="submit" variant="contained" color="secondary">
                        <EditIcon />
                        {t("edit")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
