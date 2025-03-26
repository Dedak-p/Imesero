import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Menu from "../pages/Menu";
import Item from "../pages/Item";
import Carrito from "../pages/Carrito";
import Seguimiento from "../pages/Seguimiento";
import AboutPage from "../pages/AboutPage";
import NotFoundPage from "../pages/NotFoundPage";
import Navbar from "../components/Navbar";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/item" element={<Item />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/seguimiento" element={<Seguimiento />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
