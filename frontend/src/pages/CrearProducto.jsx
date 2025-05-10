import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";

/**
 * Estructura de los datos del formulario de creación de producto.
 * @typedef {Object} ProductFormData
 * @property {string} nombre_es            - Nombre del producto en español.
 * @property {string} nombre_ca            - Nombre del producto en catalán.
 * @property {string} nombre_en            - Nombre del producto en inglés.
 * @property {string} descripcion_es       - Descripción en español.
 * @property {string} descripcion_ca       - Descripción en catalán.
 * @property {string} descripcion_en       - Descripción en inglés.
 * @property {string} ingredientes_es      - Ingredientes en español.
 * @property {string} ingredientes_ca      - Ingredientes en catalán.
 * @property {string} ingredientes_en      - Ingredientes en inglés.
 * @property {string|number} precio        - Precio del producto en euros.
 * @property {string} categoria            - Nombre de la categoría seleccionada.
 * @property {File|null} imagen            - Archivo de imagen seleccionado.
 * @property {boolean} recomendada         - Indica si el producto es recomendado.
 */

/**
 * Estructura de los datos listos para enviar al backend.
 * @typedef {Object} NewProductData
 * @property {string} nombre_es
 * @property {string} nombre_ca
 * @property {string} nombre_en
 * @property {string} descripcion_es
 * @property {string} descripcion_ca
 * @property {string} descripcion_en
 * @property {string} ingredientes_es
 * @property {string} ingredientes_ca
 * @property {string} ingredientes_en
 * @property {string|number} precio
 * @property {string} categoria
 * @property {boolean} recomendada
 * @property {string} imagen               - Ruta retornada por el servidor.
 * @property {number|null} categoria_id    - ID numérico de la categoría mapeada.
 */

/**
 * Componente que renderiza un formulario para crear un nuevo producto.
 * Permite subir una imagen, completar datos multilenguaje y enviar al backend.
 *
 * @component
 * @returns {JSX.Element}
 */
function CrearProducto() {
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState(
    /** @type {ProductFormData} */ ({
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
      categoria: "",
      imagen: null,
      recomendada: false,
    })
  );

  /**
   * Actualiza el estado del formulario al cambiar un campo.
   *
   * @param {Event} e - Evento de cambio de campo del formulario.
   */
  const handleChange = (e) => {
    const target = /** @type {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} */ (e.target);
    const { name, type, checked, files, value } = target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /**
   * Gestiona el envío del formulario:
   * 1. Sube la imagen y obtiene su ruta.
   * 2. Mapea la categoría a ID.
   * 3. Envía el producto completo al backend.
   * 4. Limpia el formulario al éxito.
   *
   * @param {Event} e - Evento de submit del formulario.
   * @async
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imagen) {
      console.error("No hay imagen seleccionada");
      return;
    }
    try {
      const rutaImagen = await subirImagen(formData.imagen);
      const dataToSend = /** @type {NewProductData} */ ({
        ...formData,
        imagen: rutaImagen,
        categoria_id: mapearCateg(formData.categoria),
      });
      await crearProducto(dataToSend);
      // Limpiar formulario
      setFormData({
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
        categoria: "",
        imagen: null,
        recomendada: false,
      });
    } catch (err) {
      console.error("Error al crear producto:", err);
    }
  };

  /**
   * Sube un archivo de imagen al servidor y devuelve su ruta pública.
   *
   * @param {File} imagen - Archivo de imagen a subir.
   * @async
   * @returns {Promise<string>} Ruta retornada por el servidor.
   * @throws {Error} Si la subida falla.
   */
  async function subirImagen(imagen) {
    const form = new FormData();
    form.append("imagen", imagen);
    const resp = await fetch(
      `http://${window.location.hostname}:8000/api/productos/subirImagen`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      }
    );
    if (!resp.ok) throw new Error("Error al subir la imagen");
    const result = await resp.json();
    return result.ruta;
  }

  /**
   * Envía los datos del producto al backend para su creación.
   *
   * @param {NewProductData} data - Datos preparados con ruta de imagen y categoría.
   * @async
   * @returns {Promise<void>}
   * @throws {Error} Si la creación falla.
   */
  async function crearProducto(data) {
    const resp = await fetch(
      `http://${window.location.hostname}:8000/api/productos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!resp.ok) throw new Error(`Error al crear el producto: ${resp.status}`);
    await resp.json();
  }

  /**
   * Mapea el nombre de categoría a su ID numérico en la base de datos.
   *
   * @param {string} categoria - Nombre legible de la categoría.
   * @returns {number|null} ID de categoría o null si no existe.
   */
  function mapearCateg(categoria) {
    switch (categoria) {
      case "Primeros": return 1;
      case "Segundos": return 2;
      case "Bebidas": return 3;
      case "Postres": return 4;
      default: return null;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#012340] text-white font-montserrat p-6">
      <h1 className="text-4xl font-bold italic text-center mb-8">
        Crear nuevo producto
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#012340]/80 shadow-lg shadow-blue-500/50 rounded-xl p-8 w-full max-w-3xl space-y-6"
      >
        {/* Campos de nombre */}
        {["es", "ca", "en"].map((lg) => (
          <input
            key={`nombre_${lg}`}
            name={`nombre_${lg}`}
            placeholder={`Nombre (${lg})`}
            value={formData[`nombre_${lg}`]}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-blue-500 rounded text-white"
            required
          />
        ))}

        {/* Campos de descripción */}
        {["es", "ca", "en"].map((lg) => (
          <textarea
            key={`descripcion_${lg}`}
            name={`descripcion_${lg}`}
            placeholder={`Descripción (${lg})`}
            value={formData[`descripcion_${lg}`]}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-blue-500 rounded text-white"
            rows={2}
            required
          />
        ))}

        {/* Campos de ingredientes */}
        {["es", "ca", "en"].map((lg) => (
          <textarea
            key={`ingredientes_${lg}`}
            name={`ingredientes_${lg}`}
            placeholder={`Ingredientes (${lg})`}
            value={formData[`ingredientes_${lg}`]}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-blue-500 rounded text-white"
            rows={2}
            required
          />
        ))}

        {/* Precio */}
        <input
          type="number"
          name="precio"
          value={formData.precio}
          placeholder="Precio (€)"
          step="0.01"
          onChange={handleChange}
          className="w-full p-3 bg-transparent border border-blue-500 rounded text-white"
          required
        />

        {/* Categoría */}
        <label htmlFor="categoria" className="text-white text-sm font-bold mb-2 block text-left">
          Categoría
        </label>
        <select
          id="categoria"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="w-full p-3 bg-transparent border border-blue-500 rounded text-white"
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="Primeros">Primeros</option>
          <option value="Segundos">Segundos</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Postres">Postres</option>
        </select>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-bold mb-2">Imagen</label>
          <input type="file" accept="image/*" name="imagen" onChange={handleChange} className="w-full p-2 bg-transparent text-white" />
        </div>

        {/* Recomendado */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="recomendada" checked={formData.recomendada} onChange={handleChange} className="w-5 h-5" />
          <label className="text-white">¿Producto recomendado?</label>
        </div>

        {/* Botón de envío */}
        <button type="submit" className="w-full bg-white text-[#012340] font-bold py-3 rounded-xl hover:scale-105 transition-transform">
          Crear producto
        </button>
      </form>
    </div>
  );
}

export default CrearProducto;
