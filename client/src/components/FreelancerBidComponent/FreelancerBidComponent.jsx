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
} from "../../redux/freelancerbids/freelancerBidsSlice";
import { useEffect } from "react";
import FreelancerBidAddDialog from "../FreelancerBidAddDialog/FreelancerBidAddDialog";
import jsPDF from "jspdf";
import { Button } from "@mui/material";
import AppIcon from "../../img/etc/App.png";
import * as XLSX from "xlsx";

export default function FreelancerBidComponent() {
    const dispatch = useDispatch();

    const { freelancerBids, loading, error } = useSelector(
        (state) => state.freelancerBids
    );

    useEffect(() => {
        dispatch(fetchFreelancerBids());
    }, [dispatch]);

    const handleUnassign = async ({ bidId, bidObject }) => {
        try {
            console.log("HANDLE UNASSIGN");
            await dispatch(
                abortFreelancerBidThunk({ bidId, bidObject })
            ).unwrap();
            await dispatch(fetchFreelancerBids()).unwrap();
            console.log("Succesfully aborted a project");
        } catch (e) {
            console.error("Failed to abort a project: ", e);
        }
    };

    const handleUpdate = async ({ freelId, bidId, bidObject }) => {
        try {
            await dispatch(
                updateFreelancerBidThunk({
                    freelancerId: freelId,
                    bidId: bidId,
                    bidObject: bidObject,
                })
            ).unwrap();
            await dispatch(fetchFreelancerBids()).unwrap();
            console.log("Succesfull unassign");
        } catch (e) {
            console.error("Failed to unassign bid: ", e);
        }
    };

    const handleComplete = async ({ bidId, bidObject }) => {
        try {
            console.log("HANDLE COMPLETE");
            await dispatch(
                completeFreelancerBidThunk({ bidId, bidObject })
            ).unwrap();
            await dispatch(fetchFreelancerBids()).unwrap();
            console.log("Succesfully completed a project");
        } catch (e) {
            console.error("Failed to complete a project: ", e);
        }
    };

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
    // const createExcel = () => {
    //     const workbook = XLSX.utils.book_new();
    //     const worksheetData = [];

    //     // Add header row
    //     const headers = [
    //         "Bid ID",
    //         "Freelancer Name",
    //         "Surname",
    //         "Specialization",
    //         "Deadline",
    //         "Hard Skills",
    //         "Soft Skills",
    //         "Description",
    //     ];
    //     worksheetData.push(headers);

    //     freelancerBids.forEach((bid) => {
    //         const freelancer = bid.Freelancer || {};
    //         const row = [
    //             bid.bidId,
    //             freelancer.name || "Unknown",
    //             freelancer.surname || "Unknown",
    //             freelancer.spec || "N/A",
    //             new Date(bid.deadline).toLocaleDateString(), // Convert date to readable format
    //             freelancer.hardskills
    //                 ? freelancer.hardskills.join(", ")
    //                 : "N/A",
    //             freelancer.softskills
    //                 ? freelancer.softskills.join(", ")
    //                 : "N/A",
    //             bid.Bid.desc,
    //         ];
    //         worksheetData.push(row);
    //     });

    //     const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    //     // Append the worksheet to the workbook
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Bids");

    //     // Generate Excel file
    //     XLSX.writeFile(workbook, "freelancer_bids.xlsx");
    // };

    return (
        <div className="container bids-container">
            {/* <FreelancerBidAddDialog onAdd={handleAssignBid} /> */}
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

            {/* <Button onClick={createPDF} variant="contained">
                Generate PDF
            </Button>

            <Button onClick={createExcel} variant="contained" color="error">
                Generate Excel
            </Button> */}
        </div>
    );
}
