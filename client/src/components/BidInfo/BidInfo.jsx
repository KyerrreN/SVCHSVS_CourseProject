import React from "react";
import "./BidInfo.css";

export default function BidInfo(props) {
    return (
        <div className="bid-desc-info">
            <span style={props.style}>{props.header}</span>
            <span>{props.content}</span>
        </div>
    );
}
