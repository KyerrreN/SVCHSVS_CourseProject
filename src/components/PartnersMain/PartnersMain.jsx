import React from "react";
import "./PartnersMain.css";

// img
import PartnershipValueImage from "../../img/partners/partnership.svg";
import { useTranslation } from "react-i18next";

export default function PartnersMain() {
    const { t } = useTranslation();

    return (
        <main className="container">
            <div className="partnersmain-frame">
                <div className="partnersmain-first">
                    <h1>{t("partnersmain-first-h1")}</h1>

                    <span>{t("partnersmain-first-span")}</span>
                </div>

                <div className="partnersmain-second">
                    <div>
                        <img src={PartnershipValueImage} alt="Partnership" />
                    </div>
                </div>
            </div>
        </main>
    );
}
