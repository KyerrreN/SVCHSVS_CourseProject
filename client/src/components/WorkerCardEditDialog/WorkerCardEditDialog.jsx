import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Specs from "../../util/specs.json";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function WorkerCardEditDialog({
    id,
    name,
    surname,
    spec,
    header,
    rating,
    onUpdate,
}) {
    // Regex
    const regexOneEnglishWord = /^[a-zA-Z]*$/;
    const { t } = useTranslation();

    // Modal window for edit
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // validation
    const [userNameError, setUserNameError] = useState("");
    const [userSurnameError, setUserSurnameError] = useState("");
    const [userHeaderError, setUserHeaderError] = useState("");

    const handleUserNameChange = (event) => {
        if (event.target.value.length > 20) {
            setUserNameError(t("error-freelancer-name-char"));
        } else if (!regexOneEnglishWord.test(event.target.value)) {
            setUserNameError(t("error-freelancer-name-word"));
        } else {
            setUserNameError("");
        }
    };

    const handleUserSurnameChange = (event) => {
        if (event.target.value.length > 20) {
            setUserSurnameError(t("error-freelancer-surname-char"));
        } else if (!regexOneEnglishWord.test(event.target.value)) {
            setUserSurnameError(t("error-freelancer-surname-word"));
        } else {
            setUserSurnameError("");
        }
    };

    const handleUserHeaderChange = (event) => {
        if (event.target.value.length > 80) {
            setUserHeaderError(t("error-freelancer-header"));
        } else {
            setUserHeaderError("");
        }
    };

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
            >
                {t("freelancers-edit")}
            </Button>

            <Dialog
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
                            onUpdate({ id, freelancerObject: workerObject });
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
            </Dialog>
        </>
    );
}
