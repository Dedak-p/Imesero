import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from "../components/Header";
import Item from '../components/Item';
import SeccionTitulo from '../components/SeccionTitulo';

const MenuPage = () => {
  // Menú variable de estado = array vacío por defecto
  const [menu, setMenu] = useState([]);

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
      const response = await Axios.post('http://192.168.1.115:8000/api/pedidosP', {
        producto_id: producto.id,
        mesa_id: 1 // O la mesa que corresponda
      });
  
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
