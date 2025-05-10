import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import { AppContext } from "../context/AppContext";

/**
 * Traducciones para los distintos estados del seguimiento.
 * @typedef {Object} SeguimientoTranslations
 * @property {Object.<string,string>} titulo        - Título de la página.
 * @property {Object.<string,string>} pagado        - Texto para estado "Pagado".
 * @property {Object.<string,string>} preparandose  - Texto para estado "Preparándose".
 * @property {Object.<string,string>} enCamino      - Texto para estado "En camino".
 * @property {Object.<string,string>} servido       - Texto para estado "Servido".
 */

/**
 * Componente de página para el seguimiento del pedido.
 *
 * Muestra los pasos de la comanda y resalta el estado actual,
 * avanzando automáticamente cada 5 segundos.
 *
 * @component
 * @returns {JSX.Element}
 */
const SeguimientoPage = () => {
  const { mesaId, statusComand, setStatusComand, lang } = useContext(AppContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Traducciones locales según el idioma seleccionado.
   * @type {SeguimientoTranslations}
   */
  const translations = {
    es: {
      titulo: "Seguimiento de tu pedido",
      pagado: "Pagado",
      preparandose: "Preparándose",
      enCamino: "En camino",
      servido: "Servido",
    },
    en: {
      titulo: "Order Tracking",
      pagado: "Paid",
      preparandose: "Preparing",
      enCamino: "On the way",
      servido: "Served",
    },
    ca: {
      titulo: "Seguiment de la teva comanda",
      pagado: "Pagat",
      preparandose: "Preparant-se",
      enCamino: "En camí",
      servido: "Servit",
    },
  };

  // Verifica que haya una mesa y comanda asociada al montar
  useEffect(() => {
    if (!mesaId) {
      setError("No se ha asignado un ID de mesa.");
      return;
    }
    (async () => {
      try {
        const resp = await fetch(
          `http://${window.location.hostname}:8000/api/mesas/${mesaId}`
        );
        if (!resp.ok) throw new Error("No se pudo obtener la mesa");
        const mesaData = await resp.json();
        if (!mesaData?.comanda?.id) {
          setError("La mesa no tiene una comanda asociada");
        }
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [mesaId]);

  // Avanza el estado cada 5 segundos, reiniciando al llegar a 7
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusComand((prev) => (prev >= 7 ? 4 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [setStatusComand]);

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen p-4 mt-25 text-center text-white bg-[#012340] flex flex-col items-center">
        <SeccionTitulo titulo={translations[lang]?.titulo} />

        <div className="flex w-full max-w-screen-md mx-auto border border-gray-600 rounded-lg overflow-hidden shadow-md bg-[#01344C] mt-5 mb-5">
          {/* Decorativo zig-zag */}
          <div className="w-1/3 flex items-center justify-center">
            <svg
              className="h-4/5 w-24"
              viewBox="0 0 100 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline
                points="90,0 10,100 90,200 10,300 90,400"
                stroke="#2de1fc"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Estados */}
          <div className="w-2/3 flex flex-col justify-center p-8 space-y-4">
            {["pagado", "preparandose", "enCamino", "servido"].map(
              (key, idx) => (
                <div
                  key={key}
                  className="relative flex items-center justify-center"
                >
                  {statusComand === 4 + idx && (
                    <div className="absolute inset-0 bg-green-300 opacity-70 rounded" />
                  )}
                  <span className="relative text-lg font-bold">
                    {translations[lang][key]}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SeguimientoPage;
