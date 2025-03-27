import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Expresión regular para validar email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setErrorMessage('⚠️ El correo electrónico no es válido.');
      return;
    }

    setErrorMessage('');
  };

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-[#012340] text-white font-montserrat">

      {/* TÍTULO LOGIN */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold italic text-center mb-16 
                  [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)]">
        LOGIN
      </h1>

      <form className="bg-[#012340]/80 shadow-lg shadow-blue-500/50 rounded-xl px-8 pt-6 pb-8 w-80 
                    md:w-96 lg:w-[28rem] flex flex-col lg:p-12"
        onSubmit={handleLogin}>
        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-white text-sm font-bold mb-4 block text-center" htmlFor="email">
            EMAIL
          </label>
          <input
            className="shadow-md appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white bg-transparent 
                    leading-tight focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            name="email"
            id="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-white text-sm font-bold mb-4 block text-center" htmlFor="password">
            PASSWORD
          </label>
          <input
            className="shadow-md appearance-none border border-blue-500 rounded w-full py-2 px-3 text-white bg-transparent 
                    leading-tight focus:outline-none focus:ring focus:border-blue-300"
            type="password"
            name="password"
            id="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        {/* BOTONES */}
        <div className="m-6 flex flex-col md:flex-row gap-6">
          <button className="bg-white w-full md:w-1/2 text-[#7646e5] border border-[#7646e5] font-bold py-2 px-4 
                          rounded-xl transition-transform duration-300 hover:scale-120"
            type="submit">
            ACCEDER
          </button>
          <button className="bg-white w-full md:w-1/2 text-[#7646e5] border border-[#7646e5] font-bold py-2 px-4 
                          rounded-xl transition-transform duration-300 hover:scale-120"
            onClick={() => navigate('/crearCuenta')}>
            CREAR CUENTA
          </button>
        </div>

      </form>

    </div>
  );
}

export default Login;