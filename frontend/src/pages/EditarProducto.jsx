import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import useApiCall from "../hooks/useApiCall";

/**
 * Representa los datos de un producto recuperado de la API.
 * @typedef {Object} ProductoData
 * @property {number}   id               - Identificador único del producto.
 * @property {string}   nombre_es        - Nombre en español.
 * @property {string}   nombre_ca        - Nombre en catalán.
 * @property {string}   nombre_en        - Nombre en inglés.
 * @property {string}   descripcion_es   - Descripción en español.
 * @property {string}   descripcion_ca   - Descripción en catalán.
 * @property {string}   descripcion_en   - Descripción en inglés.
 * @property {string}   ingredientes_es  - Ingredientes en español.
 * @property {string}   ingredientes_ca  - Ingredientes en catalán.
 * @property {string}   ingredientes_en  - Ingredientes en inglés.
 * @property {number}   precio           - Precio unitario en euros.
 * @property {number}   categoria_id     - ID numérico de la categoría.
 * @property {string}   imagen           - Nombre o ruta de la imagen.
 * @property {boolean}  recomendada      - Indica si está marcado como recomendado.
 */

/**
 * Estado interno del formulario de edición.
 * @typedef {Object} EditFormState
 * @property {string}  nombre_es
 * @property {string}  nombre_ca
 * @property {string}  nombre_en
 * @property {string}  descripcion_es
 * @property {string}  descripcion_ca
 * @property {string}  descripcion_en
 * @property {string}  ingredientes_es
 * @property {string}  ingredientes_ca
 * @property {string}  ingredientes_en
 * @property {string|number} precio
 * @property {string|number} categoria_id
 * @property {string}  imagen
 * @property {boolean} recomendada
 */

/**
 * Componente para editar un producto existente.
 *
 * Obtiene los datos del producto por ID, los carga en un formulario,
 * permite modificar campos y enviar los cambios con una petición PUT.
 *
 * @component
 * @returns {JSX.Element}
 */
const EditarProducto = () => {
  const { id: productoId } = useParams();
  const navigate = useNavigate();
  const { lang, token } = useContext(AppContext);

  /** @type {EditFormState} */
  const [form, setForm] = useState({
    nombre_es: "",
    nombre_ca: "",
    nombre_en: "",
    descripcion_es: "",
    descripcion_ca: "",
    descripcion_en: "",
    ingredientes_es: "",
    ingredientes_ca: "",
    ingredientes_en: "",
    precio: "",
    categoria_id: "",
    imagen: "",
    recomendada: false,
  });

  // Hook para obtener el producto por ID
  const { data: productoArray, loading, error, refetch } = useApiCall(
    `${window.location.protocol}//${window.location.hostname}:8000/api/productos/${productoId}`
  );

  // Al cargar los datos, inicializa el formulario
  useEffect(() => {
    if (Array.isArray(productoArray) && productoArray.length > 0) {
      /** @type {ProductoData} */
      const data = productoArray[0];
      setForm({
        nombre_es: data.nombre_es,
        nombre_ca: data.nombre_ca,
        nombre_en: data.nombre_en,
        descripcion_es: data.descripcion_es,
        descripcion_ca: data.descripcion_ca,
        descripcion_en: data.descripcion_en,
        ingredientes_es: data.ingredientes_es || "",
        ingredientes_ca: data.ingredientes_ca || "",
        ingredientes_en: data.ingredientes_en || "",
        precio: data.precio,
        categoria_id: data.categoria_id,
        imagen: data.imagen,
        recomendada: data.recomendada,
      });
    }
  }, [productoArray]);

  /**
   * Actualiza el estado del formulario al cambiar un campo.
   *
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>} e
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * Envía la petición PUT para actualizar el producto en el servidor.
   *
   * @param {string} id       - ID del producto a actualizar.
   * @param {EditFormState} formState - Datos del formulario.
   * @param {string} token    - Token de autenticación JWT.
   * @returns {Promise<void>}
   * @throws {Error} Si la petición falla.
   */
  const actualizarProducto = async (id, formState, token) => {
    const response = await fetch(
      `http://${window.location.hostname}:8000/api/productos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formState),
      }
    );
    if (!response.ok) {
      throw new Error(`Error al modificar el producto: ${response.status}`);
    }
  };

  /**
   * Maneja el envío del formulario de edición.
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarProducto(productoId, form, token);
      navigate("/modificarProducto");
    } catch {
      alert("No se pudo actualizar el producto");
    }
  };

  if (loading) {
    return <p className="text-white text-center mt-8">Cargando datos…</p>;
  }
  if (error) {
    return (
      <p className="text-red-500 text-center mt-8">
        Error al cargar el producto.{" "}
        <button onClick={refetch} className="underline">
          Reintentar
        </button>
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#012340] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-2xl p-8 space-y-6 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center">
          Editar Producto #{productoId}
        </h1>

        {["es", "ca", "en"].map((l) => (
          <input
            key={`nombre_${l}`}
            name={`nombre_${l}`}
            value={form[`nombre_${l}`]}
            onChange={handleChange}
            placeholder={`Nombre (${l})`}
            className="w-full p-3 border rounded"
            required
          />
        ))}

        {["es", "ca", "en"].map((l) => (
          <textarea
            key={`descripcion_${l}`}
            name={`descripcion_${l}`}
            value={form[`descripcion_${l}`]}
            onChange={handleChange}
            placeholder={`Descripción (${l})`}
            className="w-full p-3 border rounded"
            rows={2}
            required
          />
        ))}

        {["es", "ca", "en"].map((l) => (
          <textarea
            key={`ingredientes_${l}`}
            name={`ingredientes_${l}`}
            value={form[`ingredientes_${l}`]}
            onChange={handleChange}
            placeholder={`Ingredientes (${l})`}
            className="w-full p-3 border rounded"
            rows={2}
          />
        ))}

        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio (€)"
          step="0.01"
          className="w-full p-3 border rounded"
          required
        />

        <select
          name="categoria_id"
          value={form.categoria_id}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Selecciona categoría</option>
          <option value={1}>Primeros</option>
          <option value={2}>Segundos</option>
          <option value={3}>Bebidas</option>
          <option value={4}>Postres</option>
        </select>

        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="recomendada"
            checked={form.recomendada}
            onChange={handleChange}
            className="mr-2"
          />
          Recomendada
        </label>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarProducto;
