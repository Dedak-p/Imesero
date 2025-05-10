import Item from '../components/ItemDelete.jsx';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import useApiCall from '../hooks/useApiCall';

/**
 * Representa un producto para eliminación.
 * @typedef {Object} Product
 * @property {number} id             - Identificador único del producto.
 * @property {string} imagen         - Nombre de archivo de la imagen (ruta en /storage).
 * @property {string} nombre_es      - Nombre en español.
 * @property {string} nombre_ca      - Nombre en catalán.
 * @property {string} nombre_en      - Nombre en inglés.
 * @property {string} descripcion_es - Descripción en español.
 * @property {string} descripcion_ca - Descripción en catalán.
 * @property {string} descripcion_en - Descripción en inglés.
 * @property {number} precio         - Precio del producto en euros.
 * @property {boolean} recomendada   - Indica si es producto recomendado.
 */

/**
 * Componente de página para eliminar productos.
 *
 * Obtiene la lista de productos de la API, muestra cada uno con un botón de eliminación,
 * y actualiza la lista local tras eliminar un producto con éxito.
 *
 * @component
 * @returns {JSX.Element}
 */
const EliminarProductos = () => {
  /** Lista de productos disponibles para eliminar */
  const [productos, setProductos] = useState(
    /** @type {Product[]} */ ([])
  );
  const { token } = useContext(AppContext);

  // Hook para cargar todos los productos
  const {
    data: menu,
    loading,
    error,
    refetch
  } = useApiCall(
    `${window.location.protocol}//${window.location.hostname}:8000/api/productos`
  );

  // Cuando cambia `menu`, actualiza el estado local
  useEffect(() => {
    if (menu) {
      setProductos(menu);
    }
  }, [menu]);

  /**
   * Elimina un producto haciendo DELETE a la API y, si tiene éxito,
   * remueve el producto de la lista local.
   *
   * @param {Product} producto - Producto a eliminar.
   * @returns {Promise<void>}
   */
  const eliminarProducto = async (producto) => {
    try {
      const response = await fetch(
        `http://${window.location.hostname}:8000/api/productos/${producto.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setProductos((prev) =>
          prev.filter((p) => p.id !== producto.id)
        );
      } else {
        console.error(data.message || 'Error eliminando el producto');
      }
    } catch (err) {
      console.error('Error en la petición:', err);
    }
  };

  if (loading) {
    return (
      <p className="text-white text-center mt-4">
        Cargando productos...
      </p>
    );
  }
  if (error) {
    return (
      <p className="text-red-500 text-center mt-4">
        Error al cargar los productos.
      </p>
    );
  }

  return (
    <div className="max-w mx-auto p-4 bg-[#012340]">
      <h1
        className="text-6xl lg:text-7xl font-bold text-white italic text-center mb-12
                   [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)]"
      >
        Eliminar Productos
      </h1>
      {productos.length === 0 ? (
        <p className="text-center text-gray-300">
          No hay productos disponibles para eliminar.
        </p>
      ) : (
        productos.map((producto) => (
          <div key={producto.id} className="mb-8">
            <Item
              producto={producto}
              deleteProduct={() => eliminarProducto(producto)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default EliminarProductos;
