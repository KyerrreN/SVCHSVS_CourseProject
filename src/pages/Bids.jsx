import { Component } from "react";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BidsComponent from "../components/BidsComponent/BidsComponent";

export default function Bids() {
    return (
        <>
            <BurgerMenu />
            <Header />
            <BidsComponent />
            <Footer />
        </>
    );
}
