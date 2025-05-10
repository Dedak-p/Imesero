import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

/**
 * Representa un producto genérico.
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
 * Props del componente Item de administración de productos.
 * @typedef {Object} ItemProps
 * @property {Product} producto                  - Objeto con los datos del producto a mostrar.
 * @property {function(Product):void} deleteProduct - Callback que se invoca al eliminar el producto.
 */

/**
 * Tarjeta de producto para administración, con botón de eliminación.
 *
 * Muestra la imagen, nombre y descripción en el idioma seleccionado,
 * el precio y un botón para eliminar el producto.
 *
 * @component
 * @param {ItemProps} props
 * @returns {JSX.Element}
 */
const Item = ({ producto, deleteProduct }) => {
  const { lang } = useContext(AppContext);

  // Claves dinámicas para nombre y descripción según el idioma
  const nameKey = `nombre_${lang}`;
  const descKey = `descripcion_${lang}`;

  // URL completa de la imagen (hostname dinámico)
  const imageUrl = `http://${window.location.hostname}:8000/storage/${producto.imagen}`;

  // Texto del botón según idioma
  const deleteLabel =
    lang === 'ca'
      ? 'Eliminar el producte'
      : lang === 'en'
      ? 'Delete item'
      : 'Eliminar el producto';

  return (
    <div className="flex flex-col justify-between mt-6 mb-6 w-full max-w-screen-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="flex flex-1">
        <div className="w-2/5 bg-gray-100 flex items-center justify-center p-4">
          <img
            src={imageUrl}
            alt={producto[nameKey]}
            className="max-w-full max-h-48 object-contain rounded"
          />
        </div>
        <div className="w-3/5 p-6 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            {producto[nameKey]}
          </h2>
          <p className="text-base text-gray-600 mb-4">
            {producto[descKey]}
          </p>
          <p className="text-lg font-bold text-gray-900">
            {producto.precio} €
          </p>
        </div>
      </div>
      <button
        onClick={() => deleteProduct(producto)}
        className="w-full py-3 bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-200"
      >
        {deleteLabel}
      </button>
    </div>
  );
};

export default Item;
