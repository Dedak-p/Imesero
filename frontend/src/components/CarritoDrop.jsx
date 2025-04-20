import { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import Caja from "../assets/caja.svg";
import useApiCall from "../hooks/useApiCall";

export default function CarritoDrop() {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const ref = useRef();
  const [open, setOpen] = useState(false);

  // Lee el ID de comanda (puede guardarse al crear la comanda inicial)
  const comandaId = localStorage.getItem("comandaId");

  // Llama a la API para obtener los items de la comanda
  const {
    data: items,
    loading,
    error,
    refetch,
  } = useApiCall(comandaId ? `/comandas/${comandaId}/items` : null, "get", null, [comandaId]);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const total = items.reduce(
    (sum, it) => sum + it.cantidad * parseFloat(it.precio_unitario),
    0
  );

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => {
          setOpen((o) => !o);
          if (comandaId) refetch();
        }}
        className="relative p-2 text-white hover:text-gray-300"
      >
        <img src={Caja} alt="Icono personalizado" className="w-10 h-7 " />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-xs rounded-full px-1">
            {items.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-10">
          <div className="p-4">
            <h3 className="font-semibold mb-2">Tu carrito</h3>
            {loading ? (
              <p className="text-sm text-gray-500">Cargando…</p>
            ) : error ? (
              <p className="text-sm text-red-500">Error al cargar</p>
            ) : items.length === 0 ? (
              <p className="text-sm text-gray-500">Vacío</p>
            ) : (
              <>
                <ul className="max-h-40 overflow-y-auto">
                  {items.map((it) => (
                    <li
                      key={it.id}
                      className="flex justify-between text-sm py-1 border-b last:border-0"
                    >
                      <span>
                        {it.cantidad}x {it.producto.nombre}
                      </span>
                      <span>
                        {(it.cantidad * parseFloat(it.precio_unitario)).toFixed(2)} €
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/carrito");
                  }}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
                >
                  Ver carrito
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
