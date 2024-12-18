import { useState } from "react";
import React, { useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import "./BurgerMenu.css";
import { useLocation } from "react-router-dom";

export default function BurgerMenu() {
    const [burgermenuBarClass, setBurgermenuBarClass] = useState(
        "burgermenu-bar unclicked"
    );

    const [burgermenuItemsClass, setBurgermenuItemsClass] = useState(
        "burgermenu-items hidden"
    );

    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const location = useLocation();

    useEffect(() => {
        document.body.style.overflow = "auto";

        return () => {
            document.body.style.overflow = "hidden";
        };
    }, [location.pathname]);

    function updateMenu() {
        if (!isMenuClicked) {
            setBurgermenuBarClass("burgermenu-bar clicked");
            setBurgermenuItemsClass("burgermenu-items visible");
            document.body.style.overflow = "hidden";
        } else {
            setBurgermenuBarClass("burgermenu-bar unclicked");
            setBurgermenuItemsClass("burgermenu-items hidden");
            document.body.style.overflow = "auto";
        }

        setIsMenuClicked(!isMenuClicked);
    }
    return (
        <div className="container burgermenu">
            <nav>
                <div className="burgermenu-icon" onClick={updateMenu}>
                    <div className={burgermenuBarClass}></div>
                    <div className={burgermenuBarClass}></div>
                    <div className={burgermenuBarClass}></div>
                </div>

                <div className={burgermenuItemsClass}>
                    <Navigation />
                </div>
            </nav>
        </div>
    );
}
