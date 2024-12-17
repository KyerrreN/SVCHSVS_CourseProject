import React from "react";
import "../Bid/Bid.css";
import GavelIcon from "@mui/icons-material/Gavel";
import BidInfo from "../BidInfo/BidInfo";
import { useTranslation } from "react-i18next";
import BidEditDialog from "../BidEditDialog/BidEditDialog";
import BidOfferControl from "../BidOfferControl/BidOfferControl";

export default function BidOfferCard({
    id,
    freelancerMessage,
    freelancerName,
    freelancerSurname,
    freelancerHeader,
    freelancerRating,
    projectName,
    projectDesc,
    projectPayment,
    onReject,
    onAccept,
}) {
    const { t } = useTranslation();

    return (
        <>
            <div className="bid-container">
                <div className="bid">
                    <div className="bid-header">
                        <GavelIcon sx={{ width: 120, height: 120 }} />
                    </div>

                    <div className="bid-desc">
                        <BidInfo
                            header="Freelancer"
                            content={freelancerName + " " + freelancerSurname}
                        />
                        <BidInfo header="Header" content={freelancerHeader} />
                        <BidInfo header="Rating" content={freelancerRating} />
                        <BidInfo header="Project Name" content={projectName} />
                        <BidInfo
                            header="Project Description"
                            content={projectDesc}
                        />
                        <BidInfo
                            header="Project Payment"
                            content={projectPayment}
                        />
                        <BidInfo
                            header="Freelancer Message"
                            content={freelancerMessage}
                            style={{ color: "red" }}
                        />
                    </div>
                </div>

                <div className="bid-control">
                    <BidOfferControl
                        id={id}
                        onRejectOffer={onReject}
                        onAccept={onAccept}
                    />
                </div>
            </div>
        </>
    );
}
