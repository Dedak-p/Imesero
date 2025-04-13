import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../context/AppContext';

function Login() {
  const navigate = useNavigate();
  const  {setToken} = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  // Expresión regular para validar email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  async function handleLogin(e) {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setErrorMessage('⚠️ El correo electrónico no es válido.');
      return;
    }

    setErrorMessage('');

    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      if (!response.ok) {
        // Si el servidor devuelve un error (como 500), lanza un error
        const errorData = await response.json();
        console.error('Error en el servidor:', errorData);
        setErrorMessage(errorData.message || '⚠️ Error al identificarte.');
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