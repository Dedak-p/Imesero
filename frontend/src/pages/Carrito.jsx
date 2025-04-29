import { useState, useCallback, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import ItemCarrito from "../components/ItemCarrito";
import useApiCall from "../hooks/useApiCall";
import apiClient from "../api/apiClient";
import { AppContext } from "../context/AppContext";

const CarritoPage = () => {
  const {lang} = useContext(AppContext);
  const textos = {
    carrito :{
      es: "Este es tu carrito",
      en: "This is your cart",
      ca: "Aquest és el teu carretó"
    },

    precios :{
      es: "Precio Total",
      en: "Total Price",
      ca: "Preu Total"

    },

    confirmacion:{
      es:"Confirmar Comanda",
      en:"Confirm Order",
      ca: "Confirmar Comanda"
    }


  }

  const navigate = useNavigate();
  const { mesaId: mesaObtenida } = useParams();
  const token = localStorage.getItem("token");

  const {
    data: mesaDataArr,
    loading: loadingMesa,
    error: errorMesa,
    refetch: refetchMesa
  } = useApiCall(`/mesas/${mesaObtenida}`, "get", null, [mesaObtenida]);

  const mesaData = mesaDataArr[0] || {};
  const { mesa, comanda } = mesaData;

  // Agrupar sólo ítems no pagados
  const itemList = useMemo(() => {
    if (!comanda?.items) return [];
    const map = {};
    comanda.items
      .filter(i => !i.pagada)
      .forEach(i => {
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
  console.log("itemList", itemList);

  // Calcular total
  const total = useMemo(
    () => itemList.reduce((sum, it) => sum + it.subtotal, 0),
    [itemList]
  );

  // POST para añadir/quitar ítem

  const updateItem = useCallback(
    async (productoId, delta) => {
      try {
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        await apiClient.post(
          `/mesas/${mesaObtenida}/items`,
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

  // Estado y PATCH para confirmar comanda
  const [confirming, setConfirming] = useState(false);
  const manejarConfirmacion = useCallback(async () => {
    if (itemList.length === 0) return;
    try {
      setConfirming(true);
      const headers = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
      await apiClient.patch(`/mesas/${mesaObtenida}/confirm`, {}, { headers });
      navigate("/pagar");
    } catch (e) {
      console.error("Error al confirmar comanda:", e);
    } finally {
      setConfirming(false);
    }
  }, [itemList.length, mesaObtenida, navigate, token]);

  // ── Ahora los returns condicionales ───────────────────────────

  if (errorMesa) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-[#012340]">
        <p>{errorMesa.message || errorMesa}</p>
      </div>
    );
  }

  // ── Finalmente, el renderizado normal ────────────────────────
  return (
    <>
      <Header />
      <div className="min-h-screen p-6 bg-[#012340] text-white">
      <SeccionTitulo titulo={textos.carrito[lang]} />
  
        {loadingMesa ? (
          <div className="h-50 flex items-center justify-center text-white bg-[#012340]">
            <p>Cargando datos de la mesa…</p>
          </div>
        ) : (!comanda ? (
          <div className="h-50 flex items-center justify-center text-white bg-[#012340]">
          <p>No hay comanda en esta mesa.</p>
          </div>
        ):(
          <>
            {/* Lista de ítems */}
            <div className="space-y-3">
              {itemList.length > 0 ? (
                itemList.map(item => (
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
              <SeccionTitulo titulo={`${textos.precios[lang]}:  ${total.toFixed(2)} €`} />
              <button
                onClick={manejarConfirmacion}
                disabled={itemList.length === 0 || confirming}
                className={`mt-4 px-8 py-3 font-bold rounded-xl transition ${
                  itemList.length === 0 || confirming
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-white text-[#7646e5] hover:scale-105"
                }`}
              >
                {confirming ? "Confirmando…" : `${textos.confirmacion[lang]}`}
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default CarritoPage;
