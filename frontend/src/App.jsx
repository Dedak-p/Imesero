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
import EliminarProductos from './pages/EliminarProducto.jsx'
import ModificarProducto from './pages/ModificarProducto.jsx'
import EditarProducto from './pages/EditarProducto.jsx'
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return <>

    <Routes> 
      <Route path="/" element={<HomePage />} />  
      <Route path="/login" element={<Login />} /> 
      <Route path="/crearCuenta" element={<CrearCuenta />} />
      <Route path="/item" element={<ItemSelected />} />
      <Route path="/menu/:mesaId" element={<Menu />} />
      <Route path="/carrito/:mesaId" element={<CarritoPage />} />
      <Route path="/seguimiento" element={<SeguimientoPage />} />
      <Route path = "/usuario" element={<UsuarioPage />}/>
      <Route path = "/pagar" element={<PagarPage />} />
      <Route path="/menu" element={<Navigate to="/" replace />} />
      <Route path="/crearProducto" element={<CrearProducto />} />
      <Route path="/eliminarProducto" element={<EliminarProductos />} />
      <Route path="/modificarProducto" element={<ModificarProducto />} />
      <Route path="/modificarProducto/:id" element={<EditarProducto />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  </>


};

export default App
