import React from "react";
import "./BidInfo.css";

export default function BidInfo(props) {
    return (
        <div className="bid-desc-info">
            <span>{props.header}</span>
            <span>{props.content}</span>
        </div>
    );
}
