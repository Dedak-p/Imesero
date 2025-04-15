import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from "../components/Header";
import Item from '../components/Item';
import SeccionTitulo from '../components/SeccionTitulo';

const MenuPage = () => {
  // Menú variable de estado = array vacío por defecto
  const [menu, setMenu] = useState([]);
  const [comanda, setComanda] = useState([]);

  useEffect(() => {
    // Hacemos la llamada a la API para obtener los productos
    Axios({
      url: "http://localhost:8000/api/productos"
    }).then((response) => {
      setMenu(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);


  const handleAddToCart = async (producto) => {
    try {
      // Verificar si ya existe una comanda activa
      let comandaId = localStorage.getItem("comandaId");
  
      if (!comandaId) {
        // Crear una nueva comanda si no existe
        const response = await Axios.post("http://localhost:8000/api/comandas", {
          user_id: 1, // Cambia esto por el ID del usuario actual
          mesa: 1, // Cambia esto por el número de mesa actual
          estado: "pendiente",
          fecha: new Date().toISOString(),
          total: 0, // Inicialmente 0, se actualizará más tarde
          forma_pago: "pendiente" // Cambia según sea necesario
        });
  
        // Guardar el ID de la comanda creada
        comandaId = response.data.id;
        localStorage.setItem("comandaId", comandaId);
      }
  
      // Agregar el producto a la tabla comanda_producto
      await Axios.post("http://localhost:8000/api/comanda_producto", {
        comanda_id: comandaId,
        producto_id: producto.id,
        cantidad: 1 // Cambia esto según la cantidad deseada
      });
  
      console.log("Producto agregado a la comanda.");
    } catch (error) {
      console.error("Error al agregar el producto a la comanda:", error);
    }
  };

  /*const handleCreateComanda = () => {
    
  }*/

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
