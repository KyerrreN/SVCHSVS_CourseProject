import "../LoginComponent/LoginComponent.css";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChangePassword() {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_URL;
    const [reqError, setReqError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        try {
            console.log({
                id: Number(sessionStorage.getItem("id")),
                oldPassword: formJson.oldPassword,
                newPassword: formJson.newPassword,
            });

            const response = await axios.put(
                `${apiUrl}/auth/changepassword`,
                {
                    id: sessionStorage.getItem("userId"),
                    oldPassword: formJson.oldPassword,
                    newPassword: formJson.newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            console.log(response.status);

            setReqError("");

            return navigate("/");
        } catch (e) {
            setReqError(e.response?.data?.message);
            console.log(e.response?.data?.message);
        }
    };

    return (
        <div className="container login-frame">
            <h1>Change your password</h1>

            <form className="login-form" onSubmit={handleSubmit}>
                <TextField
                    required
                    id="oldPassword"
                    name="oldPassword"
                    label="Old Password"
                    type="password"
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    required
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                />

                <Button type="submit" variant="contained" color="secondary">
                    Login
                </Button>
            </form>

            {Boolean(reqError) ? (
                <h2 style={{ color: "red" }}>{reqError}</h2>
            ) : (
                <></>
            )}
        </div>
    );
}
