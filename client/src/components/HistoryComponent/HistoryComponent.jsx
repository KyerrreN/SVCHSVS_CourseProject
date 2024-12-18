import "../BidsComponent/BidsComponent.css";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { Button } from "@mui/material";
import axios from "axios";
import HistoryCard from "../HistoryCard/HistoryCard";
import CompanyLogo from "../../img/logo/logo-no-background.png";

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
    const generatePDF = () => {
        const doc = new jsPDF();
        const margin = 20;
        const lineHeight = 8;
        const topIndent = 5;

        // title
        doc.setFontSize(22);
        doc.text("Project History Report", margin, 30);
        doc.setFontSize(12);
        doc.text(
            "Generated on: " + new Date().toLocaleDateString(),
            margin,
            50
        );

        const freelancer = freelancerBids[0].Freelancer;
        doc.text(
            `Prepared by: ${freelancer.name} ${freelancer.surname}`,
            margin,
            70
        );
        doc.text(`Specialty: ${freelancer.Spec.name}`, margin, 80);
        doc.text(`Current rating: ${freelancer.rating}`, margin, 90);

        doc.addPage();

        freelancerBids.forEach((bid) => {
            doc.setFontSize(16);
            doc.setTextColor(255, 0, 0);
            doc.text(`Project Name: ${bid.name}`, margin, 30);
            doc.setTextColor(0, 0, 0);

            const descriptionLines = doc.splitTextToSize(
                bid.desc,
                180 - margin * 2
            );
            descriptionLines.forEach((line, index) => {
                doc.text(line, margin, 50 + index * lineHeight);
            });

            const baseY = 50 + descriptionLines.length * lineHeight;

            doc.text(
                `Deadline: ${new Date(bid.deadline).toLocaleDateString()}`,
                margin,
                baseY + topIndent
            );

            doc.text(
                `Client Name: ${bid.Client.name} ${bid.Client.surname}`,
                margin,
                baseY + lineHeight + topIndent
            );

            doc.text(
                `Client Email: ${bid.Client.email}`,
                margin,
                baseY + 2 * lineHeight + topIndent
            );
            doc.text(
                `Rated: ${bid.rated || "no rating, since it was aborted"}`,
                margin,
                baseY + 3 * lineHeight + topIndent
            );
            doc.text(
                `Assigned: ${bid.assigned}`,
                margin,
                baseY + 4 * lineHeight + topIndent
            );
            doc.text(
                `Done: ${bid.done || "aborted, no date available"}`,
                margin,
                baseY + 5 * lineHeight + topIndent
            );

            doc.addImage(
                CompanyLogo,
                "PNG",
                margin,
                baseY + 6 * lineHeight + topIndent,
                120,
                50
            );

            doc.addPage();
        });

        doc.save("freelancer_bids_report.pdf");
    };
    return (
        <div className="container bids-container">
            {error && <h1>Error: {error}</h1>}

            {loading === true ? (
                <h1>Bids are loading...</h1>
            ) : freelancerBids.length > 0 ? (
                <>
                    <Button onClick={generatePDF} variant="contained">
                        Generate PDF
                    </Button>
                    {freelancerBids.map((bid) => {
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
                    })}
                </>
            ) : (
                <h1 style={{ alignSelf: "center", textAlign: "center" }}>
                    History is empty. Complete some projects
                </h1>
            )}
        </div>
    );
}
