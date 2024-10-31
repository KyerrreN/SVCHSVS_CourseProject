import { React } from "react";
import "./PartnersList.css";
import PartnersData from "../../json/Partners.json";

// MUI
import { Box } from "@mui/material";

import PartnerIndividual from "../PartnerIndividual/PartnerIndividual";
import { useTranslation } from "react-i18next";

export default function PartnersList() {
    const { t } = useTranslation();

    return (
        <section className="container">
            <div className="partnerslist-frame">
                <h1>{t("partnerslist-frame-h1")}</h1>

                <Box>
                    {PartnersData.map((partner, index) => (
                        <PartnerIndividual partner={partner} key={index} />
                    ))}
                </Box>
            </div>
        </section>
    );
}
