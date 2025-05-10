import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";

/**
 * Representa los datos de un usuario autenticado.
 * @typedef {Object} Usuario
 * @property {number} id               - Identificador único del usuario.
 * @property {string} name             - Nombre completo del usuario.
 * @property {string} email            - Correo electrónico.
 */

/**
 * Representa un ítem de una comanda de usuario.
 * @typedef {Object} ComandaItem
 * @property {number} id               - Identificador del ítem.
 * @property {number} cantidad         - Unidades del producto.
 * @property {Object} producto         - Objeto producto asociado.
 * @property {string} producto.nombre  - Nombre del producto.
 * @property {number} precio_unitario  - Precio unitario en euros.
 */

/**
 * Representa una comanda realizada por el usuario.
 * @typedef {Object} Comanda
 * @property {number} id                       - Identificador único de la comanda.
 * @property {Object} mesa                     - Objeto mesa donde se realizó la comanda.
 * @property {string} mesa.codigo              - Código o nombre de la mesa.
 * @property {Object} estado_comanda           - Estado actual de la comanda.
 * @property {string} estado_comanda.nombre    - Nombre del estado (e.g. "pagada", "servida").
 * @property {number} total                    - Importe total de la comanda.
 * @property {ComandaItem[]} items             - Lista de ítems pedidos.
 */

/**
 * Página de perfil de usuario que muestra sus comandas realizadas.
 *
 * Al montar, carga los datos del usuario autenticado y sus comandas
 * desde la API usando el token almacenado en localStorage.
 * Muestra un listado de cada comanda con detalles de mesa, estado, total e ítems.
 *
 * @component
 * @returns {JSX.Element}
 */
const UsuarioPage = () => {
  const [usuario, setUsuario] = useState(
    /** @type {Usuario|null} */ (null)
  );
  const [comandas, setComandas] = useState(
    /** @type {Comanda[]} */ ([])
  );
  const [error, setError] = useState(
    /** @type {string|null} */ (null)
  );

  const token = localStorage.getItem("token");

  useEffect(() => {
    /**
     * Carga datos del usuario autenticado y sus comandas.
     * @async
     * @returns {Promise<void>}
     */
    const fetchUsuarioYComandas = async () => {
      try {
        if (!token) throw new Error("Token de autenticación no encontrado");

        // Obtener datos del usuario
        const userRes = await fetch(
          `http://${window.location.hostname}:8000/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (!userRes.ok) throw new Error("No se pudo obtener el usuario");
        const userData = await userRes.json();
        setUsuario(userData);

        // Obtener comandas asociadas al usuario
        const comandasRes = await fetch(
          `http://${window.location.hostname}:8000/api/comandas-usuario`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (!comandasRes.ok) throw new Error("No se pudieron obtener las comandas");
        const comandasUsuario = await comandasRes.json();
        setComandas(comandasUsuario);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsuarioYComandas();
  }, [token]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#012340] text-red-500 p-6">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen p-4 bg-[#012340] text-white">
        <SeccionTitulo titulo="Tus comandas realizadas" />

        {comandas.length === 0 ? (
          <p className="text-center mt-10 text-gray-300">
            No has realizado ninguna comanda.
          </p>
        ) : (
          <div className="mt-6 space-y-6">
            {comandas.map(
              /** @param {Comanda} comanda */
              (comanda) => (
                <div
                  key={comanda.id}
                  className="bg-[#023c59] p-4 rounded-xl shadow-md border border-[#045a7c]"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Mesa: {comanda.mesa?.codigo || "Sin asignar"} —{" "}
                    <span className="italic text-sm text-gray-300">
                      Estado: {comanda.estado_comanda?.nombre}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-300">
                    Total: {comanda.total} €
                  </p>
                  <ul className="mt-2 space-y-1">
                    {comanda.items.map(
                      /** @param {ComandaItem} item */
                      (item) => (
                        <li key={item.id} className="text-sm">
                          {item.cantidad}× {item.producto?.nombre} —{" "}
                          {item.precio_unitario} €
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UsuarioPage;
