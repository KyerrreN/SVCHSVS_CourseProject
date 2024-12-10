import { Button, TextField } from "@mui/material";
import "./LoginComponent.css";
import { useState } from "react";

export default function LoginComponent() {
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleUsernameChange = (e) => {
        const usernameValue = e.target.value.trim();

        if (usernameValue.length < 8) {
            setUsernameError("Username must containt atleast 8 characters");
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!Boolean(usernameError) && !Boolean(passwordError)) {
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson.username);
            console.log(formJson.password);
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
        </div>
    );
}
