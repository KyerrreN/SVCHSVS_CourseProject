import React from "react";
import "../WhyUsReason/WhyUsReason.css";
import "aos/dist/aos.css";

export default function WhyUsReason({ image, alt, header, description }) {
    return (
        <div className="whyus-reason">
            <div className="whyus-reason-pic">
                <img src={image} alt={alt}></img>
            </div>

            <h1>{header}</h1>

            <span>{description}</span>
        </div>
    );
}
