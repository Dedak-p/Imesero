import './App.css'
import Login from './pages/Login.jsx'
import HomePage from './pages/HomePage.jsx'
import CrearCuenta from './pages/CrearCuenta.jsx'
import { Route, Routes } from 'react-router-dom';

function App() {
  return <>

    <Routes> {/*Definimos las rutas de la aplicación*/}
      <Route path="/" element={<HomePage />} />  {/*Devolvemos la pagina principal*/}
      <Route path="/login" element={<Login />} /> {/*Devolvemos Login*/}
      <Route path="/menu" element={<HomePage />} /> {/*Devolvemos menú*/}
      <Route path="/crearCuenta" element={<CrearCuenta />} /> {/*Devolvemos crear cuenta*/}
    </Routes>

  </>


};

export default App
