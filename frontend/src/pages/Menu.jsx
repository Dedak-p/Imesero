import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Header from "../components/Header";
import Item from '../components/Item';
import SeccionTitulo from '../components/SeccionTitulo';
import { AppContext } from "../context/AppContext.jsx"

const MenuPage = () => {
  // Menú variable de estado = array vacío por defecto
  const [menu, setMenu] = useState([]);

  const { mesaId } = useContext(AppContext);

  useEffect(() => {
    // Hacemos la llamada a la API para obtener los productos
    Axios({
      url: `${window.location.protocol}//${window.location.hostname}:8000/api/productos`,
    }).then((response) => {
      setMenu(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);


  const handleAddToCart = async (producto) => {
    try {
      // Obtener el token de autenticación desde el localStorage (ajústalo según tu flujo)
      const token = localStorage.getItem('token');  

      // Determinar el endpoint de acuerdo a la autenticación
      const endpoint = token 
        ? `${window.location.protocol}//${window.location.hostname}:8000/api/pedidosAuth`  // Si el usuario está autenticado
        : `${window.location.protocol}//${window.location.hostname}:8000/api/pedidos`;      // Si no está autenticado

      // Realizar la solicitud POST con el header Authorization si hay un token
      const response = await Axios.post(
        endpoint,
        {
          producto_id: producto.id,
          mesa_id: mesaId 
        },
        {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}  // Añadir Authorization si hay token
        }
      );

      console.log('Pedido creado en el backend correctamente:', response.data);

      // Aquí podrías mostrar un mensaje de éxito si quieres
      // alert('Pedido añadido correctamente');

    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };


  return (
    <>
      <Header />

      <div className="p-4 mt-25 flex flex-col items-center">
        {/* Titulo de la sección Recomendación de la Casa */}
        <SeccionTitulo titulo="Recomendación de la casa" />



        {/* Iteramos dentro de cada categoria*/}
        <SeccionTitulo titulo="Primeros" />
        {menu
          .filter(item => item.categoria === "Primeros")
          .map(item => (
            <Item key={item.id} producto={item} onAddToCart={handleAddToCart} />
          ))}

        <SeccionTitulo titulo="Segundos" />
        {menu
          .filter(item => item.categoria === "Segundos")
          .map(item => (
            <Item key={item.id} producto={item} onAddToCart={handleAddToCart} />
          ))}

        <SeccionTitulo titulo="Postres" />
        {menu
          .filter(item => item.categoria === "Postres")
          .map(item => (
            <Item key={item.id} producto={item} onAddToCart={handleAddToCart} />
          ))}

        <SeccionTitulo titulo="Bebidas" />
        {menu
          .filter(item => item.categoria === "Bebidas")
          .map(item => (
            <Item key={item.id} producto={item} onAddToCart={handleAddToCart} />
          ))}
      </div>
    </>
  );
};

export default MenuPage;
