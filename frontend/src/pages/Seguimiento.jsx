import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import ItemCarrito from "../components/ItemCarrito";

import Axios from "axios";

const SeguimientoPage = () => {
  const { mesaId, statusComand, setStatusComand } = useContext(AppContext);
  const [error, setError] = useState(null);
  const { lang } = useContext(AppContext);


  useEffect(() => {
    if (!mesaId) {
      setError("No se ha asignado un ID de mesa.");
      return;
    }

    const fetchComandaAndItems = async () => {
      try {
        const mesaResponse = await fetch(`http://${window.location.hostname}:8000/api/mesas/${mesaId}`);
        if (!mesaResponse.ok) throw new Error("No se pudo obtener la mesa");
        const mesaData = await mesaResponse.json();

        if (!mesaData.comanda.id) {
          setError("La mesa no tiene una comanda asociada");
          return;
        }

        console.log("Datos de la mesa:", mesaData.comanda.estado_comanda_id);
        setStatusComand(mesaData.comanda.status_comanda_id);

      } catch (error) {
        setError(error.message);
      }
    };

    fetchComandaAndItems();

  }, [mesaId, setStatusComand]);



  if (error) {
    return <div>{error}</div>;
  }


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


  return (
    <>
      <Header />
      <div className="min-h-screen p-4 mt-25 flex-col justify-content align-items-center text-center text-white bg-[#012340]">
        <SeccionTitulo titulo={translations[lang]?.titulo || "Seguimiento de tu pedido"} />

        <div className="flex flex-row justify-between mt-5 mb-5 w-full max-w-screen-md mx-auto  border border-gray-600 rounded-lg overflow-hidden shadow-md bg-[#01344C]">
          {/* Columna A */}
          <div className="w-1/3  mt-5 flex items-center justify-center relative">
            {/* Zig-Zag SVG */}
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

          {/* Columna B */}
          <div className="w-2/3  flex flex-col justify-center p-8 space-y-4">

            {/* Palabra fija */}
            <div className="relative h-15  flex items-center justify-center">
              {statusComand === 4 && (
                <div className="absolute inset-0 bg-green-300 opacity-70 rounded" />
              )}
              <span className="relative text-lg font-bold">
                {translations[lang]?.pagado || "Pagado"}
              </span>
            </div>

            <div className="relative h-15 mt-10 flex items-center justify-center">
              {statusComand === 5 && (
                <div className="absolute inset-0 bg-green-300 opacity-70 rounded" />
              )}
              <span className="relative text-lg font-bold">
                {translations[lang]?.preparandose || "Preparándose"}
              </span>
            </div>

            {/* Otra palabra fija */}
            <div className="relative h-15 mt-10 flex items-center justify-center">
              {statusComand === 6 && (
                <div className="absolute inset-0 bg-green-300 opacity-70 rounded" />
              )}
              <span className="relative text-lg font-bold">
                {translations[lang]?.enCamino || "En camino"}
              </span>
            </div>

            {/* Otra palabra fija */}
            <div className="relative h-15 mt-10 flex items-center justify-center">
              {statusComand === 7 && (
                <div className="absolute inset-0 bg-green-300 opacity-70 rounded" />
              )}
              <span className="relative text-lg font-bold">
                {translations[lang]?.servido || "Servido"}
              </span>
            </div>

          </div>
        </div>





      </div >
    </>
  );
};

export default SeguimientoPage;
