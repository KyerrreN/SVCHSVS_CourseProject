import React from "react";
import "./WorkerCard.css";
import {
    Button,
    Divider,
    Rating,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WebDevPic from "../../img/workerspec/webdev.png";
import { useDispatch } from "react-redux";
// import { deleteWorker } from "../../redux/workers/workersSlice";
import { useTranslation } from "react-i18next";
import WorkerCardEditDialog from "../WorkerCardEditDialog/WorkerCardEditDialog";
import { useState } from "react";

export default function WorkerCard({
    name,
    surname,
    spec,
    header,
    rating,
    piclink,
    id,
    onUpdate,
    onDelete,
}) {
    const { t } = useTranslation();
    // redux hooks
    const dispatch = useDispatch();

    // state for delete confirmation
    const [openDelete, setOpenDelete] = useState(false);

    const handleDeleteOpen = () => {
        setOpenDelete(true);
    };

    const handleDeleteClose = () => {
        setOpenDelete(false);
    };

    const handleDeleteConfirm = () => {
        onDelete(id);
        setOpenDelete(false);
    };

    return (
        <div className="workercard">
            <img
                src={`http://localhost:3001/${piclink}`}
                style={{ width: 160, height: 160, alignSelf: "center" }}
                alt="Worker"
            ></img>

            <div className="workercard-cred">
                <span>
                    {name} {surname}
                </span>
                <Divider />
                <span>{spec}</span>
                <span>{header}</span>
                <Divider />
                <span>{t("freelancers-worker-rating")}</span>
                <Rating
                    readOnly
                    defaultValue={rating}
                    precision={0.1}
                    sx={{ color: "black" }}
                />
                <Divider />
            </div>

            <div className="workercard-control">
                {/* <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteOpen}
                >
                    {t("freelancers-delete")}
                </Button>

                <Dialog
                    open={openDelete}
                    onClose={handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {`Delete freelancer ${id}?`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete a freelancer"{name}{" "}
                            {surname}"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose}>Disagree</Button>
                        <Button onClick={handleDeleteConfirm} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

                <WorkerCardEditDialog
                    name={name}
                    id={id}
                    surname={surname}
                    spec={spec}
                    rating={rating}
                    header={header}
                    onUpdate={onUpdate}
                /> */}
            </div>
        </div>
    );
}
