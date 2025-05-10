import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import Item from "../components/Item";
import useApiCall from "../hooks/useApiCall";
import { AppContext } from "../context/AppContext.jsx";

/**
 * Representa un producto del menú.
 * @typedef {Object} MenuItem
 * @property {number} id                - Identificador único del producto.
 * @property {string} nombre_es         - Nombre en español.
 * @property {string} nombre_ca         - Nombre en catalán.
 * @property {string} nombre_en         - Nombre en inglés.
 * @property {string} descripcion_es    - Descripción en español.
 * @property {string} descripcion_ca    - Descripción en catalán.
 * @property {string} descripcion_en    - Descripción en inglés.
 * @property {number} precio            - Precio unitario en euros.
 * @property {number} categoria_id      - ID de la categoría (1=Primeros, 2=Segundos, 3=Bebidas, 4=Postres).
 * @property {string} imagen            - Nombre de archivo de la imagen.
 */

/**
 * Textos localizados para las secciones del menú.
 * @typedef {Object} MenuTexts
 * @property {Object.<string,string>} recomendacion - Título de recomendación de la casa.
 * @property {Object.<string,string>} primeros      - Título de la sección de primeros.
 * @property {Object.<string,string>} segundos      - Título de la sección de segundos.
 * @property {Object.<string,string>} postres       - Título de la sección de postres.
 * @property {Object.<string,string>} bebidas       - Título de la sección de bebidas.
 */

/**
 * Página de menú que muestra los productos filtrados por categoría.
 *
 * - Al montar, registra la mesa activa en el contexto con `setMesaId`.
 * - Carga todos los productos via `useApiCall`.
 * - Al añadir un producto, además de hacer la llamada, invoca `bumpCart()`
 *   para notificar al dropdown del carrito que debe refrescarse.
 *
 * @component
 * @returns {JSX.Element}
 */
const MenuPage = () => {
  const { lang, setMesaId, bumpCart } = useContext(AppContext);
  const { mesaId: mesaObtenida } = useParams();

  /**
   * Textos localizados usados en la página de menú.
   * @type {MenuTexts}
   */
  const textos = {
    recomendacion: {
      es: "Recomendación de la casa",
      en: "Chef's recommendation",
      ca: "Recomanació de la casa",
    },
    primeros: {
      es: "Primeros",
      en: "Starters",
      ca: "Primers",
    },
    segundos: {
      es: "Segundos",
      en: "Main courses",
      ca: "Segons",
    },
    postres: {
      es: "Postres",
      en: "Desserts",
      ca: "Postres",
    },
    bebidas: {
      es: "Bebidas",
      en: "Drinks",
      ca: "Begudes",
    },
  };

  /**
   * Registra la mesa seleccionada en el contexto global.
   * @note Este efecto se ejecuta una sola vez al montar o si cambia la ruta.
   */
  useEffect(() => {
    if (mesaObtenida) {
      setMesaId(Number(mesaObtenida));
    }
  }, [mesaObtenida, setMesaId]);

  // Llamada a la API para obtener todos los productos
  const {
    data: menu = [],
    loading,
    error,
    refetch,
  } = useApiCall(
    `${window.location.protocol}//${window.location.hostname}:8000/api/productos`
  );

  /**
   * Añade un producto al carrito (comanda).
   *
   * - Determina si el usuario está autenticado por la existencia de `token`.
   * - Elige el endpoint correspondiente.
   * - Tras el POST exitoso, invoca `bumpCart()` para que el dropdown del carrito
   *   sepa que debe volver a cargar sus datos.
   *
   * @param {MenuItem} producto - Producto a añadir al carrito.
   * @returns {Promise<void>}
   */
  const handleAddToCart = async (producto) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const endpoint = token
        ? `/api/mesas/${mesaObtenida}/itemsAuth`
        : `/api/mesas/${mesaObtenida}/items`;
      const url = `${window.location.protocol}//${window.location.hostname}:8000${endpoint}`;

      await Axios.post(
        url,
        { producto_id: producto.id, cantidad: 1 },
        { withCredentials: true, headers }
      );

      // **NUEVO**: Notificar al carrito para que se actualice
      bumpCart();
    } catch (err) {
      console.error(
        "Error al añadir producto:",
        err.response?.data || err.message
      );
    }
  };

  if (loading) {
    return <p className="text-white text-center mt-4">Cargando menú…</p>;
  }

  if (error) {
    return (
      <p className="text-red-500 text-center mt-4">
        Error al cargar el menú.{" "}
        <button onClick={refetch} className="underline">
          Reintentar
        </button>
      </p>
    );
  }

  return (
    <>
      <Header />
      <div className="p-4 mt-1 flex flex-col items-center">
        <SeccionTitulo titulo={textos.recomendacion[lang]} />
        {menu
          .filter((item) => item.recomendada)
          .map((item) => (
            <Item
              key={item.id}
              producto={item}
              onAddToCart={handleAddToCart}
            />
          ))}

        {/* Sección de primeros */}
        <SeccionTitulo titulo={textos.primeros[lang]} slug="primeros" />
        {menu
          .filter((item) => item.categoria_id === 1)
          .map((item) => (
            <Item
              key={item.id}
              producto={item}
              onAddToCart={handleAddToCart}
            />
          ))}

        {/* Sección de segundos */}
        <SeccionTitulo titulo={textos.segundos[lang]} slug="segundos" />
        {menu
          .filter((item) => item.categoria_id === 2)
          .map((item) => (
            <Item
              key={item.id}
              producto={item}
              onAddToCart={handleAddToCart}
            />
          ))}

        {/* Sección de postres */}
        <SeccionTitulo titulo={textos.postres[lang]} slug="postres" />
        {menu
          .filter((item) => item.categoria_id === 4)
          .map((item) => (
            <Item
              key={item.id}
              producto={item}
              onAddToCart={handleAddToCart}
            />
          ))}

        {/* Sección de bebidas */}
        <SeccionTitulo titulo={textos.bebidas[lang]} slug="bebidas" />
        {menu
          .filter((item) => item.categoria_id === 3)
          .map((item) => (
            <Item
              key={item.id}
              producto={item}
              onAddToCart={handleAddToCart}
            />
          ))}
      </div>
    </>
  );
};

export default MenuPage;
