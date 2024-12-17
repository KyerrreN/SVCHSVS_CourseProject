import React, { useEffect, useState } from "react";
import "../Navigation/Navigation.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../AuthContext/AuthContext";

function Navigation({ navClass }) {
    const { t } = useTranslation();
    const { isAuthenticated, role, logout } = useAuth();

    return (
        <nav className={navClass}>
            <Link to="/">{t("nav-main")}</Link>
            {!isAuthenticated ? (
                <>
                    <Link to="/register/freelancer">Register</Link>
                    <Link to="/login">Login</Link>
                </>
            ) : (
                <>
                    <Link to="/" onClick={logout}>
                        Logout
                    </Link>

                    {role === "Freelancer" ? (
                        <>
                            {" "}
                            <Link to="/bids">{t("nav-bids")}</Link>
                            <Link to="/freelancer/tasks">Tasks</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/freelancers">
                                {t("nav-freelancers")}
                            </Link>
                            <Link to="/freelancerbids">Taken bids</Link>
                            <Link to="/client/bids">Your bids</Link>
                            <Link to="/client/offer">Offers</Link>
                        </>
                    )}
                </>
            )}

            {/* <Link to="/partners">{t("nav-vendors")}</Link>
            <Link to="/news">{t("nav-news")}</Link> */}
        </nav>
    );
}

export default Navigation;
