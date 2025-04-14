import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import ItemCarrito from "../components/ItemCarrito";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const CarritoPage = () => {
  const { mesaId } = useContext(AppContext);
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const pedidos = async () => {
      try {
        const response = await axios.get(
          `${window.location.protocol}//${window.location.hostname}:8000/api/comandaMesa/${mesaId}`
        );
        setCarrito(response.data);
      } catch (error) {
        console.error("Error al cargar los pedidos del carrito", error);
      }
    };
    if (mesaId) {
      pedidos();
    }
  }, [mesaId]);

  // Obtener los productos con base en los ids del carrito
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const idsProductos = carrito.map(item => item.producto_id);
        const respuestas = await Promise.all(
          idsProductos.map(id =>
            axios.get(`${window.location.protocol}//${window.location.hostname}:8000/api/productos/${id}`)
          )
        );
        const productosData = respuestas.map(res => res.data);
        setProductos(productosData);
      } catch (error) {
        console.error("Error al cargar los productos", error);
      }
    };

    if (carrito.length > 0) {
      obtenerProductos();
    }
  }, [carrito]);

  // Agrupar productos por producto_id
  const agruparProductos = () => {
    const mapa = new Map();

    carrito.forEach((item) => {
      if (mapa.has(item.producto_id)) {
        mapa.get(item.producto_id).cantidad += 1;
      } else {
        mapa.set(item.producto_id, { ...item, cantidad: 1 });
      }
    });

    return Array.from(mapa.values());
  };

  const eliminarPedido = async (idPedido) => {
    try {
      await axios.delete(`${window.location.protocol}//${window.location.hostname}:8000/api/pedidos/${idPedido}`);
      // Actualizar carrito eliminando el pedido
      setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== idPedido));
    } catch (error) {
      console.error("Error al eliminar un pedido");
    }
  };

  const handleAddToCart = async (producto) => {
    try {
      const token = localStorage.getItem('token');

      const endpoint = token
        ? `${window.location.protocol}//${window.location.hostname}:8000/api/pedidosAuth`
        : `${window.location.protocol}//${window.location.hostname}:8000/api/pedidos`;

      const response = await axios.post(
        endpoint,
        {
          producto_id: producto.producto_id,
          mesa_id: mesaId
        },
        {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        }
      );

      console.log('Pedido creado correctamente:', response.data);

      setCarrito(prevCarrito => [...prevCarrito, response.data]);
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  const handleRemoveFromCart = async (producto) => {
    try {
      // Buscar un pedido específico de ese producto
      const pedidoAEliminar = carrito.find(item => item.producto_id === producto.producto_id);
      if (pedidoAEliminar) {
        await eliminarPedido(pedidoAEliminar.id);
      }
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
    }
  };

  const productosAgrupados = agruparProductos();

  return (
    <>
      <Header />
      <div className="p-4 mt-25 flex-col justify-content align-items-center text-center">
        <SeccionTitulo titulo="Este es tu carrito" />

        <div className="mt-4">
          {productosAgrupados.length > 0 ? (
            productosAgrupados.map((item) => {
              // Encuentra el producto correspondiente en los datos de productos
              const producto = productos.find(p => p.id === item.producto_id);
              return producto ? (
                <ItemCarrito
                  key={producto.id}
                  producto={producto}
                  cantidad={item.cantidad}
                  onAdd={() => handleAddToCart(producto)}
                  onRemove={() => handleRemoveFromCart(producto)}
                />
              ) : (
                <p key={item.producto_id}>Cargando producto...</p>
              );
            })
          ) : (
            <p>No hay productos en el carrito.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CarritoPage;