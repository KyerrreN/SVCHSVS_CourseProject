import { useSelector, useDispatch } from "react-redux";
import {
    addBidOfferThunk,
    deleteBidOfferThunk,
    fetchBidOffers,
} from "../../redux/bidOffer/bidOfferSlice";
import { useEffect } from "react";
import BidOfferCard from "../BidOfferCard/BidOfferCard";

export default function BidOffer() {
    const dispatch = useDispatch();

    const { bidOffers, loading, error } = useSelector(
        (state) => state.bidOffers
    );

    useEffect(() => {
        dispatch(fetchBidOffers({ clientId: sessionStorage.getItem("id") }));
    }, [dispatch]);

    const handleRejectOffer = async ({ id }) => {
        try {
            await dispatch(deleteBidOfferThunk({ bidId: id })).unwrap();
            await dispatch(
                fetchBidOffers({ clientId: sessionStorage.getItem("id") })
            ).unwrap();
        } catch (e) {
            console.error("Failed to reject offer:", e);
        }
    };

    const handleAcceptOffer = async ({ id }) => {
        try {
            await dispatch(addBidOfferThunk({ bidId: id })).unwrap();
            await dispatch(
                fetchBidOffers({ clientId: sessionStorage.getItem("id") })
            ).unwrap();
        } catch (e) {
            console.error("Failed to accept offer:", e);
        }
    };

    return (
        <div className="container bids-container">
            {error && <h1>Error: {error}</h1>}

            {loading === true ? (
                <h1>Offers are loading...</h1>
            ) : bidOffers.length > 0 ? (
                <>
                    <h1 style={{ alignSelf: "center", textAlign: "center" }}>
                        Here are the bids that have not been yet taken
                    </h1>

                    {bidOffers.map((bid) => {
                        return (
                            <BidOfferCard
                                key={bid.id}
                                id={bid.id}
                                freelancerMessage={bid.freelancerMessage}
                                freelancerName={bid.Freelancer.name}
                                freelancerSurname={bid.Freelancer.surname}
                                freelancerHeader={bid.Freelancer.header}
                                freelancerRating={bid.Freelancer.rating}
                                projectName={bid.Bid.name}
                                projectDesc={bid.Bid.desc}
                                projectPayment={bid.Bid.payment}
                                onReject={handleRejectOffer}
                                onAccept={handleAcceptOffer}
                            />
                        );
                    })}
                </>
            ) : (
                <h1>No bids to display</h1>
            )}
        </div>
    );
}
