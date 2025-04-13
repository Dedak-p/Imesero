import React, { useState, useEffect } from "react";
import Header from "../components/Header"; // Asegúrate de tener el componente Header
import SeccionTitulo from "../components/SeccionTitulo"; // Asegúrate de tener este componente
import ItemCarrito from "../components/ItemCarrito"; // Asegúrate de tener este componente

const CarritoPage = () => {


 /* const [carrito, setCarrito] = useState([]);

  // Cargar el carrito desde el localStorage
  useEffect(() => {
    const storedCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(storedCarrito);
  }, []);

  // Actualizar la cantidad de un producto en el carrito
  const updateQuantity = (producto, cantidad) => {
    //Iniciamos la variabl updateCarrito que sera igual a un mapeo de productos donde el producto sea igual al 
    const updatedCarrito = carrito.map(item =>
      item.id === producto.id ? { ...item, cantidad: cantidad } : item
    );
    //Modificamos el carrito
    setCarrito(updatedCarrito);
    //Seteamos el carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(updatedCarrito));
  };

  // Eliminar un producto del carrito
  const removeFromCart = (producto) => {
    const updatedCarrito = carrito.filter(item => item.id !== producto.id);
    setCarrito(updatedCarrito);
    localStorage.setItem("carrito", JSON.stringify(updatedCarrito));
  };
*/
  //Comprobar previamente si un mismo pedido de un mismo usuario 
  return (
    <>
      <Header />
      <div className="p-4 mt-25 flex-col justify-content align-items-center text-center">
        <SeccionTitulo titulo="Este es tu carrito" />
        
        {/* Mostrar los productos en el carrito */}
        <div className="mt-4">
          {carrito.length > 0 ? (
            carrito.map((item) => (
              <ItemCarrito
                key={item.id}
                producto={item}
                onRemoveFromCart={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))
          ) : (
            <p>No hay productos en el carrito.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CarritoPage;
