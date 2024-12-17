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

        if (data.length > 400) {
            setCompleteMessageError(
                "Complete message must be less than 400 characters."
            );
            return;
        }

        setCompleteMessageError("");
    };

    const handleCompleteRatingChange = (e) => {
        const data = Number(e.target.value);

        if (!Number.isInteger(data)) {
            setCompleteRatingError("Rating must be a number");
            return;
        }

        if (data < 1) {
            setCompleteRatingError("Rating cannot be less than 1");
            return;
        }

        if (data > 5) {
            setCompleteRatingError("Rating cannot be greater than 5");
            return;
        }

        setCompleteRatingError("");
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
                    open={openDelete}
                    onClose={handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    closeAfterTransition={false}
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Abort project ${bidId} from freelancer ${freelancerId}`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose}>Disagree</Button>
                        <Button onClick={handleDeleteConfirm} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

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
                                clientMessage: formJson.desc,
                                status: "In Progress",
                            };
                            if (!Boolean(descError)) {
                                onUpdate({
                                    bidId: bidId,
                                    bidObject: bidObject,
                                });
                                handleClose();
                            }
                        },
                    }}
                >
                    <DialogTitle>{"Edit deadline"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            id="desc"
                            name="desc"
                            label="Updated description"
                            type="text"
                            fullWidth
                            multiline
                            rows={6}
                            margin="dense"
                            onChange={handleDescChange}
                            error={Boolean(descError)}
                            helperText={descError}
                            defaultValue={desc}
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: 320 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                        >
                            <EditIcon />
                            Edit deadline
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openDelete}
                    onClose={handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    closeAfterTransition={false}
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Abort project ${bidId} from freelancer ${freelancerId}`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose}>Disagree</Button>
                        <Button onClick={handleDeleteConfirm} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

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
                                clientMessage: formJson.message,
                                status: "Done",
                                rating: Number(formJson.rating),
                            };
                            if (
                                !Boolean(completeMessageError) &&
                                !Boolean(completeRatingError)
                            ) {
                                onComplete({
                                    bidId: bidId,
                                    bidObject: bidObject,
                                });
                                handleClose();
                            }
                        },
                    }}
                >
                    <DialogTitle>Complete a project</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            id="message"
                            name="message"
                            label="Message upon completion"
                            type="text"
                            fullWidth
                            multiline
                            rows={6}
                            margin="dense"
                            onChange={handleCompleteMessageChange}
                            error={Boolean(completeMessageError)}
                            helperText={completeMessageError}
                            defaultValue={desc}
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: 320 }}
                        />
                        <TextField
                            required
                            id="rating"
                            name="rating"
                            label="Rating"
                            type="text"
                            fullWidth
                            margin="dense"
                            onChange={handleCompleteRatingChange}
                            error={Boolean(completeRatingError)}
                            helperText={completeRatingError}
                            defaultValue={5}
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: 320 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                        >
                            Set completed
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
