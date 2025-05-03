import React, { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import useApiCall from "../hooks/useApiCall";

const ItemCarrito = ({ productoId, cantidad, estado, pagada, onAdd, onRemove }) => {
  const { lang } = useContext(AppContext);

  const {
    data: productoArr,
    loading,
    error,
    refetch
  } = useApiCall(`http://${window.location.hostname}:8000/api/productos/${productoId}`, "get", null, [productoId]);

  const producto = productoArr[0];

  if (error) {
    return <div className="p-4 text-center text-red-400">Error al cargar producto</div>;
  }

  return (
    <div className="flex flex-col justify-between mt-5 mb-5 w-full max-w-screen-md mx-auto border border-gray-600 rounded-lg overflow-hidden shadow-md bg-[#01344C]">
      {loading ? (
        <div className="p-4 text-center text-white">
          Cargando producto…
        </div>
      ) : !producto ? (
        <div className="p-4 text-center text-white">
          Producto no encontrado{" "}
          <button onClick={refetch} className="underline">
            Reintentar
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-1">
            <div className="w-2/5 bg-gray-200 flex items-center justify-center">
              <img
                src={`http://${window.location.hostname}:8000/storage/${producto.imagen}`}
                alt={producto[`nombre_${lang}`]}
                className="max-w-full max-h-full"
              />
            </div>
            <div className="w-3/5 p-2 flex flex-col text-center justify-center text-white">
              <h2 className="text-lg font-semibold mb-2">
                {producto[`nombre_${lang}`]}
              </h2>
              <p className="text-sm text-gray-300 mb-2">
                {producto[`descripcion_${lang}`]}
              </p>
              <p className="text-md font-bold text-white">
                {(producto.precio * cantidad).toFixed(2)} €
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between w-full py-2 px-4 border-t border-gray-600">
            <button
              onClick={() => onRemove(productoId)}
              className="bg-gray-700 text-white px-2 py-1 rounded transition-transform duration-300 hover:scale-110"
            >
              −
            </button>
            <span className="text-lg font-bold text-white">{cantidad}</span>
            <button
              onClick={() => onAdd(productoId)}
              className="bg-gray-700 text-white px-2 py-1 rounded transition-transform duration-300 hover:scale-110"
            >
              +
            </button>
          </div>
        </>
      )}
    </div>
);

};

export default ItemCarrito;
