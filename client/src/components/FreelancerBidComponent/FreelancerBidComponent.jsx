import "../BidsComponent/BidsComponent.css";
import FreelancerBidCard from "../FreelancerBidCard/FreelancerBidCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchFreelancerBids } from "../../redux/freelancerbids/freelancerBidsSlice";
import { useEffect } from "react";

export default function FreelancerBidComponent() {
    const dispatch = useDispatch();

    const { freelancerBids, loading, error } = useSelector(
        (state) => state.freelancerBids
    );

    useEffect(() => {
        dispatch(fetchFreelancerBids());
    }, [dispatch]);

    return (
        <div className="container bids-container">
            {error && <h1>Error: {error}</h1>}

            {loading === true ? (
                <h1>Bids are loading...</h1>
            ) : freelancerBids.length > 0 ? (
                freelancerBids.map((bid) => {
                    return (
                        <FreelancerBidCard
                            name={bid.Freelancer.name}
                            surname={bid.Freelancer.surname}
                            bidId={bid.bidId}
                            spec={bid.Freelancer.spec}
                            assigned={bid.assigned}
                            deadline={bid.deadline}
                        />
                    );
                })
            ) : (
                <h1>No bids to display</h1>
            )}
            {/* <FreelancerBidCard
                name={123}
                surname={123}
                bidId={1}
                spec="Lorem"
                assigned={new Date().toDateString()}
                deadline={new Date().toDateString()}
            /> */}
        </div>
    );
}
