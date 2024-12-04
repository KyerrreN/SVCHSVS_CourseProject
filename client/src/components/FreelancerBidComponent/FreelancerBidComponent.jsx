import "../BidsComponent/BidsComponent.css";
import FreelancerBidCard from "../FreelancerBidCard/FreelancerBidCard";
import { useDispatch, useSelector } from "react-redux";
import {
    addFreelancerBidThunk,
    fetchFreelancerBids,
} from "../../redux/freelancerbids/freelancerBidsSlice";
import { useEffect } from "react";
import FreelancerBidAddDialog from "../FreelancerBidAddDialog/FreelancerBidAddDialog";

export default function FreelancerBidComponent() {
    const dispatch = useDispatch();

    const { freelancerBids, loading, error } = useSelector(
        (state) => state.freelancerBids
    );

    useEffect(() => {
        dispatch(fetchFreelancerBids());
    }, [dispatch]);

    const handleAssignBid = async (assignObject) => {
        try {
            await dispatch(addFreelancerBidThunk(assignObject)).unwrap();
            await dispatch(fetchFreelancerBids()).unwrap();
        } catch (e) {
            console.error("Failed handleAssignBid: " + e);
        }
    };

    return (
        <div className="container bids-container">
            <FreelancerBidAddDialog onAdd={handleAssignBid} />
            {error && <h1>Error: {error}</h1>}

            {loading === true ? (
                <h1>Bids are loading...</h1>
            ) : freelancerBids.length > 0 ? (
                freelancerBids.map((bid) => {
                    const freelancer = bid.Freelancer || {};

                    return (
                        <FreelancerBidCard
                            key={`${bid.freelancerId}-${bid.bidId}`}
                            name={freelancer.name || "Unknown"}
                            surname={freelancer.surname || "Unknown"}
                            bidId={bid.bidId}
                            spec={freelancer.spec || "N/A"}
                            assigned={bid.assigned}
                            deadline={bid.deadline}
                        />
                    );
                })
            ) : (
                <h1>No bids to display</h1>
            )}
        </div>
    );
}
