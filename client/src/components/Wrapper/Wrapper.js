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
            </Routes>
        </div>
    );
}

export default Wrapper;
