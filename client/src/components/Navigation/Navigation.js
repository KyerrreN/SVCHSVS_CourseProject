import React from "react";
import "../Navigation/Navigation.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navigation({ navClass }) {
    const { t } = useTranslation();

    return (
        <nav className={navClass}>
            <Link to="/">{t("nav-main")}</Link>
            {/* <Link to="/partners">{t("nav-vendors")}</Link>
            <Link to="/news">{t("nav-news")}</Link> */}
            <Link to="/freelancers">{t("nav-freelancers")}</Link>
            <Link to="/bids">{t("nav-bids")}</Link>
            <Link to="/freelancerbids">Taken bids</Link>
        </nav>
    );
}

export default Navigation;
