import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import ClientBids from "../components/ClientBids/ClientBids";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function ClientBidsPage() {
    return (
        <>
            <BurgerMenu />
            <Header />
            <ClientBids />
            <Footer />
        </>
    );
}
