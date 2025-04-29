import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function CrearCuenta() {
    const navigate = useNavigate();
    const { setLang, lang, setToken } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Expresión regular para validar email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    async function handleLogin(e) {
        e.preventDefault();

        if (!emailRegex.test(email)) {
            setErrorMessage('⚠️ El correo electrónico no es válido.');
            return;
        }

        if (password !== password2) {
            setErrorMessage('⚠️ Las contraeñas no coinciden');
            return;
        }
        setErrorMessage('');

        try {
            const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: email,
                    email: email,
                    password: password,
                    password_confirmation: password2,
                }),
            })

            if (!response.ok) {
                // Si el servidor devuelve un error (como 500), lanza un error
                const errorData = await response.json();
                console.error('Error en el servidor:', errorData);
                setErrorMessage(errorData.message || '⚠️ Error al crear la cuenta.');
                return;
            }

            const data = await response.json();
            console.log('La data recibida es: ', data);

            // Guardar el token en el localStorage
            localStorage.setItem('token', data.token);
            setToken(data.token);

            // Guardar el nombre de usuario en el localStorage
            localStorage.setItem('user', data.user.name);

            // Redirigir al usuario a la página de inicio
            navigate('/');

        } catch (error) {
            console.error('Error en la solicitud:', error);
            setErrorMessage('⚠️ Error al conectar con el servidor.');
        }

    };

    const textos = {
        crear: {
            es: "CREAR CUENTA",
            en: "CREATE ACCOUNT",
            ca: "CREAR COMPTE"
        },
        email: {
            es: "CORREO",
            en: "EMAIL",
            ca: "CORREU"
        },

        password: {

            es: "CONTRASEÑA",
            en: "PASSWORD",
            ca: "CONTRASENYA"
        },

        repite: {
            es: "REPITE TU CONTRASEÑA",
            en: "REPEAT YOUR PASSWORD",
            ca: "REPETEIX LA TEVA CONTRASENYA"
        }



    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#012340] text-white font-montserrat p-6">
            <div className="absolute top-4 right-4 flex gap-3">
                <button
                    onClick={() => setLang('es')}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 ${lang === 'es'
                        ? 'bg-white text-[#012340] border-white'
                        : 'bg-transparent text-white border-white hover:bg-white hover:text-[#012340]'
                        }`}
                >
                    ES
                </button>
                <button
                    onClick={() => setLang('ca')}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 ${lang === 'ca'
                        ? 'bg-white text-[#012340] border-white'
                        : 'bg-transparent text-white border-white hover:bg-white hover:text-[#012340]'
                        }`}
                >
                    CA
                </button>
                <button
                    onClick={() => setLang('en')}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 ${lang === 'en'
                        ? 'bg-white text-[#012340] border-white'
                        : 'bg-transparent text-white border-white hover:bg-white hover:text-[#012340]'
                        }`}
                >
                    EN
                </button>
            </div>
            {/* TÍTULO */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold italic text-center mb-16 
                          [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)]">
                {textos.crear[lang]}
            </h1>

            {/* FORMULARIO */}
            <form className="bg-[#012340]/80 shadow-lg shadow-blue-500/50 rounded-xl px-8 pt-6 pb-8 w-80 
                            md:w-96 lg:w-[30rem] flex flex-col md:p-10 lg:p-12"
                onSubmit={handleLogin}>

                {/* EMAIL */}
                <div className="mb-4">
                    <label className="text-white text-sm font-bold mb-2 block text-left" htmlFor="email">
                        {textos.email[lang]}
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
                        {textos.password[lang]}
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
                        {textos.repite[lang]}
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
                        {textos.crear[lang]}
                    </button>
                </div>

            </form>

        </div>
    );
}

export default CrearCuenta;