import React from "react";
import "../Bid/Bid.css";
import GavelIcon from "@mui/icons-material/Gavel";
import BidInfo from "../BidInfo/BidInfo";
import { useTranslation } from "react-i18next";
import BidEditDialog from "../BidEditDialog/BidEditDialog";
import ClientBidEditDialog from "../ClientBidEditDialog/ClientBidEditDialog";

export default function ClientBidCard({
    id,
    onDelete,
    name,
    desc,
    needed,
    payment,
    clientId,
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
                    </div>
                </div>

                <div className="bid-control">
                    <ClientBidEditDialog
                        bidId={id}
                        clientId={clientId}
                        onDelete={onDelete}
                        name={name}
                    />
                </div>
            </div>
        </>
    );
}
