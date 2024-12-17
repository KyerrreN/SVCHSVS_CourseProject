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
    DialogContentText,
} from "@mui/material";
import Specs from "../../util/specs.json";
import {
    deleteBidThunk,
    fetchBids,
    updateBid,
    updateBidThunk,
} from "../../redux/bids/bidsSlice";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { deleteBid } from "../../redux/bids/bidsSlice";

export default function BidEditDialog({ bidId, clientId, onOffer }) {
    // Modal window for edit
    const [open, setOpen] = React.useState(false);

    // validation
    const [messageError, setMessageError] = useState("");

    const handleMessageChange = (e) => {
        const data = e.target.value;

        if (e.target.value.trim().length < 5) {
            setMessageError("Message cannot be short");
            return;
        }

        if (data.length > 200) {
            setMessageError("Message cannot be longer than 200 characters");
            return;
        }

        setMessageError("");
    };
    // Edit modal window
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="bid-control">
                <Button
                    variant="outlined"
                    color="success"
                    startIcon={<AddIcon />}
                    // onClick={() => dispatch(deleteBid(id))}
                    onClick={handleClickOpen}
                >
                    Offer
                </Button>
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
                            const offerObject = {
                                freelancerId: sessionStorage.getItem("id"),
                                bidId: Number(bidId),
                                freelancerMessage: formJson.message,
                            };
                            if (!Boolean(messageError)) {
                                onOffer(offerObject);
                                handleClose();
                            }
                        },
                    }}
                >
                    <DialogTitle>Propose an offer</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            id="message"
                            name="message"
                            label="Freelancer Message"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            margin="dense"
                            onChange={handleMessageChange}
                            error={Boolean(messageError)}
                            helperText={messageError}
                            placeholder="Message should be clear and concise"
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: "320px" }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                        >
                            <AddIcon />
                            Post an offer
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
