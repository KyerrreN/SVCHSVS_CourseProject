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
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ClientBidEditDialog({
    bidId,
    clientId,
    name,
    onDelete,
}) {
    const { t } = useTranslation();

    // state for delete confirmation
    const [openDelete, setOpenDelete] = useState(false);

    const handleDeleteOpen = () => {
        setOpenDelete(true);
    };

    const handleDeleteClose = () => {
        setOpenDelete(false);
    };

    const handleDeleteConfirm = () => {
        onDelete({ bidId, clientId });
        setOpenDelete(false);
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
                    {t("bid-delete")}
                </Button>
                <Dialog
                    open={openDelete}
                    onClose={handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Delete bid ${bidId}?`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete a bid "{name}"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose}>Disagree</Button>
                        <Button onClick={handleDeleteConfirm} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>{" "}
            </div>{" "}
        </>
    );
}
