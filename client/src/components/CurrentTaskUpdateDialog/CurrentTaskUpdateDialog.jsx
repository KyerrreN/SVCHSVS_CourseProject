import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
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

export default function CurrentTaskUpdateDialog({
    freelancerId,
    bidId,
    onDelete,
    onUpdate,
    desc,
    status,
    onComplete,
}) {
    // state for delete confirmation
    const [openDelete, setOpenDelete] = useState(false);
    // Modal window for edit
    const [open, setOpen] = React.useState(false);

    const handleDeleteOpen = () => {
        setOpenDelete(true);
    };

    const handleDeleteClose = () => {
        setOpenDelete(false);
    };

    const handleDeleteConfirm = () => {
        onDelete({
            bidId,
            bidObject: {
                status: "Done",
                clientMessage:
                    desc || "Project was aborted due to client's decision",
                rating: 1,
            },
        });
        setOpenDelete(false);
    };

    // Edit modal window
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [descError, setDescError] = useState("");
    const handleDescChange = (event) => {
        const data = event.target.value;

        if (data.trim().length < 5) {
            setDescError("Updated description cannot be short.");
            return;
        }

        if (data.length > 400) {
            setDescError(
                "Error: updated description must be less than 400 characters."
            );
            return;
        }

        setDescError("");
    };

    // Complete project
    const [completeOpen, setCompleteOpen] = useState(false);
    const [completeRatingError, setCompleteRatingError] = useState("");
    const [completeMessageError, setCompleteMessageError] = useState("");

    const handleCompleteOpen = () => {
        setCompleteOpen(true);
    };

    const handleCompleteClose = () => {
        setCompleteOpen(false);
    };

    const handleCompleteMessageChange = (e) => {
        const data = e.target.value;

        if (data.trim().length < 5) {
            setCompleteMessageError("Complete message cannot be short.");
            return;
        }

        if (data.length > 200) {
            setCompleteMessageError(
                "Complete message must be less than 400 characters."
            );
            return;
        }

        setCompleteMessageError("");
    };

    return (
        <>
            <div className="bid-controler">
                {status !== "Pending Review" ? (
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ margin: 1 }}
                        onClick={handleCompleteOpen}
                    >
                        Complete a project
                    </Button>
                ) : (
                    <></>
                )}

                <Dialog
                    open={completeOpen}
                    onClose={handleCompleteClose}
                    PaperProps={{
                        component: "form",
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(
                                formData.entries()
                            );
                            const bidObject = {
                                freelancerMessage: formJson.message,
                            };
                            if (!Boolean(completeMessageError)) {
                                onComplete({
                                    bidId: bidId,
                                    freelancerId: Number(
                                        sessionStorage.getItem("id")
                                    ),
                                    bidObject: bidObject,
                                });
                                handleClose();
                            }
                        },
                    }}
                >
                    <DialogTitle>Send a message to a client</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            id="message"
                            name="message"
                            label="Message to a client"
                            type="text"
                            fullWidth
                            multiline
                            rows={6}
                            margin="dense"
                            onChange={handleCompleteMessageChange}
                            error={Boolean(completeMessageError)}
                            helperText={completeMessageError}
                            InputLabelProps={{ shrink: true }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                        >
                            Send for review
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
