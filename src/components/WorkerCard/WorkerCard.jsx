import React from "react";
import "./WorkerCard.css";
import { Button, Divider, Rating } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WebDevPic from "../../img/workerspec/webdev.png";
import { useDispatch } from "react-redux";
import { deleteWorker } from "../../redux/workers/workersSlice";
import { useTranslation } from "react-i18next";
import WorkerCardEditDialog from "../WorkerCardEditDialog/WorkerCardEditDialog";

export default function WorkerCard({
    name,
    surname,
    spec,
    header,
    rating,
    id,
}) {
    const { t } = useTranslation();
    // redux hooks
    const dispatch = useDispatch();

    return (
        <div className="workercard">
            <img
                src={WebDevPic}
                style={{ width: 160, height: 160, alignSelf: "center" }}
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
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                        dispatch(deleteWorker(id));
                    }}
                >
                    {t("freelancers-delete")}
                </Button>

                <WorkerCardEditDialog
                    name={name}
                    id={id}
                    surname={surname}
                    spec={spec}
                    rating={rating}
                    header={header}
                />
                {/* <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<EditIcon />}
                    onClick={handleClickOpen}
                >
                    {t("freelancers-edit")}
                </Button> */}
            </div>

            {/* <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const workerObject = {
                            id: id,
                            name: formJson.name,
                            surname: formJson.surname,
                            spec: formJson.spec,
                            header: formJson.header,
                            rating: rating,
                        };
                        if (
                            !Boolean(userNameError) &&
                            !Boolean(userSurnameError) &&
                            !Boolean(userHeaderError)
                        ) {
                            dispatch(updateWorker(workerObject));
                            console.log(workerObject);
                            handleClose();
                        }
                    },
                }}
            >
                <DialogTitle>
                    {t("edit")} "{name} {surname}"
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        id="name"
                        name="name"
                        label={t("freelancers-edit-name")}
                        type="text"
                        fullWidth
                        margin="dense"
                        onChange={handleUserNameChange}
                        error={Boolean(userNameError)}
                        helperText={userNameError}
                        defaultValue={name}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        required
                        id="surname"
                        name="surname"
                        label={t("freelancers-edit-surname")}
                        type="text"
                        fullWidth
                        margin="dense"
                        onChange={handleUserSurnameChange}
                        error={Boolean(userSurnameError)}
                        helperText={userSurnameError}
                        defaultValue={surname}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        select
                        id="spec"
                        name="spec"
                        required
                        label={t("freelancers-edit-spec")}
                        fullWidth
                        margin="dense"
                        defaultValue={spec}
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
                        id="header"
                        name="header"
                        label={t("freelancers-edit-header")}
                        type="text"
                        fullWidth
                        margin="dense"
                        onChange={handleUserHeaderChange}
                        error={Boolean(userHeaderError)}
                        helperText={userHeaderError}
                        defaultValue={header}
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained" color="secondary">
                        <EditIcon />
                        {t("edit")}
                    </Button>
                </DialogActions>
            </Dialog> */}
        </div>
    );
}
