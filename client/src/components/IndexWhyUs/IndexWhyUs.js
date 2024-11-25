import React from "react";

// css
import "../IndexWhyUs/IndexWhyUs.css";

// img
import Top from "../../img/whyus/top.svg";
import Options from "../../img/whyus/options.svg";
import Process from "../../img/whyus/process.svg";
import Payment from "../../img/whyus/payment.svg";

// child component
import WhyUsReason from "../WhyUsReason/WhyUsReason";
import { useTranslation } from "react-i18next";

export default function IndexWhyUs() {
    const { t } = useTranslation();

    return (
        <section className="container">
            <div className="indexwhyus-frame">
                <h1>{t("indexwhyus-frame-h1")}</h1>

                <div className="indexwhyus-reasons">
                    <WhyUsReason
                        image={Top}
                        alt="Top Image"
                        header={t("indexwhyus-reason-h1-first")}
                        description={t("indexwhyus-reason-span-first")}
                    />

                    <WhyUsReason
                        image={Options}
                        alt="Options Image"
                        header={t("indexwhyus-reason-h1-second")}
                        description={t("indexwhyus-reason-span-second")}
                    />

                    <WhyUsReason
                        image={Process}
                        alt="Process Image"
                        header={t("indexwhyus-reason-h1-third")}
                        description={t("indexwhyus-reason-span-third")}
                    />

                    <WhyUsReason
                        image={Payment}
                        alt="Payment IMG"
                        header={t("indexwhyus-reason-h1-fourth")}
                        description={t("indexwhyus-reason-span-fourth")}
                    />
                </div>
            </div>
        </section>
    );
}
