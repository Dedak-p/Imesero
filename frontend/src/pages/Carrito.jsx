import React, {
  useState,
  useCallback,
  useMemo,
  useContext
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import ItemCarrito from "../components/ItemCarrito";
import useApiCall from "../hooks/useApiCall";
import apiClient from "../api/apiClient";
import { AppContext } from "../context/AppContext";

/**
 * Estructura de un ítem dentro de la comanda de la mesa.
 * @typedef {Object} ComandaItem
 * @property {number} id                     - Identificador interno del ítem.
 * @property {number} producto_id            - ID del producto asociado.
 * @property {number} cantidad               - Cantidad de unidades.
 * @property {number} precio_unitario        - Precio unitario del producto.
 * @property {boolean} pagada                - Indica si ya está pagado.
 * @property {number} subtotal               - Subtotal calculado (cantidad × precio_unitario).
 */

/**
 * Estructura de la comanda de la mesa.
 * @typedef {Object} MesaComanda
 * @property {number} mesa                   - Número o ID de la mesa.
 * @property {{ items: ComandaItem[] }} comanda - Datos de la comanda, con la lista de ítems.
 */

/**
 * Página principal del carrito de la mesa.
 *
 * Muestra los ítems pendientes de pago, subtotal y permite confirmar la comanda.
 *
 * @component
 * @returns {JSX.Element}
 */
const CarritoPage = () => {
  const { lang } = useContext(AppContext);
  const navigate = useNavigate();
  const { mesaId: mesaObtenida } = useParams();
  const token = localStorage.getItem("token");

  /**
   * Textos localizados para la página de carrito.
   * @type {{ carrito: Record<string,string>, precios: Record<string,string>, confirmacion: Record<string,string> }}
   */
  const textos = {
    carrito: {
      es: "Este es tu carrito",
      en: "This is your cart",
      ca: "Aquest és el teu carretó",
    },
    precios: {
      es: "Precio Total",
      en: "Total Price",
      ca: "Preu Total",
    },
    confirmacion: {
      es: "Confirmar Comanda",
      en: "Confirm Order",
      ca: "Confirmar Comanda",
    },
  };

  // Hook para obtener datos de la mesa y su comanda
  const {
    data: mesaDataArr,
    loading: loadingMesa,
    error: errorMesa,
    refetch: refetchMesa,
  } = useApiCall(
    `http://${window.location.hostname}:8000/api/mesas/${mesaObtenida}`,
    "get",
    null,
    [mesaObtenida]
  );

  /** @type {MesaComanda} */
  const mesaData = mesaDataArr[0] || {};
  const { comanda } = mesaData;

  /**
   * Filtra y agrupa los ítems no pagados por producto, calculando subtotales.
   * @type {ComandaItem[]}
   */
  const itemList = useMemo(() => {
    if (!comanda?.items) return [];
    const map = {};
    comanda.items
      .filter((i) => !i.pagada)
      .forEach((i) => {
        const key = i.producto_id;
        if (!map[key]) {
          map[key] = { ...i, subtotal: i.cantidad * i.precio_unitario };
        } else {
          map[key].cantidad += i.cantidad;
          map[key].subtotal += i.cantidad * i.precio_unitario;
        }
      });
    return Object.values(map);
  }, [comanda]);

  /**
   * Calcula el total sumando todos los subtotales.
   * @type {number}
   */
  const total = useMemo(
    () => itemList.reduce((sum, it) => sum + it.subtotal, 0),
    [itemList]
  );

  /**
   * Realiza una petición para añadir o quitar unidades de un ítem en la comanda.
   *
   * @param {number} productoId - ID del producto a actualizar.
   * @param {number} delta      - Cambio en la cantidad (+1 o -1).
   * @returns {Promise<void>}
   */
  const updateItem = useCallback(
    async (productoId, delta) => {
      try {
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;
        await apiClient.post(
          `http://${window.location.hostname}:8000/api/mesas/${mesaObtenida}/items`,
          { producto_id: productoId, cantidad: delta },
          { headers }
        );
        await refetchMesa();
      } catch (e) {
        console.error("Error al actualizar ítem:", e.response?.data || e.message);
      }
    },
    [mesaObtenida, token, refetchMesa]
  );

  const añadirCarrito = (id) => updateItem(id, 1);
  const eliminarCarrito = (id) => updateItem(id, -1);

  // Estado para controlar la confirmación de la comanda
  const [confirming, setConfirming] = useState(false);

  /**
   * Confirma la comanda marcándola y redirige a la página de pago.
   *
   * @returns {Promise<void>}
   */
  const manejarConfirmacion = useCallback(async () => {
    if (itemList.length === 0) return;
    try {
      setConfirming(true);
      const headers = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
      await apiClient.patch(
        `http://${window.location.hostname}:8000/api/mesas/${mesaObtenida}/confirm`,
        {},
        { headers }
      );
      navigate("/pagar");
    } catch (e) {
      console.error("Error al confirmar comanda:", e);
    } finally {
      setConfirming(false);
    }
  }, [itemList.length, mesaObtenida, navigate, token]);

  // Manejo de error al cargar la mesa
  if (errorMesa) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-[#012340]">
        <p>{errorMesa.message || errorMesa}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen p-6 bg-[#012340] text-white">
        <SeccionTitulo titulo={textos.carrito[lang]} />

        {loadingMesa ? (
          <div className="h-50 flex items-center justify-center text-white bg-[#012340]">
            <p>Cargando datos de la mesa…</p>
          </div>
        ) : !comanda ? (
          <div className="h-50 flex items-center justify-center text-white bg-[#012340]">
            <p>No hay comanda en esta mesa.</p>
          </div>
        ) : (
          <>
            {/* Lista de ítems */}
            <div className="space-y-3">
              {itemList.length > 0 ? (
                itemList.map((item) => (
                  <ItemCarrito
                    key={item.id}
                    productoId={item.producto_id}
                    cantidad={item.cantidad}
                    onAdd={añadirCarrito}
                    onRemove={eliminarCarrito}
                  />
                ))
              ) : (
                <p>No hay productos pendientes de pago.</p>
              )}
            </div>

            {/* Subtotal y botón Confirmar */}
            <div className="mt-6 text-center">
              <SeccionTitulo
                titulo={`${textos.precios[lang]}:  ${total.toFixed(2)} €`}
              />
              <button
                onClick={manejarConfirmacion}
                disabled={itemList.length === 0 || confirming}
                className={`mt-4 px-8 py-3 font-bold rounded-xl transition ${
                  itemList.length === 0 || confirming
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-white text-[#7646e5] hover:scale-105"
                }`}
              >
                {confirming
                  ? "Confirmando…"
                  : textos.confirmacion[lang]}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CarritoPage;
