import React, { useState } from 'react';

function CrearCuenta() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Expresión regular para validar email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleLogin = (e) => {
        e.preventDefault();

        if (!emailRegex.test(email)) {
            setErrorMessage('⚠️ El correo electrónico no es válido.');
            return;
        }

        if(password !== password2){
            setErrorMessage('⚠️ Las contraeñas no coinciden');
            return;
        }
        setErrorMessage('');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#012340] text-white font-montserrat p-6">
            
            {/* TÍTULO */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold italic text-center mb-16 
                          [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)]">
                CREAR CUENTA
            </h1>

            {/* FORMULARIO */}
            <form className="bg-[#012340]/80 shadow-lg shadow-blue-500/50 rounded-xl px-8 pt-6 pb-8 w-80 
                            md:w-96 lg:w-[30rem] flex flex-col md:p-10 lg:p-12"
                  onSubmit={handleLogin}>

                {/* EMAIL */}
                <div className="mb-4">
                    <label className="text-white text-sm font-bold mb-2 block text-left" htmlFor="email">
                        EMAIL
                    </label>
                    <input
                        className="shadow-md border border-blue-500 rounded w-full py-2 px-3 text-white bg-transparent 
                                  leading-tight focus:outline-none focus:ring focus:border-blue-300"
                        type="text"
                        id="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* PASSWORD */}
                <div className="mb-6">
                    <label className="text-white text-sm font-bold mb-2 block text-left" htmlFor="password">
                        PASSWORD
                    </label>
                    <input
                        className="shadow-md border border-blue-500 rounded w-full py-2 px-3 text-white bg-transparent 
                                  leading-tight focus:outline-none focus:ring focus:border-blue-300"
                        type="password"
                        id="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* REPETIR PASSWORD */}
                <div className="mb-6">
                    <label className="text-white text-sm font-bold mb-2 block text-left" htmlFor="password2">
                        REPITE TU PASSWORD
                    </label>
                    <input
                        className="shadow-md border border-blue-500 rounded w-full py-2 px-3 text-white bg-transparent 
                                  leading-tight focus:outline-none focus:ring focus:border-blue-300"
                        type="password"
                        id="password2"
                        placeholder="******************"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </div>

                {/* MENSAJE DE ERROR */}
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

                {/* BOTÓN DE CREAR CUENTA */}
                <div className='m-6'>
                    <button className="bg-white w-full text-[#7646e5] border border-[#7646e5] font-bold py-3 px-6 text-lg 
                                       rounded-xl transition-transform duration-300 hover:scale-130"
                        type="submit">
                        CREAR CUENTA
                    </button>
                </div>

            </form>

        </div>
    );
}

export default CrearCuenta;