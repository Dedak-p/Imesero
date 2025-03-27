import React from "react"
import { useNavigate } from "react-router-dom"




function Home() {
    const navigate = useNavigate();

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


                    <p className="text-2xl lg:text-3xl font-bold text-white text-center max-w-md lg:max-w-lg 
                                  mb-10 italic leading-relaxed">
                        Bienvenidos a nuestro software de gestión de comandas
                    </p>

                    {/* Contenedor de botones */}
                    <div className="flex flex-col mb-16 md:flex-row gap-6">
                        <button
                            className="bg-white text-[#7646e5] border border-[#7646e5] font-bold px-10 py-4 rounded-xl transition-transform duration-300 hover:scale-120"
                            onClick={() => navigate('/menu')}
                        >
                            VER MENÚ
                        </button>
                        <button
                            className="bg-white text-[#7646e5] border border-[#7646e5] font-bold px-10 py-4 rounded-xl transition-transform duration-300 hover:scale-120"
                            onClick={() => navigate('/login')}
                        >
                            USA TU CUENTA
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Home;