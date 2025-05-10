import React, { createContext, useEffect, useState } from 'react';

/**
 * Estructura de los valores que provee el contexto de la aplicación.
 * @typedef {Object} AppContextType
 * @property {string|null}   token           - Token de autenticación JWT.
 * @property {Function}      setToken        - Función para actualizar el token.
 * @property {Object|null}   user            - Datos del usuario autenticado.
 * @property {Function}      setUser         - Función para actualizar los datos del usuario.
 * @property {number|null}   mesaId          - ID de la mesa seleccionada.
 * @property {Function}      setMesaId       - Función para actualizar la mesa.
 * @property {string}        lang            - Código de idioma activo (por ejemplo, 'es').
 * @property {Function}      setLang         - Función para cambiar el idioma.
 * @property {string|null}   statusComand    - Estado actual del comando.
 * @property {Function}      setStatusComand - Función para actualizar el estado del comando.
 * @property {number}        cartVersion     - Versión del carrito, para forzar refresco.
 * @property {Function}      bumpCart        - Incrementa `cartVersion` para refrescar el carrito.
 */

/**
 * Contexto global de la aplicación.
 * @type {React.Context<AppContextType>}
 */
export const AppContext = createContext(
  /** @type {AppContextType} */ (null)
);

/**
 * Proveedor de estado global de la aplicación.
 *
 * Inicializa y expone en el contexto:
 * - lang: idioma de la interfaz.
 * - token: token de autenticación almacenado en localStorage.
 * - user: datos del usuario autenticado.
 * - mesaId: identificador de la mesa actual.
 * - statusComand: estado del último comando.
 * - cartVersion: versión del carrito para forzar su refresco.
 * - bumpCart: función para incrementar cartVersion.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element} Componente proveedor de contexto.
 */
export default function AppProvider({ children }) {
  const [lang, setLang] = useState('es');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [mesaId, setMesaId] = useState(null);
  const [statusComand, setStatusComand] = useState(null);
  const [cartVersion, setCartVersion] = useState(0);

  /**
   * Incrementa `cartVersion` para forzar la actualización
   * de cualquier componente que consuma esta propiedad.
   *
   * @returns {void}
   */
  const bumpCart = () => {
    setCartVersion(v => v + 1);
  };

  /**
   * Obtiene los datos del usuario autenticado desde la API
   * y actualiza el estado `user`.
   *
   * @async
   * @private
   * @returns {Promise<void>}
   */
  async function getUser() {
    try {
      const response = await fetch(
        `${window.location.protocol}//${window.location.hostname}:8000/api/user`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        }
      );
      if (!response.ok) {
        console.error('Error fetching user data:', response.statusText);
        return;
      }
      const data = await response.json();
      setUser(data);
      console.log('Datos de usuario recibidos:', data);
    } catch (err) {
      console.error('Error en getUser():', err);
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        mesaId,
        setMesaId,
        lang,
        setLang,
        statusComand,
        setStatusComand,
        cartVersion,
        bumpCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
