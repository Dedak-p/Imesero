import { Link, useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext"; 
import Flecha from "../assets/flecha.svg";
import Usuario from "../assets/usuario.svg";
import Caja from "../assets/caja.svg";
import Seguimiento from "../assets/seguimiento.svg";
import useApiCall from "../hooks/useApiCall";
import CarritoDrop from "./CarritoDrop.jsx";

/**
 * Representa una categoría de producto.
 * @typedef {Object} Category
 * @property {number} id       - Identificador único de la categoría.
 * @property {string} nombre_es   - Nombre de la categoría.
 */

/**
 * Estructura de retorno de useApiCall para categorías.
 * @typedef {Object} CategoriesResponse
 * @property {Category[]} data    - Array de categorías.
 * @property {boolean}   loading - Flag de carga.
 * @property {?Error}    error   - Error ocurrido, o null.
 * @property {function():void} refetch - Función para recargar manualmente.
 */

/**
 * Componente Header de la aplicación.
 *
 * Muestra controles de navegación, selección de idioma,
 * iconos de usuario, carrito y seguimiento de pedido,
 * así como la barra de categorías al navegar por el menú.
 *
 * @component
 * @returns {JSX.Element}
 */
const Header = () => {
  const { setLang, statusComand, mesaId } = useContext(AppContext);
  const location = useLocation();
  const { mesaId: mesaObtenida } = useParams();
  const navigate = useNavigate();
  const path = location.pathname;

  /**
   * Cambia el idioma de la aplicación.
   *
   * @param {'es'|'ca'|'en'} ext - Código del idioma ('es' | 'ca' | 'en').
   * @returns {void}
   */
  function changeLanguage(ext) {
    setLang(ext);
  }

  /**
   * Hook para obtener categorías; siempre devuelve un objeto CategoriesResponse.
   * @type {CategoriesResponse}
   */
  const {
    data: categorias,
    loading,
    error,
    refetch
  } = useApiCall(
    `${window.location.protocol}//${window.location.hostname}:8000/api/categorias`
  );

  // Cuando estemos cargando dentro de /menu/:mesaId, forzamos la ruta
  useEffect(() => {
    if (loading && path.startsWith("/menu/")) {
      navigate(`/menu/${mesaObtenida}`);
    }
  }, [loading, navigate, mesaObtenida, path]);

  return (
    <header className="sticky top-0 left-0 grid grid-cols-2 grid-rows-2 p-4 bg-blue-950 shadow-md w-full">

      {/* Botón de retroceso */}
      <button className="p-2 rounded-full" onClick={() => navigate(-1)}>
        <img src={Flecha} alt="Volver atrás" className="w-10 h-7 cursor-pointer" />
      </button>

      {/* Controles de usuario, idioma, carrito y seguimiento */}
      <div className="flex items-center justify-end gap-2 text-white">
        {/* Botones de idioma */}
        {['es','ca','en'].map(code => (
          <span key={code} className="relative group cursor-pointer">
            <span
              className="hover:text-blue-500"
              onClick={() => changeLanguage(code)}
            >
              {code.toUpperCase()}
            </span>
            <span
              className="absolute left-0 bottom-full mb-1 w-max px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ transform: 'translate(-25%, 70px)' }}
            >
              {code === 'es' ? 'Español' : code === 'ca' ? 'Català' : 'English'}
            </span>
          </span>
        ))}

        <button onClick={() => navigate("/usuario")}>
          <img src={Usuario} alt="Ir a perfil de usuario" className="w-10 h-7 cursor-pointer" />
        </button>

        <CarritoDrop />

        {statusComand > 3 && (
          <button onClick={() => navigate("/seguimiento")}>
            <img src={Seguimiento} alt="Seguimiento de pedido" className="w-10 h-7 cursor-pointer" />
          </button>
        )}
      </div>

      {/* Navegación de categorías o vuelta a la carta */}
      <div className="flex flex-col col-span-2 items-center self-end">
        <nav className="flex gap-6 overflow-x-auto text-white font-semibold">

          {path.startsWith("/menu/") && (
            <>
              {loading ? (
                <span>Cargando categorías…</span>
              ) : error ? (
                <span>Error al cargar categorías</span>
              ) : (
                categorias.map((cat) => {
                  /** @type {Category} */
                  const category = cat;
                  const slug = category.nombre_es
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");
                  return (
                    <a
                      key={category.id}
                      href={`/menu/${mesaObtenida}#${slug}`}
                      className="hover:text-gray-300 whitespace-nowrap"
                    >
                      {category.nombre_es.toUpperCase()}
                    </a>
                  );
                })
              )}
            </>
          )}

          {path.startsWith("/carrito/") && (
            <a
              href={`/menu/${mesaObtenida}`}
              className="hover:text-gray-300 whitespace-nowrap"
            >
              Volver a la Carta
            </a>
          )}
        </nav>
      </div>

    </header>
  );
};

export default Header;
