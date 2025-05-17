import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import ItemConfirmado from "../components/ItemConfirmado";
import { AppContext } from "../context/AppContext";

/**
 * Resumen de un producto para el pago.
 * @typedef {Object} ProductSummary
 * @property {number} id                - Identificador único del producto.
 * @property {number} precio            - Precio unitario en euros.
 * @property {number} [precio_unitario] - Precio unitario (repetido, opcional).
 * @property {string} [imagen]          - Nombre o ruta de la imagen.
 * @property {string} [nombre_es]       - Nombre en español.
 * @property {string} [nombre_ca]       - Nombre en catalán.
 * @property {string} [nombre_en]       - Nombre en inglés.
 */

/**
 * Ítem confirmado de una comanda.
 * @typedef {Object} ConfirmedItem
 * @property {number}         id               - Identificador del ítem.
 * @property {ProductSummary} producto         - Datos resumidos del producto.
 * @property {number}         cantidad         - Cantidad confirmada.
 * @property {number}         estado_item_id   - Estado interno del ítem (2 = confirmado).
 */

/**
 * Página de pago que muestra los ítems confirmados y permite proceder al pago.
 *
 * Carga desde la API los ítems confirmados de la comanda de la mesa,
 * agrupa ítems duplicados, calcula el total y envía la actualización de estado
 * de la comanda al servidor.
 *
 * @component
 * @returns {JSX.Element}
 */
const PagarPage = () => {
  const { lang, mesaId, setStatusComand } = useContext(AppContext);
  /** @type {ConfirmedItem[]} */
  const [itemsConfirmados, setItemsConfirmados] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Carga y agrupa ítems confirmados al montar o cambiar mesaId
  useEffect(() => {
    if (!mesaId) {
      setError("No se ha asignado un ID de mesa.");
      return;
    }

    /**
     * Obtiene la comanda y sus ítems, filtra los confirmados (estado_item_id === 2),
     * y agrupa productos repetidos sumando cantidades.
     *
     * @async
     * @returns {Promise<void>}
     */
    const fetchComandaAndItems = async () => {
      try {
        const mesaResp = await fetch(
          `http://${window.location.hostname}:8000/api/mesas/${mesaId}`
        );
        if (!mesaResp.ok) throw new Error("No se pudo obtener la mesa");
        const mesaData = await mesaResp.json();

        const comandaId = mesaData.comanda?.id;
        if (!comandaId) {
          setError("La mesa no tiene una comanda asociada");
          return;
        }

        const itemsResp = await fetch(
          `http://${window.location.hostname}:8000/api/comandas/${comandaId}/items`
        );
        if (!itemsResp.ok)
          throw new Error("No se pudieron obtener los ítems de la comanda");
        const itemsData = await itemsResp.json();

        const confirmed = itemsData.filter((item) => item.estado_item_id === 2);
        const agrupados = confirmed.reduce((acc, item) => {
          const existe = acc.find((i) => i.producto.id === item.producto.id);
          if (existe) {
            existe.cantidad += item.cantidad;
          } else {
            acc.push({ ...item });
          }
          return acc;
        }, []);
        setItemsConfirmados(agrupados);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchComandaAndItems();
  }, [mesaId]);

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>{error}</p>
      </div>
    );
  }

  /**
   * Calcula el total sumando precio × cantidad de cada ítem.
   * @returns {number}
   */
  const calcularTotal = () =>
    itemsConfirmados.reduce(
      (sum, item) => sum + item.producto.precio * item.cantidad,
      0
    );

  /**
   * Envía la petición PUT para actualizar el estado de la comanda a "pagada".
   *
   * @async
   * @returns {Promise<void>}
   */
  const pagarComanda = async () => {
    try {
      const mesaResp = await fetch(
        `http://${window.location.hostname}:8000/api/mesas/${mesaId}`
      );
      if (!mesaResp.ok) throw new Error("No se pudo obtener la mesa");
      const mesaData = await mesaResp.json();

      const comandaId = mesaData.comanda?.id;
      if (!comandaId) {
        setError("La mesa no tiene una comanda asociada");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      if (token) headers.Authorization = `Bearer ${token}`;

      const pagoResp = await fetch(
        `http://${window.location.hostname}:8000/api/comandas/${comandaId}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({ estado_comanda_id: 4 }),
        }
      );
      if (!pagoResp.ok) throw new Error("Error al procesar el pago");
      const respJson = await pagoResp.json();

      setStatusComand(respJson.estado_comanda_id);
    } catch (err) {
      console.error("Error al pagar la comanda:", err);
    }
  };

  const textos = {
    resumen: {
      es: "Resumen de tu Comanda Confirmada",
      en: "Summary of Your Confirmed Order",
      ca: "Resum de la teva Comanda Confirmada",
    },
    pagar: {
      es: "Total a pagar",
      en: "Total to pay",
      ca: "Total a pagar",
    },
    proceder: {
      es: "Proceder al pago",
      en: "Proceed to Payment",
      ca: "Procedir al pagament",
    },
  };

  return (
    <>
      <Header />
      <div className="min-h-[85dvh] p-4  text-white bg-[#012340] text-center">
        <SeccionTitulo titulo={textos.resumen[lang]} />
        <div className="mt-6">
          {itemsConfirmados.length > 0 ? (
            itemsConfirmados.map((item) => (
              <ItemConfirmado
                key={item.id}
                producto={item.producto}
                cantidad={item.cantidad}
              />
            ))
          ) : (
            <p>No hay ítems confirmados aún.</p>
          )}
        </div>
        <SeccionTitulo
          titulo={`${textos.pagar[lang]}: ${calcularTotal().toFixed(2)} €`}
        />
        <button
          onClick={async () => {
            await pagarComanda();
            navigate("/seguimiento");
          }}
          className="mt-8 bg-white text-[#7646e5] border border-[#7646e5] font-bold py-4 rounded-xl transition-transform duration-300 hover:scale-110 px-10"
        >
          {textos.proceder[lang]}
        </button>
      </div>
    </>
  );
};

export default PagarPage;
