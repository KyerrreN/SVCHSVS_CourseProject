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
import { useEffect, useState } from "react";
import FreelancerBidAddDialog from "../FreelancerBidAddDialog/FreelancerBidAddDialog";
import jsPDF from "jspdf";
import { Button } from "@mui/material";
import AppIcon from "../../img/etc/App.png";
import * as XLSX from "xlsx";
import CurrentTaskCard from "../CurrentTaskCard/CurrentTaskCard";
import axios from "axios";
import HistoryCard from "../HistoryCard/HistoryCard";

export default function HistoryComponent() {
    const [freelancerBids, setFreelancerBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFreelancerBids = async () => {
            setLoading(true);
            setError(null);

            try {
                const freelancerId = sessionStorage.getItem("id");
                const token = sessionStorage.getItem("token");

                const response = await axios.get(
                    `${process.env.REACT_APP_URL}/history/${freelancerId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setFreelancerBids(response.data.message);
            } catch (e) {
                setError(e.response?.data?.message || "Failed to fetch bids.");
            } finally {
                setLoading(false);
            }
        };

        fetchFreelancerBids();
    }, []);

    // jspdf

    // const createPDF = () => {
    //     const doc = new jsPDF();
    //     doc.setFontSize(22);
    //     const title = "Projects you're working on";
    //     const titleWidth = doc.getTextWidth(title);
    //     const pageWidth = doc.internal.pageSize.width;

    //     const x = (pageWidth - titleWidth) / 2;
    //     doc.text(title, x, 20);

    //     let y = 40;
    //     const marginBottom = 20;
    //     const pageHeight = doc.internal.pageSize.height;
    //     let bidsOnCurrentPage = 0;
    //     const spaceBetweenBids = 20;

    //     freelancerBids.forEach((bid) => {
    //         const freelancer = bid.Freelancer || {};

    //         doc.setFontSize(16);
    //         doc.setTextColor(255, 0, 0);
    //         doc.text(`Bid ID: ${bid.bidId}`, 20, y);

    //         doc.setTextColor(0, 0, 0);
    //         doc.text(
    //             `Freelancer Name: ${freelancer.name || "Unknown"} ${
    //                 freelancer.surname || "Unknown"
    //             }`,
    //             20,
    //             y + 10
    //         );
    //         doc.text(`Specialization: ${freelancer.spec || "N/A"}`, 20, y + 20);

    //         const deadlineDate = new Date(bid.deadline).toLocaleDateString();
    //         doc.text(`Deadline: ${deadlineDate}`, 20, y + 30);

    //         const hardSkills = bid.Freelancer.hardskills
    //             ? bid.Freelancer.hardskills.join(", ")
    //             : "N/A";
    //         doc.text(`Hard Skills: ${hardSkills}`, 20, y + 40);

    //         const softSkills = bid.Freelancer.softskills
    //             ? bid.Freelancer.softskills.join(", ")
    //             : "N/A";
    //         doc.text(`Soft Skills: ${softSkills}`, 20, y + 50);

    //         const description = "Description: " + bid.Bid.desc;
    //         const maxWidth = 180;
    //         const splitDescription = doc.splitTextToSize(description, maxWidth);

    //         splitDescription.forEach((line, index) => {
    //             doc.text(line, 20, y + 60 + index * 10);
    //         });

    //         y += 60 + (splitDescription.length - 1) * 10 + spaceBetweenBids;
    //         bidsOnCurrentPage++;

    //         if (bidsOnCurrentPage >= 2) {
    //             doc.addPage();
    //             y = 20;
    //             bidsOnCurrentPage = 0;
    //         }
    //     });

    //     doc.save("freelancer_bids.pdf");
    // };

    return (
        <div className="container bids-container">
            {error && <h1>Error: {error}</h1>}

            {loading === true ? (
                <h1>Bids are loading...</h1>
            ) : freelancerBids.length > 0 ? (
                freelancerBids.map((bid) => {
                    return (
                        <HistoryCard
                            key={bid.id}
                            id={bid.id}
                            projectName={bid.name}
                            projectDesc={bid.desc}
                            deadline={bid.deadline}
                            assigned={bid.deadline}
                            done={bid.done}
                            clientName={bid.Client.name}
                            clientSurname={bid.Client.surname}
                            clientEmail={bid.Client.email}
                            rated={bid.rated}
                        />
                    );
                })
            ) : (
                <h1 style={{ alignSelf: "center", textAlign: "center" }}>
                    History is empty. Complete some projects
                </h1>
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
