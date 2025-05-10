import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

/**
 * Representa un producto genérico.
 * @typedef {Object} Product
 * @property {number} id                         - Identificador único del producto.
 * @property {string} imagen                     - Nombre de archivo de la imagen (almacenada en /storage).
 * @property {string} nombre_es                  - Nombre en español.
 * @property {string} nombre_ca                  - Nombre en catalán.
 * @property {string} nombre_en                  - Nombre en inglés.
 * @property {string} descripcion_es             - Descripción en español.
 * @property {string} descripcion_ca             - Descripción en catalán.
 * @property {string} descripcion_en             - Descripción en inglés.
 * @property {number} precio                     - Precio unitario en euros.
 */

/**
 * Props del componente ItemModificar.
 * @typedef {Object} ItemModificarProps
 * @property {Product} producto                  - Objeto con los datos del producto a modificar.
 */

/**
 * Componente tarjeta de producto con opción de navegación a la página de modificación.
 *
 * Muestra la imagen, nombre, descripción y precio de un producto,
 * y un botón que redirige a la ruta de edición correspondiente.
 *
 * @component
 * @param {ItemModificarProps} props
 * @returns {JSX.Element} Elemento React que representa la tarjeta modificable.
 */
const ItemModificar = ({ producto }) => {
  const navigate = useNavigate();
  const { lang } = useContext(AppContext);

  /**
   * Mapas de texto para el botón según el idioma seleccionado.
   * @type {{ca: string, es: string, en: string}}
   */
  const textos = {
    ca: "Modificar producte",
    es: "Modificar producto",
    en: "Update item",
  };

  // Claves dinámicas para nombre y descripción en el idioma actual
  const nameKey = `nombre_${lang}`;
  const descKey = `descripcion_${lang}`;

  // Construye la URL de la imagen según el hostname actual
  const imageUrl = `http://${window.location.hostname}:8000/storage/${producto.imagen}`;

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
        onClick={() => navigate(`/modificarProducto/${producto.id}`)}
        className="w-full py-3 bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition-colors duration-200"
      >
        {textos[lang]}
      </button>
    </div>
  );
};

export default ItemModificar;
