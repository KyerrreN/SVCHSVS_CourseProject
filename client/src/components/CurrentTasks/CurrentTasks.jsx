import "../BidsComponent/BidsComponent.css";
import FreelancerBidCard from "../FreelancerBidCard/FreelancerBidCard";
import { useDispatch, useSelector } from "react-redux";
import {
    addFreelancerBidThunk,
    fetchFreelancerBids,
    deleteFreelancerBidThunk,
    updateFreelancerBidThunk,
    abortFreelancerBidThunk,
    completeFreelancerBidThunk,
    fetchFreelancerBidsThunk,
    resetFreelancerBids,
    reportFreelancerBidCompletionThunk,
} from "../../redux/freelancerbids/freelancerBidsSlice";
import { useEffect } from "react";
import FreelancerBidAddDialog from "../FreelancerBidAddDialog/FreelancerBidAddDialog";
import jsPDF from "jspdf";
import { Button } from "@mui/material";
import AppIcon from "../../img/etc/App.png";
import * as XLSX from "xlsx";
import CurrentTaskCard from "../CurrentTaskCard/CurrentTaskCard";
import {
    fetchClientBidsThunk,
    resetClientBids,
} from "../../redux/clientBids/clientBidsSlice";

export default function CurrentTasks() {
    const dispatch = useDispatch();

    const { freelancerBids, loading, error } = useSelector(
        (state) => state.freelancerBids
    );

    useEffect(() => {
        dispatch(fetchFreelancerBidsThunk());
        return () => {
            dispatch(resetFreelancerBids());
        };
    }, [dispatch]);

    const handleComplete = async ({ bidId, freelancerId, bidObject }) => {
        try {
            await dispatch(
                reportFreelancerBidCompletionThunk({
                    bidId,
                    freelancerId,
                    bidObject,
                })
            ).unwrap();
            await dispatch(fetchFreelancerBidsThunk()).unwrap();
            console.log("Succesfully send a project for review");
        } catch (e) {
            console.error("Failed to send a project for review: ", e);
        }
    };

    return (
        <div className="container bids-container">
            {error && <h1>Error: {error}</h1>}

            {loading === true ? (
                <h1>Bids are loading...</h1>
            ) : freelancerBids.length > 0 ? (
                freelancerBids.map((bid) => {
                    return (
                        <CurrentTaskCard
                            key={`${bid.freelancerId}-${bid.bidId}`}
                            bidId={bid.bidId}
                            freelId={bid.freelancerId}
                            assigned={bid.assigned}
                            deadline={bid.deadline}
                            onComplete={handleComplete}
                            desc={bid.Bid.desc}
                            clientMessage={bid.clientMessage}
                            freelancerMessage={bid.freelancerMessage}
                            status={bid.status}
                            projectName={bid.Bid.name}
                            clientName={bid.Bid.Client.name}
                            clientSurname={bid.Bid.Client.surname}
                            clientEmail={bid.Bid.Client.email}
                        />
                    );
                })
            ) : (
                <h1>No bids to display</h1>
            )}

            {/* <Button onClick={createPDF} variant="contained">
                Generate PDF
            </Button>

            <Button onClick={createExcel} variant="contained" color="error">
                Generate Excel
            </Button> */}
        </div>
    );
}
