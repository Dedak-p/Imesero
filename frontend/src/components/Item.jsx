import { useContext } from "react";
import { AppContext } from "../context/AppContext";

/**
 * Representa un producto en la vista de lista de productos.
 * @typedef {Object} Product
 * @property {number} id               - Identificador único del producto.
 * @property {string} imagen           - Ruta de la imagen del producto (relativa a /storage).
 * @property {string} nombre_es        - Nombre del producto en español.
 * @property {string} nombre_ca        - Nombre del producto en catalán.
 * @property {string} nombre_en        - Nombre del producto en inglés.
 * @property {string} descripcion_es   - Descripción en español.
 * @property {string} descripcion_ca   - Descripción en catalán.
 * @property {string} descripcion_en   - Descripción en inglés.
 * @property {number} precio           - Precio del producto en euros.
 */

/**
 * Componente de tarjeta de producto.
 *
 * Muestra la imagen, nombre y descripción en el idioma seleccionado,
 * así como el precio y un botón para añadir el producto al carrito.
 *
 * @component
 * @param {Object} props
 * @param {Product} props.producto                  - Objeto con los datos del producto.
 * @param {function(Product):void} props.onAddToCart - Función que se llama al añadir al carrito.
 * @returns {JSX.Element} Elemento React que representa la tarjeta del producto.
 */
const Item = ({ producto, onAddToCart }) => {
  const { lang } = useContext(AppContext);

  // Construye la URL completa de la imagen según el hostname actual
  const imageUrl = `http://${window.location.hostname}:8000/storage/${producto.imagen}`;

  // Selecciona el nombre y la descripción según el idioma actual
  const nameKey = `nombre_${lang}`;
  const descKey = `descripcion_${lang}`;

  return (
    <div className="flex flex-col justify-between mt-5 mb-5 w-full max-w-screen-md mx-auto min-h-72 border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <div className="flex flex-1">
        <div className="w-2/5 bg-gray-200 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={producto[nameKey]}
            className="max-w-full max-h-full"
          />
        </div>
        <div className="w-3/5 p-2 flex flex-col text-center justify-center">
          <h2 className="text-lg font-semibold mb-2">
            {producto[nameKey]}
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            {producto[descKey]}
          </p>
          <p className="text-md font-bold text-black">
            {producto.precio} €
          </p>
        </div>
      </div>
      <button
        onClick={() => onAddToCart(producto)}
        className="w-full py-2 bg-blue-700 text-white border-t border-gray-300 hover:bg-blue-600 transition-colors cursor-pointer"
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default Item;
