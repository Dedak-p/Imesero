import React from "react";
import Header from "../components/Header";
import Item from "../components/Item";
import SeccionTitulo from "../components/SeccionTitulo";

/**
 * Página de detalle de un ítem.
 *
 * Incluye el encabezado, muestra el componente `Item` con el ítem seleccionado,
 * y secciones de descripción e ingredientes con texto estático.
 *
 * @component
 * @returns {JSX.Element} Elemento React que representa la página de detalle de un ítem.
 */
const ItemPage = () => {
  return (
    <>
      <Header />
      <div className="p-4 mt-25 flex flex-col items-center">
        <SeccionTitulo titulo="Item seleccionado" />

        {/* Componente que muestra el ítem seleccionado */}
        <Item />

        <SeccionTitulo titulo="Descripción" />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis culpa nulla possimus architecto omnis beatae nisi quisquam numquam, veniam vitae placeat perferendis reprehenderit aperiam? Eum commodi animi ad saepe consequatur.
        </p>

        <SeccionTitulo titulo="Ingredientes" />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis culpa nulla possimus architecto omnis beatae nisi quisquam numquam, veniam vitae placeat perferendis reprehenderit aperiam? Eum commodi animi ad saepe consequatur.
        </p>
      </div>
    </>
  );
};

export default ItemPage;
