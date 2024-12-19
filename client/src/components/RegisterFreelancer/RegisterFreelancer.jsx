import { TextField, MenuItem, Button } from "@mui/material";
import "../LoginComponent/LoginComponent.css";
import Specs from "../../util/specs.json";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterFreelancer() {
    const navigate = useNavigate();
    const [requestError, setRequestError] = useState("");
    const apiUrl = process.env.REACT_APP_URL;
    // Validation states
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nameError, setNameError] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [headerError, setHeaderError] = useState("");
    const regexOneEnglishWord = /^[a-zA-Z]*$/;

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

    const handleHeaderChange = (e) => {
        const headerValue = e.target.value.trim();

        if (headerValue.length > 80) {
            setHeaderError("Header cannot exceed 80 characters");
            return;
        } else {
            setHeaderError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !Boolean(usernameError) &&
            !Boolean(passwordError) &&
            !Boolean(nameError) &&
            !Boolean(surnameError) &&
            !Boolean(headerError)
        ) {
            const formData = new FormData(e.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log({
                name: formJson.name,
                surname: formJson.surname,
                spec: formJson.spec,
                header: formJson.header,
                username: formJson.username,
                password: formJson.password,
                rating: 0,
            });

            try {
                const response = await axios.post(
                    `${apiUrl}/auth/register/freelancer`,
                    {
                        name: formJson.name,
                        surname: formJson.surname,
                        spec: formJson.spec,
                        header: formJson.header,
                        username: formJson.username,
                        password: formJson.password,
                    }
                );
                console.log(response);

                setRequestError("");
                return navigate("/");
            } catch (e) {
                setRequestError(`Error: ${e.response?.data?.message}`);
                console.log(e.response?.data?.message);
            }
        }
    };
    return (
        <div className="container login-frame">
            <div>
                If you wish to register as a Client,
                <Link to="/register/client"> click here</Link>
            </div>

            <h1>Register as Freelancer</h1>

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
                    select
                    id="spec"
                    name="spec"
                    required
                    label="Specialty"
                    fullWidth
                    margin="dense"
                    defaultValue={Specs[0]}
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
                    label="Your header"
                    type="text"
                    fullWidth
                    margin="dense"
                    onChange={handleHeaderChange}
                    error={Boolean(headerError)}
                    helperText={headerError}
                    InputLabelProps={{ shrink: true }}
                    placeholder="I do Web Development"
                />

                <Button type="submit" variant="contained" color="secondary">
                    Register
                </Button>
            </form>

            {Boolean(requestError) ? (
                <h1 style={{ color: "red" }}>{requestError}</h1>
            ) : (
                <></>
            )}
        </div>
    );
}
