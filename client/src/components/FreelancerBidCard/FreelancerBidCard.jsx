import BidInfo from "../BidInfo/BidInfo";
import { useTranslation } from "react-i18next";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    deleteFreelancerBidThunk,
    fetchFreelancerBids,
} from "../../redux/freelancerbids/freelancerBidsSlice";
import FreelancerBidEditDialog from "../FreelancerBidEditDialog/FreelancerBidEditDialog";

export default function FreelancerBidCard({
    freelId,
    name,
    surname,
    spec,
    bidId,
    desc,
    assigned,
    deadline,
    onDelete,
    onUpdate,
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
                        <BidInfo header="Project description" content={desc} />
                    </div>
                </div>

                <div className="bid-control">
                    <FreelancerBidEditDialog
                        freelancerId={freelId}
                        bidId={bidId}
                        deadline={deadline}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                </div>
            </div>
        </>
    );
}
