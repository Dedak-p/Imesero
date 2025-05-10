import { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Caja from "../assets/caja.svg";
import useApiCall from "../hooks/useApiCall";

/**
 * Un ítem dentro de la comanda de la mesa.
 * @typedef {Object} CartItem
 * @property {number} id               - Identificador interno del ítem en la comanda.
 * @property {number} producto_id      - ID del producto asociado a este ítem.
 * @property {number} cantidad         - Cantidad de unidades pedidas.
 * @property {string} precio_unitario  - Precio unitario en formato string.
 */

/**
 * Un producto obtenido desde la API.
 * @typedef {Object} Product
 * @property {number} id               - Identificador único del producto.
 * @property {string} nombre_es        - Nombre en español.
 * @property {string} nombre_ca        - Nombre en catalán.
 * @property {string} nombre_en        - Nombre en inglés.
 * @property {string} imagen           - Ruta/URL de la imagen del producto.
 */

/**
 * Elemento de respuesta para la API de mesas.
 * @typedef {Object} MesaApiResponse
 * @property {{ items: CartItem[] }} comanda - Objeto `comanda` que contiene los ítems.
 */

/**
 * CarritoDrop muestra un icono de carrito y, al hacer clic,
 * despliega un dropdown con los ítems de la comanda de la mesa actual.
 * Se vuelve a cargar automáticamente cuando cambia `cartVersion`
 * en el contexto, y permite navegar a la vista completa del carrito.
 *
 * @component
 * @returns {JSX.Element} Elemento React del carrito desplegable.
 */
export default function CarritoDrop() {
  const { lang, cartVersion } = useContext(AppContext);
  const { mesaId: mesaObtenida } = useParams();
  const navigate = useNavigate();
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(/** @type {CartItem[]} */ ([]));
  const [productosMap, setProductosMap] = useState(
    /** @type {Record<number, Product>} */ ({})
  );

  // Hook para obtener la comanda (incluye items) de la mesa
  const {
    data: comanda,
    loading,
    error,
    refetch,
  } = useApiCall(
    `http://${window.location.hostname}:8000/api/mesas/${mesaObtenida}`,
    "get",
    null,
    [mesaObtenida]
  );

  /**
   * Fuerza una recarga de la comanda cada vez que `cartVersion` cambia.
   */
  useEffect(() => {
    refetch();
  }, [cartVersion, refetch]);

  /**
   * Cuando cambia `comanda`, extrae los `items` de la respuesta.
   */
  useEffect(() => {
    if (!loading && Array.isArray(comanda) && comanda.length > 0) {
      /** @type {MesaApiResponse[]} */
      const apiResp = comanda;
      setItems(apiResp[0].comanda.items);
    }
  }, [loading, comanda]);

  /**
   * Cuando cambian los `items`, obtiene en paralelo cada `Product`
   * para construir un mapa { id → Product }.
   */
  useEffect(() => {
    if (!items.length) {
      setProductosMap({});
      return;
    }
    let isMounted = true;
    Promise.all(
      items.map(it =>
        fetch(`http://${window.location.hostname}:8000/api/productos/${it.producto_id}`)
          .then(res => res.json())
          .catch(() => null)
      )
    ).then(results => {
      if (!isMounted) return;
      /** @type {Record<number, Product>} */
      const map = {};
      results.forEach(prod => {
        if (prod && prod.id) {
          map[prod.id] = prod;
        }
      });
      setProductosMap(map);
    });
    return () => {
      isMounted = false;
    };
  }, [items]);

  /**
   * Cierra el dropdown si se hace clic fuera de él.
   */
  useEffect(() => {
    const handler = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Total calculado de todos los ítems
  const total = items.reduce(
    (sum, it) => sum + it.cantidad * parseFloat(it.precio_unitario),
    0
  );

  // Clave dinámica para el nombre del producto según el idioma
  const nameKey = `nombre_${lang}`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="relative p-2 text-white hover:text-gray-300"
      >
        <img src={Caja} alt="Icono de carrito" className="w-10 h-7" />
        {items.length > 0 && (
          <span className="absolute bottom-0 left-1 bg-red-600 text-sm rounded-full px-1.5 text-white">
            {items.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-10 text-black">
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
                  {items.map(it => {
                    const prod = productosMap[it.producto_id];
                    return (
                      <li
                        key={it.id}
                        className="flex justify-between text-sm py-1 border-b last:border-0"
                      >
                        <span>
                          {it.cantidad}× {prod ? prod[nameKey] : "Cargando…"}
                        </span>
                        <span className="whitespace-nowrap">
                          {(it.cantidad * parseFloat(it.precio_unitario)).toFixed(2)} €
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate(`/carrito/${mesaObtenida}`);
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
