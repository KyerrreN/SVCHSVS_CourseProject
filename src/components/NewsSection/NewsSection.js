import React, { Component } from "react";
import "./NewsSection.css";
import NewsFrame from "../NewsFrame/NewsFrame";
import { useTranslation } from "react-i18next";

export default function NewsSection() {
    const { t } = useTranslation();

    return (
        <section className="container">
            <div className="news-frame">
                <h1>{t("news-frame-h1")}</h1>

                <NewsFrame />
            </div>
        </section>
    );
}
