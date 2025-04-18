import React, { useState, useEffect, useContext, } from "react";
import {  useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import ItemCarrito from "../components/ItemCarrito";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const CarritoPage = () => {
  const { mesaId } = useContext(AppContext);
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pedidos = async () => {
      try {
        const response = await axios.get(
          `${window.location.protocol}//${window.location.hostname}:8000/api/comandaMesa/${mesaId}`
        );
        console.log(response.data);
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
    //Petición asíncrona
    const obtenerProductos = async () => {
      try {
        //Almacenamos el id de los productos devolviendome un map de idProductos
        const idsProductos = carrito.map(item => item.producto_id);
        //Realizamos tantas peticiónes como id de productos encontremos para que la api nos devuelva todos los productos
        const respuestas = await Promise.all(
          idsProductos.map(id =>
            axios.get(`${window.location.protocol}//${window.location.hostname}:8000/api/productos/${id}`)
          )
        );
        //Obtenemos la información de cada producto , accediendo a cada elemento de la respuesta 
        const productosData = respuestas.map(res => res.data);
        //Almacenamos los productos correspondientes al carrito y a la mesa 
        setProductos(productosData);
      } catch (error) {
        console.error("Error al cargar los productos", error);
      }
    };


    //Verificamos que existan pedidos dentro del carrito y llamamos a la función  que acabamos de definir 
    if (carrito.length > 0) {
      obtenerProductos();
    }
  }, [carrito]);


  const calcularTotal = () => {
    return productosAgrupados.reduce((total, item) => {
      const producto = productos.find(p => p.id === item.producto_id);
      return producto ? total + producto.precio * item.cantidad : total;
    }, 0);
  };


  // Agrupar pedidos por producto_id 
  // Función que muestra la cantidad X de productos coincidentes dentro de un mismo carrito 
  const agruparProductos = () => {
    const mapa = new Map(); // Creamos un Map para agrupar por producto_id

    // Para cada pedido dentro del carrito
    carrito.forEach((pedido) => {
      // Si ya hay un producto con ese producto_id en el mapa, aumentamos la cantidad
      if (mapa.has(pedido.producto_id)) {
        // Obtenemos el objeto existente y le sumamos 1 a la cantidad
        mapa.get(pedido.producto_id).cantidad += 1;
      } else {
        // Si no existe, lo agregamos al mapa con cantidad 1
        mapa.set(pedido.producto_id, { ...pedido, cantidad: 1 });
      }
    });

    // Convertimos el Map en un array de objetos agrupados y lo devolvemos
    return Array.from(mapa.values());
  };

  //Eliminamos un pedido de la comanda 
  const eliminarPedido = async (idPedido) => {
    try {
      await axios.delete(`${window.location.protocol}//${window.location.hostname}:8000/api/pedidos/${idPedido}`);
      // Actualizar carrito eliminando el pedido
      setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== idPedido));
    } catch (error) {
      console.error("Error al eliminar un pedido");
    }
  };






  //Función que elimina un producto de la vista de carrito, cuando el contador de cantidad llega a 0
  const handleRemoveFromCart = async (productoId) => {
    try {
      //Obtenemos el pedido a eliminar , buscamos en el carrito(conjunto de pedidos) , que pedidos tienen el mismo producto_id pasado por parámetro y eliminamos un pedido
      const pedidoAEliminar = carrito.find(item => item.producto_id === productoId);
      if (pedidoAEliminar) {
        //Llamamos a la API para eliminar un pedido 
        await eliminarPedido(pedidoAEliminar.id);
      }
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
    }
  };






  const handleAddToCart = async (producto) => {
    try {
      // Obtener el token de autenticación desde el localStorage (ajústalo según tu flujo)
      const token = localStorage.getItem('token');

      // Determinar el endpoint de acuerdo a la autenticación
      const endpoint = token
        ? `${window.location.protocol}//${window.location.hostname}:8000/api/pedidosAuth`  // Si el usuario está autenticado
        : `${window.location.protocol}//${window.location.hostname}:8000/api/pedidos`;      // Si no está autenticado

      // Realizar la solicitud POST con el header Authorization si hay un token
      const response = await axios.post(
        endpoint,
        {
          producto_id: producto.id,
          mesa_id: mesaId
        },
        {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}  // Añadir Authorization si hay token
        }
      );

      console.log(response.data.pedido);
      const pedido = response.data.pedido;
      const nuevoPedido = {
        id: pedido.id,
        user_id: pedido.user_id,
        producto_id: pedido.producto_id,
        mesa_id: mesaId,
        comanda_id: pedido.comanda_id,
      };

      // Añadirlo al carrito
      setCarrito(prevCarrito => [...prevCarrito, nuevoPedido]);
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };
  //Función que devuelve los productos agrupados según la cantidad de estos
  const productosAgrupados = agruparProductos();
  return (
    <>
      <Header />
      <div className="min-h-screen p-4 mt-25 flex-col justify-content align-items-center text-center text-white  bg-[#012340]">
        <SeccionTitulo titulo="Este es tu carrito" />

        <div className="mt-4">
          {productosAgrupados.length > 0 ?

            //Si existen productos dentro del carrito 
            (
              //Para cada item dentro de productosAgrupados ejecutamos la siguiente función anónima
              productosAgrupados.map((item) => {
                //Obtenemos el producto 
                const producto = productos.find(p => p.id === item.producto_id);
                return producto ? (

                  <ItemCarrito
                    key={producto.id}
                    producto={producto}
                    cantidad={item.cantidad}
                    productoId={producto.id}
                    onAdd={() => handleAddToCart(producto)}
                    onRemove={() => handleRemoveFromCart(producto.id)}
                  />
                ) : (
                  <p key={item.producto_id}>Cargando producto...</p>
                );
              })
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
        </div>

        <SeccionTitulo titulo={`Precio total: ${calcularTotal().toFixed(2)} €`} />

        {/* Botón de pago al final */}
        <div className="mt-6">
          <button
            onClick={() => navigate('/pagar')}
            className="bg-white text-[#7646e5] border border-[#7646e5] font-bold py-4 rounded-xl 
            transition-transform duration-300 hover:scale-120
            px-8 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-30"
          >
            Pagar ahora
          </button>
        </div>
      </div>
    </>
  );
};

export default CarritoPage;