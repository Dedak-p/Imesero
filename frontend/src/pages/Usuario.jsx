import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";

const UsuarioPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [comandas, setComandas] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsuarioYComandas = async () => {
      try {
        if (!token) throw new Error("Token de autenticación no encontrado");

        // Paso 1: Obtener el usuario autenticado
        const userRes = await fetch(`http://${window.location.hostname}:8000/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        if (!userRes.ok) throw new Error("No se pudo obtener el usuario");
        const userData = await userRes.json();
        setUsuario(userData);

        // Paso 2: Obtener las comandas del usuario (desde ruta protegida)
        const comandasRes = await fetch(`http://${window.location.hostname}:8000/api/comandas-usuario`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
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
            {comandas.map((comanda) => (
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
                <p className="text-sm text-gray-300">Total: {comanda.total} €</p>
                <ul className="mt-2 space-y-1">
                  {comanda.items.map((item) => (
                    <li key={item.id} className="text-sm">
                      {item.cantidad}x {item.producto?.nombre} — {item.precio_unitario} €
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UsuarioPage;
