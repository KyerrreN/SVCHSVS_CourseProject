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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteBid } from "../../redux/bids/bidsSlice";

export default function BidOfferControl({ id, onRejectOffer }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // Modal window for edit
    const [open, setOpen] = React.useState(false);

    // state for delete confirmation
    const [openDelete, setOpenDelete] = useState(false);

    const handleDeleteOpen = () => {
        setOpenDelete(true);
    };

    const handleDeleteClose = () => {
        setOpenDelete(false);
    };

    // Edit modal window
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteConfirm = () => {
        onRejectOffer({ id });
        setOpen(false);
    };

    return (
        <>
            <div className="bid-control">
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteOpen}
                >
                    REJECT
                </Button>

                <Dialog
                    open={openDelete}
                    onClose={handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Delete offer {id}?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to reject an offer?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose}>Disagree</Button>
                        <Button onClick={handleDeleteConfirm} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
