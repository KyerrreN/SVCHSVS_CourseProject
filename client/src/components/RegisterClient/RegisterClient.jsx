import { Link } from "react-router-dom";
import { TextField, MenuItem, Button } from "@mui/material";
import "../LoginComponent/LoginComponent.css";
import Specs from "../../util/specs.json";
import { useState } from "react";

export default function RegisterClient() {
    // Validation states
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nameError, setNameError] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const regexOneEnglishWord = /^[a-zA-Z]*$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
        } else if (passwordValue.length < 8) {
            setPasswordError("Password must contain atleast 8 characters");
        } else {
            setPasswordError("");
        }
    };

    const handleNameChange = (e) => {
        const nameValue = e.target.value.trim();

        if (nameValue.length > 20) {
            setNameError("Name cannot exceed 20 characters");
            return;
        }

        if (!regexOneEnglishWord.test(nameValue)) {
            setNameError("Name can only be 1 english word");
            return;
        }

        setNameError("");
    };

    const handleSurnameChange = (e) => {
        const surnameValue = e.target.value.trim();

        if (surnameValue.length > 20) {
            setSurnameError("Surname cannot exceed 20 characters");
            return;
        }

        if (!regexOneEnglishWord.test(surnameValue)) {
            setSurnameError("Surname can only be 1 english word");
            return;
        }

        setSurnameError("");
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value.trim();

        if (emailValue.length > 80) {
            setEmailError("Email cannot exceed 80 characters");
            return;
        }

        if (!regexEmail.test(emailValue)) {
            setEmailError(
                "Doesn't match real email. Example: example@gmail.com"
            );
            return;
        }

        setEmailError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !Boolean(usernameError) &&
            !Boolean(passwordError) &&
            !Boolean(nameError) &&
            !Boolean(surnameError) &&
            !Boolean(emailError)
        ) {
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log({
                name: formJson.name,
                surname: formJson.surname,
                email: formJson.email,
                username: formJson.username,
                password: formJson.password,
            });
        }
    };
    return (
        <div className="container login-frame">
            <div>
                If you wish to register as a Freelancer,
                <Link to="/register/freelancer"> click here</Link>
            </div>
            <h1>Register as a Client</h1>

            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login information</h2>
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

                <h2>Credentials</h2>

                <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    margin="dense"
                    onChange={handleNameChange}
                    error={Boolean(nameError)}
                    helperText={nameError}
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    required
                    id="surname"
                    name="surname"
                    label="Surname"
                    type="text"
                    fullWidth
                    margin="dense"
                    onChange={handleSurnameChange}
                    error={Boolean(surnameError)}
                    helperText={surnameError}
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    required
                    id="email"
                    name="email"
                    label="E-mail"
                    type="text"
                    fullWidth
                    margin="dense"
                    onChange={handleEmailChange}
                    error={Boolean(emailError)}
                    helperText={emailError}
                    InputLabelProps={{ shrink: true }}
                />

                <Button type="submit" variant="contained" color="secondary">
                    Register
                </Button>
            </form>
        </div>
    );
}