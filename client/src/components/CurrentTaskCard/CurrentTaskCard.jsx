import BidInfo from "../BidInfo/BidInfo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrentTaskUpdateDialog from "../CurrentTaskUpdateDialog/CurrentTaskUpdateDialog";

export default function CurrentTaskCard({
    freelId,
    bidId,
    desc,
    assigned,
    deadline,
    clientMessage,
    freelancerMessage,
    status,
    projectName,
    onComplete,
    clientName,
    clientSurname,
    clientEmail,
}) {
    return (
        <>
            <div className="bid-container">
                <div className="bid">
                    <div className="bid-header">
                        <AccountCircleIcon sx={{ width: 120, height: 120 }} />
                    </div>

                    <div className="bid-desc">
                        <BidInfo header="Id" content={bidId} />
                        <BidInfo header="Project name" content={projectName} />
                        <BidInfo header="Project description" content={desc} />
                        <BidInfo header="Assigned" content={assigned} />
                        <BidInfo header="Deadline" content={deadline} />
                        <BidInfo header="Status" content={status} />
                        <BidInfo
                            header="Client Cred"
                            content={clientName + " " + clientSurname}
                        />
                        <BidInfo header="Client Email" content={clientEmail} />
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
                    <CurrentTaskUpdateDialog
                        freelancerId={freelId}
                        bidId={bidId}
                        desc={clientMessage}
                        onComplete={onComplete}
                        status={status}
                    />
                </div>
            </div>
        </>
    );
}
