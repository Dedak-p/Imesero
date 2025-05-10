import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import useApiCall from "../hooks/useApiCall";

/**
 * Representa un producto obtenido de la API.
 * @typedef {Object} Product
 * @property {number} id               - Identificador único del producto.
 * @property {string} imagen           - Nombre de archivo de la imagen (almacenada en /storage).
 * @property {string} nombre_es        - Nombre en español.
 * @property {string} nombre_ca        - Nombre en catalán.
 * @property {string} nombre_en        - Nombre en inglés.
 * @property {string} descripcion_es   - Descripción en español.
 * @property {string} descripcion_ca   - Descripción en catalán.
 * @property {string} descripcion_en   - Descripción en inglés.
 * @property {number} precio           - Precio unitario en euros.
 */

/**
 * Props del componente ItemCarrito.
 * @typedef {Object} ItemCarritoProps
 * @property {number} productoId                - ID del producto en el carrito.
 * @property {number} cantidad                  - Cantidad de unidades en el carrito.
 * @property {string} [estado]                  - Estado actual del pedido (no usado directamente aquí).
 * @property {boolean} [pagada]                 - Indica si la orden está pagada (no usado directamente aquí).
 * @property {function(number):void} onAdd      - Callback para aumentar la cantidad de este producto.
 * @property {function(number):void} onRemove   - Callback para disminuir la cantidad de este producto.
 */

/**
 * Componente de línea de pedido en el carrito.
 *
 * Muestra la información del producto (imagen, nombre, descripción y precio total según la cantidad),
 * controles para incrementar o decrementar la cantidad, y gestiona el estado de carga/errores
 * al obtener los datos desde la API.
 *
 * @component
 * @param {ItemCarritoProps} props
 * @returns {JSX.Element}
 */
const ItemCarrito = ({ productoId, cantidad, estado, pagada, onAdd, onRemove }) => {
  const { lang } = useContext(AppContext);

  // Hook para obtener los datos del producto; siempre devuelve un array (normalizado).
  const {
    data: productoArr,
    loading,
    error,
    refetch
  } = useApiCall(
    `http://${window.location.hostname}:8000/api/productos/${productoId}`,
    "get",
    null,
    [productoId]
  );

  // Como useApiCall normaliza a array, tomamos el primer elemento.
  const producto = productoArr[0];

  if (error) {
    return (
      <div className="p-4 text-center text-red-400">
        Error al cargar producto
      </div>
    );
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
