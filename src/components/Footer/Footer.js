import React, { Component } from "react";
import "../Footer/Footer.css";
import Logo from "../../img/logo/logo-black.svg";
import { Button, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLanguage = i18n.language === "en" ? "ru" : "en";
        i18n.changeLanguage(newLanguage);
    };

    return (
        <footer className="container">
            <div className="footer-frame">
                <img className="footer-logo" src={Logo} alt="" />

                <div className="footer-nav">
                    <span>{t("footer-nav-legal")}</span>

                    <a>{t("footer-nav-tos")}</a>
                    <span>Copyright (c) 2024</span>

                    <Button
                        variant="outlined"
                        color="white"
                        onClick={toggleLanguage}
                    >
                        {t("language")}
                    </Button>
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
