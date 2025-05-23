import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApiCall from '../hooks/useApiCall';
import ItemModificar from '../components/ItemModificar';

/**
 * Representa un producto genérico.
 * @typedef {Object} Product
 * @property {number} id                         - Identificador único del producto.
 * @property {string} imagen                     - Nombre de archivo de la imagen.
 * @property {string} nombre_es                  - Nombre en español.
 * @property {string} nombre_ca                  - Nombre en catalán.
 * @property {string} nombre_en                  - Nombre en inglés.
 * @property {string} descripcion_es             - Descripción en español.
 * @property {string} descripcion_ca             - Descripción en catalán.
 * @property {string} descripcion_en             - Descripción en inglés.
 * @property {string} ingredientes_es            - Ingredientes en español.
 * @property {string} ingredientes_ca            - Ingredientes en catalán.
 * @property {string} ingredientes_en            - Ingredientes en inglés.
 * @property {number} precio                     - Precio en euros.
 * @property {number} categoria_id               - ID de la categoría.
 * @property {boolean} recomendada               - Indica si es recomendada.
 */

/**
 * Página para seleccionar y modificar productos existentes.
 *
 * Carga la lista de productos desde la API, muestra un indicador de carga o error,
 * y renderiza un componente `ItemModificar` para cada producto, permitiendo editarlos.
 * Si no hay productos, ofrece un botón para crear uno nuevo.
 *
 * @component
 * @returns {JSX.Element}
 */
const ModificarProducto = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState(
    /** @type {Product[]} */ ([])
  );

  // Hook para obtener todos los productos
  const {
    data: menu = [],
    loading,
    error,
    refetch
  } = useApiCall(
    `${window.location.protocol}//${window.location.hostname}:8000/api/productos`
  );

  // Cuando cambie `menu`, actualiza el estado local
  useEffect(() => {
    if (menu) {
      setProductos(menu);
    }
  }, [menu]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#012340] text-white">
        Cargando productos…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#012340] text-red-500">
        Error al cargar productos.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#012340] p-6 md:p-12 font-montserrat">
      <h1 className="text-6xl lg:text-7xl font-bold text-white italic text-center mb-12
                     [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)]">
        Selecciona el producto a modificar
      </h1>

      {productos.length === 0 ? (
        <div className="text-center space-y-4">
          <p className="text-white">
            No hay productos en el menú. Haz clic en el siguiente botón para crearlos.
          </p>
          <button
            onClick={() => navigate('/crearProducto')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Crear Producto
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl space-y-8">
          {productos.map((producto) => (
            <div key={producto.id} className="mb-8">
              <ItemModificar producto={producto} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModificarProducto;
