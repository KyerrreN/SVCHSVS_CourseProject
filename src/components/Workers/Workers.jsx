import { Component } from "react";
import "./Workers.css";
import WorkerCard from "../WorkerCard/WorkerCard";

export default function Workers() {
    return (
        <div className="container">
            <div className="workers">
                <WorkerCard />
                <WorkerCard />
                <WorkerCard />
                <WorkerCard />
                <WorkerCard />
                <WorkerCard />
                <WorkerCard />
            </div>
        </div>
    );
}
