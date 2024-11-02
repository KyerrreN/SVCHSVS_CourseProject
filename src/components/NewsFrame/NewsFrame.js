import React, { useEffect, useState } from "react";
import NewsData from "../../json/News.json";
import "./NewsFrame.css";
import NewsFrameModal from "../NewsFrameModal/NewsFrameModal";

// MUI
import { Button, Rating, Typography } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from "react-i18next";

export default function NewsFrame() {
    const [index, setIndex] = useState(0);
    const [currentNews, setCurrentNews] = useState(NewsData[0]);
    const { t } = useTranslation();

    // Navigation for buttons
    const handlePrevious = () => {
        if (index === 0) {
            setIndex(NewsData.length - 1);
            setCurrentNews(NewsData[NewsData.length - 1]);
        } else {
            setIndex(index - 1);
            setCurrentNews(NewsData[index - 1]);
        }
    };

    const handleNext = () => {
        if (index === NewsData.length - 1) {
            setIndex(0);
            setCurrentNews(NewsData[0]);
        } else {
            setIndex(index + 1);
            setCurrentNews(NewsData[index + 1]);
        }
    };

    // Keyboard events
    useEffect(() => {
        document.addEventListener("keydown", handlePreviousPress);
        document.addEventListener("keydown", handleNextPress);

        return () => {
            document.removeEventListener("keydown", handlePreviousPress);
            document.removeEventListener("keydown", handleNextPress);
        };
    }, [index]);

    const handlePreviousPress = (event) => {
        if (event.key === "ArrowLeft" || event.key === "a") {
            handlePrevious();
        }
    };

    const handleNextPress = (event) => {
        if (event.key === "ArrowRight" || event.key === "d") {
            handleNext();
        }
    };

    return (
        <div className="newsframe-frame">
            <img src={currentNews.pictureLink} alt="Current news" />

            <div>
                <h1>{currentNews.header}</h1>
            </div>

            <div>{currentNews.shortDesc}</div>

            <nav className="newsframe-navigation">
                <Button
                    variant="contained"
                    onClick={handlePrevious}
                    color="success"
                >
                    <ArrowBackIos />
                </Button>

                <NewsFrameModal news={currentNews} />

                <Button
                    variant="contained"
                    onClick={handleNext}
                    color="success"
                >
                    <ArrowForwardIos />
                </Button>
            </nav>
            <span className="newsframe-counter">
                <span>
                    {index + 1} / {NewsData.length}
                </span>
                <span>
                    <Typography>{t("news-relevance")}</Typography>
                    <Rating
                        name="read-only"
                        value={currentNews.rating}
                        readOnly
                        precision={0.5}
                    />
                </span>
            </span>
        </div>
    );
}
