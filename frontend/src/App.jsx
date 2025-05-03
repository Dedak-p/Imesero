import './App.css'
import Login from './pages/Login.jsx'
import HomePage from './pages/HomePage.jsx'
import CrearCuenta from './pages/CrearCuenta.jsx'
import ItemSelected  from "./pages/ItemSelected.jsx"
import CarritoPage from "./pages/Carrito.jsx";
import SeguimientoPage from "./pages/Seguimiento";
import NotFoundPage from "./pages/NotFounPage.jsx";
import Menu from "./pages/Menu.jsx";
import UsuarioPage from "./pages/Usuario.jsx";
import PagarPage from "./pages/Pagar.jsx";
import CrearProducto  from './pages/CrearProducto.jsx'
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return <>

    <Routes> {/*Definimos las rutas de la aplicación*/}
      <Route path="/" element={<HomePage />} />  {/*Devolvemos la pagina principal*/}
      <Route path="/login" element={<Login />} /> {/*Devolvemos Login*/}
      <Route path="/crearCuenta" element={<CrearCuenta />} /> {/*Devolvemos crear cuenta*/}
      <Route path="/item" element={<ItemSelected />} />
      <Route path="/menu/:mesaId" element={<Menu />} />
      <Route path="/carrito/:mesaId" element={<CarritoPage />} />
      <Route path="/seguimiento" element={<SeguimientoPage />} />
      <Route path = "/usuario" element={<UsuarioPage />}/>
      <Route path = "/pagar" element={<PagarPage />} />
      <Route path="/menu" element={<Navigate to="/" replace />} />
      <Route path="/crearProducto" element={<CrearProducto />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  </>


};

export default App
