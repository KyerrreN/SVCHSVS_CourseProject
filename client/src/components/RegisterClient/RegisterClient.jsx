import { Link, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "../LoginComponent/LoginComponent.css";
import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function RegisterClient() {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_URL;
    const [requestError, setRequestError] = useState("");

    // Validation Schema
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(8, "Username must contain at least 8 characters")
            .matches(
                /^[a-zA-Z0-9]+$/,
                "Username can only be 1 English word with digits"
            )
            .required("Username is required"),
        password: Yup.string()
            .min(8, "Password must contain at least 8 characters")
            .required("Password is required"),
        name: Yup.string()
            .max(20, "Name cannot exceed 20 characters")
            .matches(/^[a-zA-Z]*$/, "Name can only be 1 English word")
            .required("Name is required"),
        surname: Yup.string()
            .max(20, "Surname cannot exceed 20 characters")
            .matches(/^[a-zA-Z]*$/, "Surname can only be 1 English word")
            .required("Surname is required"),
        email: Yup.string()
            .email("Invalid email format")
            .max(80, "Email cannot exceed 80 characters")
            .required("E-mail is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await axios.post(`${apiUrl}/auth/register/client`, values);
            setRequestError("");
            navigate("/");
        } catch (e) {
            setRequestError(`Error: ${e.response?.data?.message}`);
            console.log(e.response?.data?.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container login-frame">
            <div>
                If you wish to register as a Freelancer,
                <Link to="/register/freelancer"> click here</Link>
            </div>
            <h1>Register as a Client</h1>

            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    name: "",
                    surname: "",
                    email: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="login-form">
                        <h2>Login information</h2>
                        <Field name="username">
                            {({ field, meta }) => (
                                <TextField
                                    {...field}
                                    required
                                    id="username"
                                    label="Username"
                                    type="text"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{ shrink: true }}
                                    error={meta.touched && Boolean(meta.error)}
                                    helperText={meta.touched && meta.error}
                                />
                            )}
                        </Field>

                        <Field name="password">
                            {({ field, meta }) => (
                                <TextField
                                    {...field}
                                    required
                                    id="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{ shrink: true }}
                                    error={meta.touched && Boolean(meta.error)}
                                    helperText={meta.touched && meta.error}
                                />
                            )}
                        </Field>

                        <h2>Credentials</h2>

                        <Field name="name">
                            {({ field, meta }) => (
                                <TextField
                                    {...field}
                                    required
                                    id="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{ shrink: true }}
                                    error={meta.touched && Boolean(meta.error)}
                                    helperText={meta.touched && meta.error}
                                />
                            )}
                        </Field>

                        <Field name="surname">
                            {({ field, meta }) => (
                                <TextField
                                    {...field}
                                    required
                                    id="surname"
                                    label="Surname"
                                    type="text"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{ shrink: true }}
                                    error={meta.touched && Boolean(meta.error)}
                                    helperText={meta.touched && meta.error}
                                />
                            )}
                        </Field>

                        <Field name="email">
                            {({ field, meta }) => (
                                <TextField
                                    {...field}
                                    required
                                    id="email"
                                    label="E-mail"
                                    type="text"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{ shrink: true }}
                                    error={meta.touched && Boolean(meta.error)}
                                    helperText={meta.touched && meta.error}
                                />
                            )}
                        </Field>

                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={isSubmitting}
                        >
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>

            {Boolean(requestError) && (
                <h1 style={{ color: "red" }}>{requestError}</h1>
            )}
        </div>
    );
}
