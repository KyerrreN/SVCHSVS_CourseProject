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

export default function FreelancerBidEditDialog({
    freelancerId,
    bidId,
    onDelete,
    onUpdate,
    desc,
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
        onDelete({ freelId: freelancerId, bidId });
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

    return (
        <>
            <div className="bid-controler">
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteOpen}
                >
                    Unassign
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<EditIcon />}
                    onClick={handleClickOpen}
                >
                    Update description
                </Button>
                <Dialog
                    open={openDelete}
                    onClose={handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Unassign bid ${bidId} from freelancer ${freelancerId}`}
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
            </div>
        </>
    );
}
