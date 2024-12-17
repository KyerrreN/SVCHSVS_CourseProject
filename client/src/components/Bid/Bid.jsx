import React from "react";
import "./Bid.css";
import GavelIcon from "@mui/icons-material/Gavel";
import BidInfo from "../BidInfo/BidInfo";
import { useTranslation } from "react-i18next";
import BidEditDialog from "../BidEditDialog/BidEditDialog";

export default function Bid({
    id,
    name,
    desc,
    needed,
    payment,
    clientName,
    clientSurname,
    onOffer,
}) {
    const { t } = useTranslation();

    return (
        <>
            <div className="bid-container">
                <div className="bid">
                    <div className="bid-header">
                        <GavelIcon sx={{ width: 120, height: 120 }} />

                        <span>{name}</span>
                    </div>

                    <div className="bid-desc">
                        <BidInfo header={t("bid-desc")} content={desc} />
                        <BidInfo header={t("bid-needed")} content={needed} />
                        <BidInfo header={t("bid-payment")} content={payment} />
                        <BidInfo
                            header="Client Creds"
                            content={clientName + " " + clientSurname}
                        />
                    </div>
                </div>

                <div className="bid-control">
                    <BidEditDialog
                        id={id}
                        name={name}
                        desc={desc}
                        bidId={id}
                        needed={needed}
                        payment={payment}
                        onOffer={onOffer}
                    />
                </div>
            </div>
        </>
    );
}
