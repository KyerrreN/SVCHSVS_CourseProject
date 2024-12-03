import BidInfo from "../BidInfo/BidInfo";
import { useTranslation } from "react-i18next";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchFreelancerBids } from "../../redux/freelancerbids/freelancerBidsSlice";

export default function FreelancerBidCard({
    name,
    surname,
    spec,
    bidId,
    assigned,
    deadline,
}) {
    const { t } = useTranslation();

    return (
        <>
            <div className="bid-container">
                <div className="bid">
                    <div className="bid-header">
                        <AccountCircleIcon sx={{ width: 120, height: 120 }} />
                    </div>

                    <div className="bid-desc">
                        <BidInfo
                            header={`Freelancer on the bid ${bidId}`}
                            content={name + " " + surname}
                        />
                        <BidInfo header={t("bid-needed")} content={spec} />
                        <BidInfo header="Assigned" content={assigned} />
                        <BidInfo header="Deadline" content={deadline} />
                    </div>
                </div>

                <div className="bid-control">
                    {/* <BidEditDialog
                        id={id}
                        name={name}
                        desc={desc}
                        needed={needed}
                        deadline={deadline}
                        payment={payment}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    /> */}
                </div>
            </div>
        </>
    );
}
