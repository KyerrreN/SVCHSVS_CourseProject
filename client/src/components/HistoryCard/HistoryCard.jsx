import BidInfo from "../BidInfo/BidInfo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function HistoryCard({
    id,
    projectName,
    projectDesc,
    deadline,
    assigned,
    done,
    clientName,
    clientSurname,
    clientEmail,
    rated,
}) {
    return (
        <>
            <div className="bid-container">
                <div className="bid">
                    <div className="bid-header">
                        <AccountCircleIcon sx={{ width: 120, height: 120 }} />
                    </div>

                    <div className="bid-desc">
                        <BidInfo header={"Bid №"} content={id} />
                        <BidInfo header="Project Name" content={projectName} />
                        <BidInfo header="Project Desc" content={projectDesc} />
                        <BidInfo
                            header="Rated"
                            content={rated || "Not Rated"}
                        />
                        <BidInfo header="Deadline" content={deadline} />
                        <BidInfo header="Assigned" content={assigned} />
                        <BidInfo
                            header="Date of completion"
                            content={done || "Aborted"}
                        />
                        <BidInfo
                            header="Client Name"
                            content={clientName || "PROFILE DELETED"}
                        />
                        <BidInfo
                            header="Client Surname"
                            content={clientSurname || "PROFILE DELETED"}
                        />
                        <BidInfo
                            header="Client Email"
                            content={clientEmail || "PROFILE DELETED"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
