import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Header from "../components/Header";
import Item from '../components/Item';
import SeccionTitulo from '../components/SeccionTitulo';
import useApiCall from "../hooks/useApiCall";

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
      const response = await Axios.post(`${window.location.protocol}//${window.location.hostname}:8000/api/mesas/${mesaId}/items`, {
        producto_id: producto.id,
        cantidad: 1,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      });

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
        <SeccionTitulo titulo="Primeros" />
        {menu
          .filter(item => item.categoria_id === 1)
          .map(item => (
            <Item key={item.id} producto={item} onAddToCart={handleAddToCart} />
          ))}

        <SeccionTitulo titulo="Segundos" />
        {menu
          .filter(item => item.categoria_id === 2)
          .map(item => (
            <Item key={item.id} producto={item} onAddToCart={handleAddToCart} />
          ))}

        <SeccionTitulo titulo="Postres" />
        {menu
          .filter(item => item.categoria_id === 4)
          .map(item => (
            <Item key={item.id} producto={item} onAddToCart={handleAddToCart} />
          ))}

        <SeccionTitulo titulo="Bebidas" />
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
