import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import Item from "../components/Item";
import useApiCall from "../hooks/useApiCall";
import { AppContext } from "../context/AppContext.jsx";

const MenuPage = () => {
  const { mesaId, setMesaId } = useContext(AppContext); // Primero obtener setMesaId y mesaId desde el contexto
  const { mesaId: mesaObtenida } = useParams(); // ← Esto toma el "3" de /menu/3

  // Cuando el componente se monta, se setea el valor de mesaId
  useEffect(() => {
    if (mesaObtenida) {
      setMesaId(mesaObtenida); // Seteamos el nuevo id de la mesa
    }
  }, [mesaObtenida, setMesaId]); // Solo se ejecutará si cambia mesaObtenida

  console.log(mesaId);
  // Menú variable de estado = array vacío por defecto
  const { data: menu, loading, error, refetch } = useApiCall(`${window.location.protocol}//${window.location.hostname}:8000/api/productos`);

  console.log("El menu es:" + menu);
  const handleAddToCart = async (producto) => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del localStorage
      const isAuthenticated = !!token; // Verificar si el usuario está autenticado
  
      // Construir headers
      const headers = {
        "Content-Type": "application/json",
      };
  
      // Si el token está presente, agregarlo a las cabeceras
      if (isAuthenticated) {
        headers["Authorization"] = `Bearer ${token}`;
      }
  
      // Elegir el endpoint según autenticación
      const endpoint = isAuthenticated
        ? `/api/mesas/${mesaId}/itemsAuth`
        : `/api/mesas/${mesaId}/items`;
  
      const url = `${window.location.protocol}//${window.location.hostname}:8000${endpoint}`;
  
      // Realizar la solicitud POST
      const response = await Axios.post(
        url,
        {
          producto_id: producto.id,
          cantidad: 1,
        },
        {
          withCredentials: true, // Si usas cookies, mantenlo
          headers: headers,
        }
      );
  
      console.log("Producto añadido a la comanda:", response.data);
    } catch (error) {
      console.error("Error al añadir producto:", error.response?.data || error.message);
    }
  };
  
  return (
    <>
      <Header />

      <div className="p-4 mt-25 flex flex-col items-center">
        {/* Titulo de la sección Recomendación de la Casa */}
        <SeccionTitulo titulo="Recomendación de la casa" />



        {/* Iteramos dentro de cada categoria*/}
        <SeccionTitulo titulo="Primeros" slug="primeros"/>
        {menu
          .filter(item => item.categoria_id === 1)
          .map(item => (
            <Item key={item.id} producto={item} onAddToCart={handleAddToCart} />
          ))}

        <SeccionTitulo titulo="Segundos" slug="segundos"/>
        {menu
          .filter(item => item.categoria_id === 2)
          .map(item => (
            <Item key={item.id} producto={item} onAddToCart={handleAddToCart} />
          ))}

        <SeccionTitulo titulo="Postres" slug="postres"/>
        {menu
          .filter(item => item.categoria_id === 4)
          .map(item => (
            <Item key={item.id} producto={item} onAddToCart={handleAddToCart} />
          ))}

        <SeccionTitulo titulo="Bebidas" slug="bebidas"/>
        {menu
          .filter(item => item.categoria_id === 3)
          .map(item => (
            <Item key={item.id} producto={item} onAddToCart={handleAddToCart} />
          ))}
      </div>
    </>
  );
};

export default MenuPage;
