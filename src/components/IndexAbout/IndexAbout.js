import React, { Component } from "react";
import "../IndexAbout/IndexAbout.css";
import FreelancePic from "../../img/freelance/image.png";
import { useTranslation } from "react-i18next";

export default function IndexAbout() {
    const { t } = useTranslation();

    return (
        <main className="container indexabout-container">
            <div className="indexabout-frame">
                <img
                    src={FreelancePic}
                    alt="Freelance Pic"
                    className="indexabout-pic"
                />

                <div className="indexabout-main">
                    <h1>{t("indexabout-main-h1")}</h1>

                    <span>{t("indexabout-main-span")}</span>
                </div>
            </div>
        </main>
    );
}
