import React from "react";
import "../Footer/Footer.css";
import Logo from "../../img/logo/logo-black.svg";
import { Button, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../AuthContext/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Footer() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { isAuthenticated, logout } = useAuth();

    const handleDeleteUser = async () => {
        const confirmDelete = window.confirm("This action cannot be reversed");
        if (confirmDelete) {
            await axios.delete(`${process.env.REACT_APP_URL}/auth/delete`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            });

            logout();

            return navigate("/");
        }
    };

    return (
        <footer className="container">
            <div className="footer-frame">
                <img className="footer-logo" src={Logo} alt="" />

                <div className="footer-nav">
                    <span>{t("footer-nav-legal")}</span>

                    <span>{t("footer-nav-tos")}</span>
                    <span>Copyright (c) 2024</span>

                    {isAuthenticated ? (
                        <>
                            <Link to="/changepassword">Change password</Link>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleDeleteUser}
                                sx={{ marginLeft: 2 }}
                            >
                                Delete account
                            </Button>
                        </>
                    ) : (
                        <></>
                    )}
                </div>

                <div className="footer-nav">
                    <span>{t("footer-nav-contact")}</span>

                    <Tooltip
                        title="Call us: +375441234567"
                        placement="left-start"
                        arrow
                    >
                        <a href="tel:+375441234567">{t("footer-nav-phone")}</a>
                    </Tooltip>

                    <Tooltip
                        title="Email us to kyerrrenmgt@gmail.com"
                        placement="left-start"
                        arrow
                    >
                        <a href="mailto:kyerrrenmgt@gmail.com">
                            {t("footer-nav-email")}
                        </a>
                    </Tooltip>

                    <Tooltip
                        title="Click to know where our office is located"
                        placement="left-start"
                        arrow
                    >
                        <a href="https://maps.app.goo.gl/kXw1roHZQ2bGxFnt8">
                            {t("footer-nav-location")}
                        </a>
                    </Tooltip>

                    <Tooltip
                        title="Visit my github: https://github.com/KyerrreN"
                        placement="left-start"
                        arrow
                    >
                        <a href="https://github.com/KyerrreN">
                            {t("footer-nav-github")}
                        </a>
                    </Tooltip>
                </div>
            </div>
        </footer>
    );
}
