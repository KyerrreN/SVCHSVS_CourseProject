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
import { useState, useEffect } from "react";
import { addBid } from "../../redux/bids/bidsSlice";
import Specs from "../../util/specs.json";
import FilterDialog from "../FilterDialog/FilterDialog";
import { useTranslation } from "react-i18next";

function BidsComponent() {
    const { t } = useTranslation();
    // Sort states
    const [sortOrder, setSortOrder] = useState("asc"); // State for sorting

    // Dialog for filter
    const [openFilter, setOpenFilter] = React.useState(false);

    const handleFilterOpen = () => {
        setOpenFilter(true);
    };

    const handleFilterClose = () => {
        setOpenFilter(false);
    };

    // redux
    const bids = useSelector((state) => state.bids.bids);
    const filter = useSelector((state) => state.bids.filter);

    const filteredBids =
        filter === ""
            ? [...bids]
            : [...bids.filter((bid) => bid.needed === filter)];

    const dispatch = useDispatch();

    const sortedBids = [...filteredBids].sort((a, b) => {
        return sortOrder === "asc"
            ? a.payment - b.payment
            : b.payment - a.payment;
    });

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
        <div className="container bids-container">
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

            <FilterDialog
                selectedValue=""
                open={openFilter}
                onClose={handleFilterClose}
                header="Choose needed specialty"
                sliceToHandle="bids"
            />

            {bids.length > 0 ? (
                <>
                    <Button
                        variant="contained"
                        color="white"
                        onClick={handleFilterOpen}
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
                    >
                        {t("bid-sort")}
                    </Button>

                    {(sortedBids.length > 0 ? sortedBids : filteredBids).map(
                        (bid) => {
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
                        }
                    )}
                </>
            ) : (
                <h1 style={{ textAlign: "center" }}>There are no bids</h1>
            )}
        </div>
    );
}

export default BidsComponent;
