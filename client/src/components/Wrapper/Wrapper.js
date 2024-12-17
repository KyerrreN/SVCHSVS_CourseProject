import React from "react";
import "../Wrapper/Wrapper.css";
import { Route, Routes } from "react-router-dom";

// Import components
import Main from "../../pages/Main.js";
import News from "../../pages/News.js";
import Partners from "../../pages/Partners.jsx";
import Freelancers from "../../pages/Freelancers.jsx";
import Bids from "../../pages/Bids.jsx";
import FreelancerBid from "../../pages/FreelancerBid.jsx";
import LoginPage from "../../pages/LoginPage.jsx";
import RegisterFreelancerPage from "../../pages/RegisterFreelancerPage.jsx";
import RegisterClientPage from "../../pages/RegisterClientPage.jsx";
import ChangePassword from "../ChangePassword/ChangePassword.jsx";
import ClientBidsPage from "../../pages/ClientBidsPage.jsx";
import BidOfferPage from "../../pages/BidOfferPage.jsx";
import CurrentTasksPage from "../../pages/CurrentTasksPage.jsx";
import HistoryPage from "../../pages/HistoryPage.jsx";

function Wrapper() {
    return (
        <div className="wrapper">
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/news" element={<News />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/freelancers" element={<Freelancers />} />
                <Route path="/bids" element={<Bids />} />
                <Route path="/freelancerbids" element={<FreelancerBid />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/register/freelancer"
                    element={<RegisterFreelancerPage />}
                />
                <Route
                    path="/register/client"
                    element={<RegisterClientPage />}
                />
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/client/bids" element={<ClientBidsPage />} />
                <Route path="/client/offer" element={<BidOfferPage />} />
                <Route
                    path="/freelancer/tasks"
                    element={<CurrentTasksPage />}
                />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </div>
    );
}

export default Wrapper;
