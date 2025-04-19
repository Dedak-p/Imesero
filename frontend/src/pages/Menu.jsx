import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import Item from "../components/Item";
import useApiCall from "../hooks/useApiCall";
import { AppContext } from "../context/AppContext.jsx";

const Menu = () => {
  const { mesaId } = useParams();
  const { token } = useContext(AppContext);

  // Obtener todos los productos
  const { data: productos = [], loading, error } = useApiCall("/productos");

  // Al hacer click en “Añadir”…
  const handleAddToCart = async (producto) => {
    try {
      // Intenta leer comandaId de previous
      let comandaId = localStorage.getItem("comandaId");

      // Payload para la API
      const body = JSON.stringify({
        producto_id: producto.id,
        cantidad: 1,
      });

      const res = await fetch(
        `http://localhost:8000/api/mesas/${mesaId}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body,
        }
      );

      if (!res.ok) {
        const err = await res.json();
        console.error("Error añadiendo al carrito:", err);
        return;
      }

      const item = await res.json();

      // Si es la primera vez, almacena comandaId en localStorage
      if (!comandaId) {
        comandaId = item.comanda_id;
        localStorage.setItem("comandaId", comandaId);
      }

      // Opción: guardar la lista de ítems localmente para mostrar un badge
      const current = JSON.parse(localStorage.getItem("cartItems") || "[]");
      current.push(item);
      localStorage.setItem("cartItems", JSON.stringify(current));

      alert(`Añadido ${producto.nombre} (comanda #${comandaId})`);
    } catch (e) {
      console.error("Error de red:", e);
    }
  };

  if (loading) return <p>Cargando productos…</p>;
  if (error) return <p>Error al cargar productos.</p>;

  // Agrupamos por categoría
  const categorias = Array.from(
    new Set(productos.map((p) => p.categoria_id))
  ).map((catId) =>
    productos.filter((p) => p.categoria_id === catId)
  );

  return (
    <>
      <Header />
      <div className="p-4 mt-20">
        {/* Opcional: sección de recomendados */}
        {productos.some((p) => p.recomendada) && (
          <>
            <SeccionTitulo titulo="Recomendaciones de la casa" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {productos
                .filter((p) => p.recomendada)
                .map((p) => (
                  <Item
                    key={p.id}
                    producto={p}
                    onAddToCart={() => handleAddToCart(p)}
                  />
                ))}
            </div>
          </>
        )}

        {/* Resto de categorías */}
        {categorias.map((grupo, i) => {
          console.log(grupo);
          const nombreCat = productos.filter((p) => p.categoria_id === grupo.id); // asumes que tus productos traen “categoria”
          return (
            <React.Fragment key={i}>
              <SeccionTitulo titulo={nombreCat} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {grupo.map((p) => (
                  <Item
                    key={p.id}
                    producto={p}
                    onAddToCart={() => handleAddToCart(p)}
                  />
                ))}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Menu;
