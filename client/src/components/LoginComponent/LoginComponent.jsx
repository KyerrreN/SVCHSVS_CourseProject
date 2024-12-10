import {
    Button,
    responsiveFontSizes,
    TextField,
    useStepContext,
} from "@mui/material";
import "./LoginComponent.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";

export default function LoginComponent() {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_URL;
    const [reqError, setReqError] = useState("");
    const { login } = useAuth();

    // validation
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleUsernameChange = (e) => {
        const usernameValue = e.target.value.trim();

        if (usernameValue.length < 8) {
            setUsernameError("Username must contain atleast 8 characters");
        } else {
            setUsernameError("");
        }
    };

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value.trim();

        if (!passwordValue) {
            setPasswordError("Password is required");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Boolean(usernameError) && !Boolean(passwordError)) {
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            try {
                const response = await axios.post(`${apiUrl}/auth/login`, {
                    username: formJson.username,
                    password: formJson.password,
                });

                setReqError("");

                login(
                    response.data.role,
                    response.data.token,
                    response.data.name,
                    response.data.surname,
                    response.data.id
                );

                return navigate("/");
            } catch (e) {
                setReqError(e.response?.data?.message);
                console.log(e.response?.data?.message);
            }
        }
    };

    return (
        <div className="container login-frame">
            <h1>Welcome</h1>

            <form className="login-form" onSubmit={handleSubmit}>
                <TextField
                    required
                    id="username"
                    name="username"
                    label="Username"
                    type="text"
                    fullWidth
                    margin="dense"
                    onChange={handleUsernameChange}
                    error={Boolean(usernameError)}
                    helperText={usernameError}
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    required
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    margin="dense"
                    onChange={handlePasswordChange}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
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
