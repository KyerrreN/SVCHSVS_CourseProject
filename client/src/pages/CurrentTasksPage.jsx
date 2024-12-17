import Header from "../components/Header/Header";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer/Footer";
import CurrentTasks from "../components/CurrentTasks/CurrentTasks";

export default function CurrentTasksPage() {
    return (
        <>
            <BurgerMenu />
            <Header />
            <CurrentTasks />
            <Footer />
        </>
    );
}
