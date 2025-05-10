import './App.css';
import Login from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';
import CrearCuenta from './pages/CrearCuenta.jsx';
import ItemSelected from "./pages/ItemSelected.jsx";
import CarritoPage from "./pages/Carrito.jsx";
import SeguimientoPage from "./pages/Seguimiento";
import NotFoundPage from "./pages/NotFounPage.jsx";
import Menu from "./pages/Menu.jsx";
import UsuarioPage from "./pages/Usuario.jsx";
import PagarPage from "./pages/Pagar.jsx";
import CrearProducto from './pages/CrearProducto.jsx';
import EliminarProductos from './pages/EliminarProducto.jsx';
import ModificarProducto from './pages/ModificarProducto.jsx';
import EditarProducto from './pages/EditarProducto.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';

/**
 * Componente raíz de la aplicación que define la navegación.
 *
 * Encapsula todas las rutas de la SPA usando React Router v6,
 * mapeando cada path a su componente de página correspondiente.
 *
 * @component
 * @returns {JSX.Element} El árbol de rutas de la aplicación.
 */
function App() {
  return (
    <Routes>
      {/*
        Página principal de bienvenida.
      */}
      <Route path="/" element={<HomePage />} />

      {/*
        Rutas de autenticación y cuenta.
      */}
      <Route path="/login" element={<Login />} />
      <Route path="/crearCuenta" element={<CrearCuenta />} />

      {/*
        Rutas de navegación de ítem y menú.
      */}
      <Route path="/item" element={<ItemSelected />} />
      <Route path="/menu/:mesaId" element={<Menu />} />
      <Route path="/menu" element={<Navigate to="/" replace />} />

      {/*
        Rutas de carrito, seguimiento y pago.
      */}
      <Route path="/carrito/:mesaId" element={<CarritoPage />} />
      <Route path="/seguimiento" element={<SeguimientoPage />} />
      <Route path="/pagar" element={<PagarPage />} />

      {/*
        Páginas de usuario y administración.
      */}
      <Route path="/usuario" element={<UsuarioPage />} />
      <Route path="/crearProducto" element={<CrearProducto />} />
      <Route path="/eliminarProducto" element={<EliminarProductos />} />
      <Route path="/modificarProducto" element={<ModificarProducto />} />
      <Route path="/modificarProducto/:id" element={<EditarProducto />} />

      {/*
        Ruta comodín para páginas no encontradas.
      */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
