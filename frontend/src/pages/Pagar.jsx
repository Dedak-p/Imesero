import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import ItemConfirmado from "../components/ItemConfirmado";
import { AppContext } from "../context/AppContext";

const PagarPage = () => {
    const { lang } = useContext(AppContext);
    const { mesaId } = useContext(AppContext);
    const { setStatusComand } = useContext(AppContext);
    const [itemsConfirmados, setItemsConfirmados] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

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


    //Función que maneja la confirmación de pedidos 
    const pagarComanda = async () => {

        try {

            // TODO: Cambiar el endpoint a uno que maneje el pago
            const mesaResponse = await fetch(`http://${window.location.hostname}:8000/api/mesas/${mesaId}`);
            if (!mesaResponse.ok) throw new Error("No se pudo obtener la mesa");
            const mesaData = await mesaResponse.json();

            if (!mesaData.comanda?.id) {
                setError("La mesa no tiene una comanda asociada");
                return;
            }

            const comandaId = mesaData.comanda.id;



            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };

            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const pagoResponse = await fetch(`http://${window.location.hostname}:8000/api/comandas/${comandaId}`, {
                method: "PUT",
                headers,
                body: JSON.stringify({
                    estado_comanda_id: 5 // FIXME: No se porque si se pone 4 "pagado", la comanda se desliga de la mesa.
                }),
            });

            const respuestaJson = await pagoResponse.json();

            console.log("Pago confirmada", respuestaJson);

            setStatusComand(respuestaJson.estado_comanda_id);

        } catch (error) {
            console.error("Error al pagar la comanda:", error);
        }
    };
    const textos = {
        resumen :{
            es: "Resumen de tu Comanda Confirmada",
            en: "Sumary of your Confirmer Ordre",
            ca: "Resum de la teva Comanda Confirmada"
        },
        pagar :{
            es: "Total a pagar",
            en: "Total to pay",
            ca: "Total a pagar"
        },

        proceder:{
            es: "Proceder al pago",
            en: "Proceed to Payment",
            ca: "Procedir al pagament"

        }

    }
    return (
        <>
            <Header />
            <div className="min-h-screen p-4 mt-24 text-white bg-[#012340]  text-center">
                <SeccionTitulo titulo={textos.resumen[lang]} />

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

                <SeccionTitulo titulo={`${textos.pagar[lang]}:    ${calcularTotal().toFixed(2)} €`} />

                <button

                    onClick={async () => {
                        await pagarComanda();
                        navigate("/pagar");
                    }}
                    className="mt-8 bg-white text-[#7646e5] border border-[#7646e5] font-bold py-4 rounded-xl transition-transform duration-300 hover:scale-110 px-10"
                >
                    {textos.proceder[lang]}
                </button>
            </div>
        </>
    );
};

export default PagarPage;
