import { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import Item from "../components/Item";
import { AppContext } from "../context/AppContext.jsx";
import useApiCall from "../hooks/useApiCall";

const CarritoPage = () => {
  const { token } = useContext(AppContext);
  const comandaId = localStorage.getItem("comandaId");

  // Uso de useApiCall para obtener los items de la comanda
  const {
    data: items,
    loading,
    error,
    refetch
  } = useApiCall(comandaId ? `/comandas/${comandaId}/items`:null,"get",null, [comandaId] );

  const { data: comanda } = useApiCall(comandaId ? `/comandas/${comandaId}` : null, "get", null, [comandaId]);
  
  console.log(comanda)
  // Re-refresca al montar por si cambió externamente
  useEffect(() => {
    if (comandaId) refetch();
  }, [comandaId]);

  const total = items.reduce(
    (sum, it) => sum + it.cantidad * parseFloat(it.precio_unitario),
    0
  );

  return (
    <>
      <Header />
      <div className="p-4 mt-20 flex flex-col items-center">
        <SeccionTitulo titulo="Tu carrito" />

        {loading ? (
          <p>Cargando artículos…</p>
        ) : error ? (
          <p className="text-red-600">Error al cargar el carrito.</p>
        ) : items.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <div className="w-full max-w-xl">
            {items.map((it) => (
              <Item key={it.id} producto={it.producto} cantidad={it.cantidad} />
            ))}

            <div className="mt-4 flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            
          {comanda.estado_comanda_id === 1 && (
            <button
              onClick={handleConfirm}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              CONFIRMAR PEDIDO
            </button>
          )}

          {comanda.estado_comanda_id === 2 && (
            <button
              onClick={handlePay}
              className="w-full bg-green-600 text-white py-2 rounded-lg"
            >
              PAGAR
            </button>
          )}

          </div>
        )}
      </div>
    </>
  );
};

export default CarritoPage;
