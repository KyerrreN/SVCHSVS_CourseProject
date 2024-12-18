import BidInfo from "../BidInfo/BidInfo";
import { useTranslation } from "react-i18next";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
    clientMessage,
    freelancerMessage,
    status,
    projectName,
    onComplete,
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
                        <BidInfo header="Project name" content={projectName} />
                        <BidInfo header="Project description" content={desc} />
                        <BidInfo header="Assigned" content={assigned} />
                        <BidInfo header="Deadline" content={deadline} />
                        <BidInfo header="Status" content={status} />
                        {freelancerMessage !== null ? (
                            <BidInfo
                                header="Freelancer Message"
                                content={freelancerMessage}
                                style={{ color: "red" }}
                            />
                        ) : (
                            <></>
                        )}

                        {clientMessage !== null ? (
                            <BidInfo
                                header="Updated description"
                                content={clientMessage}
                                style={{ color: "red" }}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>

                <div className="bid-control">
                    <FreelancerBidEditDialog
                        freelancerId={freelId}
                        bidId={bidId}
                        desc={clientMessage}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onComplete={onComplete}
                        status={status}
                    />
                </div>
            </div>
        </>
    );
}
