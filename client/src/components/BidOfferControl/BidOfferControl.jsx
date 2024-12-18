import React from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BidOfferControl({ id, onRejectOffer, onAccept }) {
    // state for delete confirmation
    const [openDelete, setOpenDelete] = useState(false);
    const [openAccept, setOpenAccept] = useState(false);

    const handleDeleteOpen = () => {
        setOpenDelete(true);
    };

    const handleDeleteClose = () => {
        setOpenDelete(false);
    };

    const handleAcceptOpen = () => {
        setOpenAccept(true);
    };

    const handleAcceptClose = () => {
        setOpenAccept(false);
    };

    const handleDeleteConfirm = () => {
        onRejectOffer({ id });
        setOpenDelete(false);
    };

    const hanldeAcceptConfirm = () => {
        onAccept({ id });
        setOpenAccept(false);
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
                <Button
                    variant="outlined"
                    color="success"
                    startIcon={<DeleteIcon />}
                    onClick={handleAcceptOpen}
                >
                    ACCEPT
                </Button>

                <Dialog
                    open={openAccept}
                    onClose={handleAcceptClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Accept offer {id}?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to accept an offer?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleAcceptClose}>Disagree</Button>
                        <Button onClick={hanldeAcceptConfirm} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

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
