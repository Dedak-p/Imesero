import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

/**
 * Representa un producto confirmado en el resumen de pedido.
 * @typedef {Object} Product
 * @property {number} id                         - Identificador único del producto.
 * @property {string} imagen                     - Ruta de la imagen del producto (almacenada en /storage).
 * @property {string} nombre_es                  - Nombre en español.
 * @property {string} nombre_ca                  - Nombre en catalán.
 * @property {string} nombre_en                  - Nombre en inglés.
 * @property {string} descripcion_es             - Descripción en español.
 * @property {string} descripcion_ca             - Descripción en catalán.
 * @property {string} descripcion_en             - Descripción en inglés.
 * @property {number} precio                     - Precio unitario en euros.
 */

/**
 * Props del componente ItemConfirmado.
 * @typedef {Object} ItemConfirmadoProps
 * @property {Product} producto                  - Objeto con los datos del producto confirmado.
 * @property {number} cantidad                   - Cantidad de unidades confirmadas de este producto.
 */

/**
 * Componente de línea de producto confirmado en la pantalla de resumen de pedido.
 *
 * Muestra la imagen, nombre, descripción, cantidad y total de un producto tras confirmar el pedido.
 *
 * @component
 * @param {ItemConfirmadoProps} props
 * @returns {JSX.Element} Elemento React que representa el producto confirmado.
 */
const ItemConfirmado = ({ producto, cantidad }) => {
  const { lang } = useContext(AppContext);

  // Claves dinámicas para nombre y descripción en el idioma seleccionado
  const nameKey = `nombre_${lang}`;
  const descKey = `descripcion_${lang}`;

  // Construye la URL de la imagen según el hostname actual
  const imageUrl = `http://${window.location.hostname}:8000/storage/${producto.imagen}`;

  return (
    <div className="flex flex-col justify-between mt-5 mb-5 w-full max-w-screen-md mx-auto border border-gray-600 rounded-lg overflow-hidden shadow-md bg-[#01344C]">
      <div className="flex flex-1">
        <div className="w-2/5 bg-gray-200 flex items-center justify-center p-2">
          <img
            src={imageUrl}
            alt={producto[nameKey]}
            className="max-w-full max-h-48 object-contain"
          />
        </div>
        <div className="w-3/5 p-4 flex flex-col text-center justify-center text-white">
          <h2 className="text-lg font-semibold mb-2">
            {producto[nameKey]}
          </h2>
          <p className="text-sm text-gray-300 mb-2">
            {producto[descKey]}
          </p>
          <p className="text-md font-bold text-white mb-1">
            {lang === 'es' && 'Cantidad'}
            {lang === 'ca' && 'Quantitat'}
            {lang === 'en' && 'Quantity'}: {cantidad}
          </p>
          <p className="text-md font-bold text-white">
            Total: {(producto.precio * cantidad).toFixed(2)} €
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemConfirmado;
