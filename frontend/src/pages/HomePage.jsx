import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import useApiCall from "../hooks/useApiCall.js";

/**
 * Datos de una mesa obtenidos de la API.
 * @typedef {Object} Mesa
 * @property {number}  id        - Identificador único de la mesa.
 * @property {string}  codigo    - Código o nombre visible de la mesa.
 * @property {number}  capacidad - Número máximo de comensales.
 * @property {boolean} ocupada   - Indica si la mesa está ocupada.
 */

/**
 * Textos localizados para distintos elementos de la página de inicio.
 * @typedef {Object} TextosHome
 * @property {Object.<string,function(Object):string>} bienvenida
 *   - Función que recibe el usuario y devuelve el saludo correspondiente.
 * @property {Object.<string,string>} seleccionMesa
 *   - Texto para la sección de selección de mesa.
 * @property {Object.<string,string>} cargandoMesas
 *   - Texto que se muestra mientras cargan las mesas.
 * @property {Object.<string,string>} errorMesas
 *   - Texto que se muestra si hay un error al cargar las mesas.
 * @property {Object.<string,string>} capacidad
 *   - Etiqueta que muestra "Capacidad" en cada idioma.
 * @property {Object.<string,string>} ocupada
 *   - Etiqueta para una mesa ocupada.
 * @property {Object.<string,string>} libre
 *   - Etiqueta para una mesa libre.
 * @property {Object.<string,string>} logout
 *   - Texto del botón de cerrar sesión.
 * @property {Object.<string,string>} login
 *   - Texto del botón de iniciar sesión.
 */

/**
 * Página de inicio de la aplicación.
 *
 * Muestra un saludo personalizado, permite cambiar idioma,
 * listar y seleccionar mesas, y ofrece botones de sesión y administración
 * según el rol del usuario.
 *
 * @component
 * @returns {JSX.Element}
 */
function Home() {
  // Limpiamos cualquier token previo al cargar esta página
  localStorage.clear();

  const navigate = useNavigate();
  const { user, setUser, token, setToken, lang, setLang } = useContext(AppContext);

  /**
   * Textos localizados usados en la página.
   * @type {TextosHome}
   */
  const textos = {
    bienvenida: {
      es: (u) => `Hola, ${u ? u.name + ". Bienvenido de vuelta!" : "bienvenido a nuestro software de gestión de comandas."}`,
      ca: (u) => `Hola, ${u ? u.name + ". Benvingut de nou!" : "benvingut al nostre programari de gestió de comandes."}`,
      en: (u) => `Hi, ${u ? u.name + ". Welcome back!" : "welcome to our order management software."}`
    },
    seleccionMesa: { es: "Selecciona tu mesa", ca: "Selecciona la teva taula", en: "Select your table" },
    cargandoMesas: { es: "Cargando mesas…", ca: "Carregant taules…", en: "Loading tables…" },
    errorMesas: { es: "Error cargando mesas. Inténtalo de nuevo.", ca: "Error en carregar les taules. Torna-ho a intentar.", en: "Error loading tables. Please try again." },
    capacidad: { es: "Capacidad", ca: "Capacitat", en: "Capacity" },
    ocupada: { es: "Ocupada", ca: "Ocupada", en: "Occupied" },
    libre:   { es: "Libre",   ca: "Lliure",   en: "Free" },
    logout:  { es: "CERRAR SESIÓN", ca: "TANCAR SESSIÓ", en: "LOGOUT" },
    login:   { es: "USA TU CUENTA", ca: "UTILITZA EL TEU COMPTE", en: "USE YOUR ACCOUNT" }
  };

  /**
   * Cierra la sesión del usuario, limpia contexto y localStorage, y redirige al inicio.
   *
   * @async
   * @param {React.MouseEvent<HTMLButtonElement>} e - Evento de clic.
   * @returns {Promise<void>}
   */
  async function handleLogout(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${window.location.protocol}//${window.location.hostname}:8000/api/logout`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en el servidor:', errorData);
        return;
      }
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    } catch (err) {
      console.error('Error en la solicitud de logout:', err);
    }
  }

  // Hook para cargar todas las mesas; mesas se normaliza a array de Mesa
  const { data: mesas = [], loading, error } = useApiCall(
    `${window.location.protocol}//${window.location.hostname}:8000/api/mesas`
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#012340] p-6 md:p-12 font-montserrat">
      {/* Selector de idioma */}
      <div className="absolute top-4 right-4 flex gap-3">
        {['es', 'ca', 'en'].map((code) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 ${
              lang === code
                ? 'bg-white text-[#012340] border-white'
                : 'bg-transparent text-white border-white hover:bg-white hover:text-[#012340]'
            }`}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Título */}
      <h1 className="text-6xl lg:text-7xl font-bold text-white italic text-center mb-12
                     [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)]">
        IMESERO
      </h1>

      <div className="w-full max-w-2xl md:max-w-3xl lg:max-wd-4xl bg-[#012340]/80 shadow-lg shadow-blue-500/50
                      rounded-xl p-8 lg:p-12 flex flex-col items-center">
        {/* Bienvenida */}
        <p className="text-2xl lg:text-3xl font-bold text-white text-center mb-2 italic leading-relaxed">
          {textos.bienvenida[lang](user)}
        </p>

        {/* Selección de mesa */}
        <section className="w-full max-w-4xl mb-12">
          <h2 className="text-white text-3xl font-semibold mb-4 text-center">
            {textos.seleccionMesa[lang]}
          </h2>
          {loading && <p className="text-white text-center">{textos.cargandoMesas[lang]}</p>}
          {error   && <p className="text-red-400 text-center">{textos.errorMesas[lang]}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mesas.map(
                /** @param {Mesa} mesa */
                (mesa) => (
                  <button
                    key={mesa.id}
                    disabled={mesa.ocupada}
                    onClick={() => navigate(`/menu/${mesa.id}`)}
                    className={`p-4 border rounded-xl text-center ${
                      mesa.ocupada
                        ? "bg-gray-500 cursor-not-allowed text-gray-200"
                        : "bg-green-300 hover:bg-green-400 text-gray-800 cursor-pointer"
                    }`}
                  >
                    <h3 className="text-xl font-bold">{mesa.codigo}</h3>
                    <p>{textos.capacidad[lang]} {mesa.capacidad}</p>
                    <p>{mesa.ocupada ? textos.ocupada[lang] : textos.libre[lang]}</p>
                  </button>
                )
              )}
            </div>
          )}
        </section>

        {/* Botones de sesión y administración */}
        <div className="flex flex-col mb-16 md:flex-row gap-6">
          {user ? (
            <div className="flex flex-col md:flex-row gap-6">
              <button
                onClick={handleLogout}
                className="bg-white text-[#7646e5] border border-[#7646e5] font-bold px-10 py-4 rounded-xl transition-transform duration-300 hover:scale-105"
              >
                {textos.logout[lang]}
              </button>
              {user.role === 'admin' && (
                <>
                  <button
                    onClick={() => navigate("/crearProducto")}
                    className="bg-white text-green-600 border border-green-600 font-bold px-10 py-4 rounded-xl transition-transform duration-300 hover:scale-105"
                  >
                    Crear Producto
                  </button>
                  <button
                    onClick={() => navigate("/modificarProducto")}
                    className="bg-white text-yellow-600 border border-yellow-600 font-bold px-10 py-4 rounded-xl transition-transform duration-300 hover:scale-105"
                  >
                    Modificar Producto
                  </button>
                  <button
                    onClick={() => navigate("/eliminarProducto")}
                    className="bg-white text-red-600 border border-red-600 font-bold px-10 py-4 rounded-xl transition-transform duration-300 hover:scale-105"
                  >
                    Eliminar Producto
                  </button>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-[#7646e5] border border-[#7646e5] font-bold px-10 py-4 rounded-xl transition-transform duration-300 hover:scale-105"
            >
              {textos.login[lang]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
