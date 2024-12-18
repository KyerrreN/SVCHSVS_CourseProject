import "../BidsComponent/BidsComponent.css";
import FreelancerBidCard from "../FreelancerBidCard/FreelancerBidCard";
import { useDispatch, useSelector } from "react-redux";
import { abortFreelancerBidThunk } from "../../redux/freelancerbids/freelancerBidsSlice";
import { useEffect } from "react";
import {
    completeClientBidThunk,
    fetchClientBidsThunk,
    updateClientBidThunk,
} from "../../redux/clientBids/clientBidsSlice";

export default function FreelancerBidComponent() {
    const dispatch = useDispatch();

    const { clientBids, loading, error } = useSelector(
        (state) => state.clientBids
    );

    useEffect(() => {
        dispatch(fetchClientBidsThunk());
    }, [dispatch]);

    const handleUnassign = async ({ bidId, bidObject }) => {
        try {
            console.log("HANDLE UNASSIGN");
            await dispatch(
                abortFreelancerBidThunk({ bidId, bidObject })
            ).unwrap();
            await dispatch(fetchClientBidsThunk()).unwrap();
            console.log("Succesfully aborted a project");
        } catch (e) {
            console.error("Failed to abort a project: ", e);
        }
    };

    const handleUpdate = async ({ freelId, bidId, bidObject }) => {
        try {
            await dispatch(
                updateClientBidThunk({
                    freelancerId: freelId,
                    bidId: bidId,
                    bidObject: bidObject,
                })
            ).unwrap();
            await dispatch(fetchClientBidsThunk()).unwrap();
            console.log("Succesfull update");
        } catch (e) {
            console.error("Failed to update bid: ", e);
        }
    };

    const handleComplete = async ({ bidId, bidObject }) => {
        try {
            console.log("HANDLE COMPLETE");
            await dispatch(
                completeClientBidThunk({ bidId, bidObject })
            ).unwrap();
            await dispatch(fetchClientBidsThunk()).unwrap();
            console.log("Succesfully completed a project");
        } catch (e) {
            console.error("Failed to complete a project: ", e);
        }
    };

    return (
        <div className="container bids-container">
            {error && <h1>Error: {error}</h1>}

            {loading === true ? (
                <h1>Bids are loading...</h1>
            ) : clientBids.length > 0 ? (
                clientBids.map((bid) => {
                    const freelancer = bid.Freelancer || {};

                    return (
                        <FreelancerBidCard
                            key={`${bid.freelancerId}-${bid.bidId}`}
                            name={freelancer.name || "Unknown"}
                            surname={freelancer.surname || "Unknown"}
                            bidId={bid.bidId}
                            freelId={bid.freelancerId}
                            spec={freelancer.Spec.name || "N/A"}
                            assigned={bid.assigned}
                            deadline={bid.deadline}
                            onDelete={handleUnassign}
                            onUpdate={handleUpdate}
                            onComplete={handleComplete}
                            desc={bid.Bid.desc}
                            clientMessage={bid.clientMessage}
                            freelancerMessage={bid.freelancerMessage}
                            status={bid.status}
                            projectName={bid.Bid.name}
                        />
                    );
                })
            ) : (
                <h1>No bids to display</h1>
            )}
        </div>
    );
}
