import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import ItemCarrito from "../components/ItemCarrito";
import Axios from "axios";

const CarritoPage = () => {
  const { mesaId } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mesaId) {
      setError("No se ha asignado un ID de mesa.");
      return;
    }

    const fetchComandaAndItems = async () => {
      try {
        const mesaResponse = await fetch(`http://${window.location.hostname}:8000/api/mesas/${mesaId}`);
        if (!mesaResponse.ok) throw new Error("No se pudo obtener la mesa");
        const mesaData = await mesaResponse.json();

        if (!mesaData.comanda.id) {
          setError("La mesa no tiene una comanda asociada");
          return;
        }

        const comandaId = mesaData.comanda.id;

        const itemsResponse = await fetch(`http://${window.location.hostname}:8000/api/comandas/${comandaId}/items`);
        if (!itemsResponse.ok) throw new Error("No se pudieron obtener los ítems de la comanda");
        const itemsData = await itemsResponse.json();

        const itemsAgrupados = itemsData.reduce((acc, item) => {
          const existingItem = acc.find((i) => i.producto.id === item.producto.id);
          if (existingItem) {
            existingItem.cantidad += item.cantidad;
          } else {
            acc.push({ ...item });
          }
          return acc;
        }, []);

        setItems(itemsAgrupados);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchComandaAndItems();
  }, [mesaId]);

  // Añadir producto desde backend
  const añadirCarrito = async (producto) => {
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
      añadirItemFront(producto);
      console.log("Producto añadido a la comanda:", response.data);
    } catch (error) {
      console.error("Error al añadir producto:", error.response?.data || error.message);
    }
  };

  // Eliminar producto desde backend
  const eliminarCarrito = async (productoId) => {
    try {
      const response = await Axios.post(
        `${window.location.protocol}//${window.location.hostname}:8000/api/mesas/${mesaId}/items`,
        {
          producto_id: productoId,
          cantidad: -1,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Producto eliminado:", response.data);
      eliminarItemFront(productoId);
    } catch (error) {
      console.error("Error al eliminar producto:", error.response?.data || error.message);
    }
  };

  const añadirItemFront = (producto) => {
    setItems((prevItems) => {
      const updated = prevItems.map((item) =>
        item.producto.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      return updated;
    });
  };

  const eliminarItemFront = (productoId) => {
    setItems((prevItems) => {
      const updated = prevItems
        .map((item) =>
          item.producto.id === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0);
      return updated;
    });
  };

  const calcularTotal = () =>
    items.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen p-4 mt-25 flex-col justify-content align-items-center text-center text-white bg-[#012340]">
        <SeccionTitulo titulo="Este es tu carrito" />
        <div className="mt-4">
          {items.length > 0 ? (
            items.map((item) => {
              const producto = item.producto;
              return producto ? (
                <ItemCarrito
                  key={producto.id}
                  producto={producto}
                  cantidad={item.cantidad}
                  onAdd={() => añadirCarrito(producto)}
                  onRemove={() => eliminarCarrito(producto.id)}
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

        <div className="mt-6">
          <button
            onClick={() => navigate("/pagar")}
            className="bg-white text-[#7646e5] border border-[#7646e5] font-bold py-4 rounded-xl transition-transform duration-300 hover:scale-120 px-8 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-30"
          >
            Confirmar Comanda
          </button>
        </div>
      </div>
    </>
  );
};

export default CarritoPage;
