import React from "react";

import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext.jsx"
import useApiCall from "../hooks/useApiCall.js";



function Home() {
    localStorage.clear();
    const navigate = useNavigate();
    const { user, setUser, token, setToken } = useContext(AppContext);
    const { data: mesas = [], loading, error } = useApiCall(`${window.location.protocol}//${window.location.hostname}:8000/api/mesas`);
    
    // Función para cerrar sesión
    async function handleLogout(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/api/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            })

            if (!response.ok) {
                // Si el servidor devuelve un error (como 500), lanza un error
                const errorData = await response.json();
                console.error('Error en el servidor:', errorData);
                return;
            }

            // Limpiar el token del contexto
            setToken(null);
            setUser(null);

            // Limpiar el token del localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Redirigir al usuario a la página de inicio
            navigate('/');

        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }
    return (
        <>
            {/* Contenedor principal con fondo y altura completa */}
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#012340] p-6 md:p-12 font-montserrat ">
                {/* Título  */}
                <h1 className="text-6xl lg:text-7xl font-bold text-white italic text-center mb-12 
                                   [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)]">
                    IMESERO
                </h1>
                {/* Contenedor con sombra y borde aplicado a toda la página */}
                <div className="w-full max-w-2xl md:max-w-3xl lg:max-wd-4xl bg-[#012340]/80 shadow-lg shadow-blue-500/50 
                                rounded-xl p-8 lg:p-12  flex flex-col items-center">

                    {/* Texto de bienvenida */}
                    <p className="text-2xl lg:text-3xl font-bold text-white text-center max-w-md lg:max-w-lgmb-10 italic leading-relaxed mb-2">
                        {user ?
                            (`Hola, ${user.name}. Bienvenido de vuelta!`)
                            :
                            ("Hola, bienvenido a nuestro software de gestión de comandas.")
                        }
                    </p>

                    {/* Selección de mesa */}
                    <section className="w-full max-w-4xl mb-12">
                        <h2 className="text-white text-3xl font-semibold mb-4 text-center">
                        Selecciona tu mesa
                        </h2>

                        {loading && <p className="text-white text-center">Cargando mesas…</p>}
                        {error && (
                        <p className="text-red-400 text-center">
                            Error cargando mesas. Inténtalo de nuevo.
                        </p>
                        )}

                        {!loading && !error && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {mesas.map((mesa) => (
                            <button
                                key={mesa.id}
                                disabled={mesa.ocupada}
                                onClick={() => navigate(`/menu/${mesa.id}`)}
                                className={`
                                p-4 border rounded-xl text-center
                                ${mesa.ocupada
                                    ? "bg-gray-500 cursor-not-allowed text-gray-200"
                                    : "bg-green-300 hover:bg-green-400 text-gray-800 cursor-pointer"}
                                `}
                            >
                                <h3 className="text-xl font-bold">{mesa.codigo}</h3>
                                <p>Capacidad: {mesa.capacidad}</p>
                                <p>{mesa.ocupada ? "Ocupada" : "Libre"}</p>
                            </button>
                            ))}
                        </div>
                        )}
                    </section>
                    {/* Contenedor de botones */}
                    <div className="flex flex-col mb-16 md:flex-row gap-6">

                        {user ? (
                            <button
                                className="bg-white text-[#7646e5] border border-[#7646e5] font-bold px-10 py-4 rounded-xl transition-transform duration-300 hover:scale-120"
                                onClick={handleLogout}
                            >
                                LOGOUT
                            </button>
                        ) : (
                            <button
                                className="bg-white text-[#7646e5] border border-[#7646e5] font-bold px-10 py-4 rounded-xl transition-transform duration-300 hover:scale-120"
                                onClick={() => navigate('/login')}
                            >
                                USA TU CUENTA
                            </button>
                        )
                        }
                    </div>

                </div>
            </div>
        </>
    );
}

export default Home;