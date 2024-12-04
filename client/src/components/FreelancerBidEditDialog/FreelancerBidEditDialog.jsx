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
    deadline,
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

    const [deadlineError, setDeadlineError] = useState("");
    const handleDeadlineChange = (event) => {
        const inputDate = new Date(event.target.value);
        const currentDate = new Date();

        const validDate = new Date(currentDate);
        validDate.setDate(currentDate.getDate() + 7);

        if (inputDate < validDate) {
            setDeadlineError(
                "Error: deadline must be atleast 1 week from current date"
            );
            return;
        }

        setDeadlineError("");
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
                    Edit deadline
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
                                deadline: formJson.deadline,
                            };
                            if (!Boolean(deadlineError)) {
                                onUpdate({
                                    freelId: freelancerId,
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
                            id="deadline"
                            name="deadline"
                            label="Deadline"
                            type="date"
                            fullWidth
                            margin="dense"
                            onChange={handleDeadlineChange}
                            error={Boolean(deadlineError)}
                            helperText={deadlineError}
                            defaultValue={deadline}
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
