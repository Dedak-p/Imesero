import { BrowserRouter, Routes, Route } from "react-router-dom";
import EntradaQRPage from "../pages/EntradaQR";
import MenuPage from "../pages/Menu";
import ItemSelectedPage from "../pages/ItemSelected";
import CarritoPage from "../pages/Carrito";
import SeguimientoPage from "../pages/Seguimiento";
import NotFoundPage from "../pages/NotFoundPage";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EntradaQRPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/item" element={<ItemSelectedPage />} />
                <Route path="/carrito" element={<CarritoPage />} />
                <Route path="/seguimiento" element={<SeguimientoPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
