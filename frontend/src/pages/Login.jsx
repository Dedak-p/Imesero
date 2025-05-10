import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../context/AppContext';

/**
 * Textos localizados para el formulario de login.
 * @typedef {Object} LoginTexts
 * @property {Object.<string,string>} login     - Texto del botón de login y título.
 * @property {Object.<string,string>} email     - Etiqueta para el campo de correo.
 * @property {Object.<string,string>} password  - Etiqueta para el campo de contraseña.
 * @property {Object.<string,string>} crear     - Texto del botón para crear cuenta.
 */

/**
 * Componente de formulario de autenticación de usuario.
 *
 * Muestra campos de email y contraseña, valida el email con una expresión regular,
 * envía la petición de login a la API, guarda el token y nombre de usuario en localStorage
 * y redirige al inicio o muestra mensajes de error.
 *
 * @component
 * @returns {JSX.Element} Elemento React para la página de login.
 */
function Login() {
  const navigate = useNavigate();
  const { setLang, lang, setToken } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Expresión regular para validar formato de correo electrónico.
   * @type {RegExp}
   */
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  /**
   * Gestiona el envío del formulario de login.
   * Valida el email, envía la petición POST a `/api/login`,
   * guarda el token y nombre de usuario en localStorage, actualiza el contexto
   * y redirige al inicio. Muestra mensaje de error si falla.
   *
   * @async
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de submit del formulario.
   */
  async function handleLogin(e) {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setErrorMessage('⚠️ El correo electrónico no es válido.');
      return;
    }
    setErrorMessage('');

    try {
      const response = await fetch(
        `${window.location.protocol}//${window.location.hostname}:8000/api/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en el servidor:', errorData);
        setErrorMessage(errorData.message || '⚠️ Error al identificarte.');
        return;
      }

      const data = await response.json();
      // Guardar token y usuario
      localStorage.setItem('token', data.token);
      setToken(data.token);
      localStorage.setItem('user', data.user.name);

      navigate('/');
    } catch (err) {
      console.error('Error en la solicitud:', err);
      setErrorMessage('⚠️ Error al conectar con el servidor.');
    }
  }

  /**
   * Textos localizados para elementos del formulario.
   * @type {LoginTexts}
   */
  const textos = {
    login: { es: "ACCEDER", ca: "ACCEDIR", en: "LOGIN" },
    email: { es: "CORREO", ca: "CORREU", en: "EMAIL" },
    password: { es: "CONTRASEÑA", ca: "CONTRASENYA", en: "PASSWORD" },
    crear: { es: "CREAR CUENTA", ca: "CREAR COMPTE", en: "CREATE ACCOUNT" },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#012340] text-white font-montserrat">
      {/* Selector de idioma */}
      <div className="absolute top-4 right-4 flex gap-3">
        {['es','ca','en'].map(code => (
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
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold italic text-center mb-16
                      [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)]">
        {textos.login[lang]}
      </h1>

      {/* Formulario */}
      <form
        className="bg-[#012340]/80 shadow-lg shadow-blue-500/50 rounded-xl px-8 pt-6 pb-8 w-80
                    md:w-96 lg:w-[28rem] flex flex-col lg:p-12"
        onSubmit={handleLogin}
      >
        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="text-white text-sm font-bold mb-4 block text-center"
          >
            {textos.email[lang]}
          </label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="email@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="shadow-md appearance-none border border-blue-500 rounded w-full py-2 px-3
                       text-white bg-transparent leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Contraseña */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="text-white text-sm font-bold mb-4 block text-center"
          >
            {textos.password[lang]}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="shadow-md appearance-none border border-blue-500 rounded w-full py-2 px-3
                       text-white bg-transparent leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Error */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {/* Botones */}
        <div className="m-6 flex flex-col md:flex-row gap-6">
          <button
            type="submit"
            className="bg-white w-full md:w-1/2 text-[#7646e5] border border-[#7646e5]
                       font-bold py-2 px-4 rounded-xl transition-transform duration-300 hover:scale-120"
          >
            {textos.login[lang]}
          </button>
          <button
            type="button"
            onClick={() => navigate('/crearCuenta')}
            className="bg-white w-full md:w-1/2 text-[#7646e5] border border-[#7646e5]
                       font-bold py-2 px-4 rounded-xl transition-transform duration-300 hover:scale-120"
          >
            {textos.crear[lang]}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
