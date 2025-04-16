import { useEffect, useState } from "react";
import Header from "../components/Header";
import Axios from "axios";
import SeccionTitulo from "../components/SeccionTitulo";
import Item from "../components/Item";
import ItemCarrito from "../components/ItemCarrito";


const CarritoPage = () => {


    const [carrito, setCarrito] = useState([]);

    useEffect(() => {

        const fetchCarrito = async () => {
            const comandaId = localStorage.getItem("comandaId");
            if (!comandaId) {
                console.error("No hay una comanda activa.");
                return;
            }

            try {
                // Solicitar los productos asociados a la comanda
                const response = await Axios.get(`http://localhost:8000/api/comandas/${comandaId}/productos`);
                setCarrito(response.data); // Actualizar el estado con los productos
            } catch (error) {
                console.error("Error al obtener los productos del carrito:", error);
            }
        };

        fetchCarrito();
    }, []);

    return (
        <>
            <Header />
            <div className="p-4 mt-25 flex-col justify-content align-items-center text-center">
                <SeccionTitulo titulo="Este es tu carrito" />

                {/* Mostrar los productos en el carrito */}
                <div className="mt-4">
                    {carrito.length > 0 ? (
                        carrito.map((item, index) => (
                            <ItemCarrito key={index} producto={item} />
                        ))
                    ) : (
                        <p>No hay productos en el carrito.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default CarritoPage;