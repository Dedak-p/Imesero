import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import ItemConfirmado from "../components/ItemConfirmado";
import { AppContext } from "../context/AppContext";

const PagarPage = () => {
    const { mesaId } = useContext(AppContext);
    const [itemsConfirmados, setItemsConfirmados] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!mesaId) {
            setError("No se ha asignado un ID de mesa.");
            return;
        }

        const fetchComandaAndItems = async () => {
            try {
                const mesaResponse = await fetch(`http://${window.location.hostname}:8000/api/mesas/${mesaId}`);
                if (!mesaResponse.ok) throw new Error("No se pudo obtener la mesa");
                const mesaData = await mesaResponse.json();

                if (!mesaData.comanda?.id) {
                    setError("La mesa no tiene una comanda asociada");
                    return;
                }

                const comandaId = mesaData.comanda.id;

                const itemsResponse = await fetch(`http://${window.location.hostname}:8000/api/comandas/${comandaId}/items`);
                if (!itemsResponse.ok) throw new Error("No se pudieron obtener los ítems de la comanda");
                const itemsData = await itemsResponse.json();

                // Filtrar solo los items confirmados (estado_item_id === 2)
                const itemsConfirmados = itemsData.filter((item) => item.estado_item_id === 2);

                // Agrupar productos repetidos
                const itemsAgrupados = itemsConfirmados.reduce((acc, item) => {
                    const existente = acc.find(i => i.producto.id === item.producto.id);
                    if (existente) {
                        existente.cantidad += item.cantidad;
                    } else {
                        acc.push({ ...item });
                    }
                    return acc;
                }, []);

                setItemsConfirmados(itemsAgrupados);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchComandaAndItems();
    }, [mesaId]);

    const calcularTotal = () =>
        itemsConfirmados.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);

    if (error) {
        return (
            <div className="text-center text-red-500 mt-10">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen p-4 mt-24 text-white bg-[#012340] text-center">
                <SeccionTitulo titulo="Resumen de tu Comanda Confirmada" />

                <div className="mt-6">
                    {itemsConfirmados.length > 0 ? (
                        itemsConfirmados.map((item) => (
                            <ItemConfirmado
                                key={item.id}
                                producto={item.producto}
                                cantidad={item.cantidad}
                            />
                        ))
                    ) : (
                        <p>No hay ítems confirmados aún.</p>
                    )}
                </div>

                <SeccionTitulo titulo={`Total a pagar: ${calcularTotal().toFixed(2)} €`} />

                <button
                    onClick={() => navigate("/pago")}
                    className="mt-8 bg-white text-[#7646e5] border border-[#7646e5] font-bold py-4 rounded-xl transition-transform duration-300 hover:scale-110 px-10"
                >
                    Proceder al Pago
                </button>
            </div>
        </>
    );
};

export default PagarPage;
