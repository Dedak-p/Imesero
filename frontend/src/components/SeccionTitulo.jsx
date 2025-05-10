import React from 'react';

/**
 * Props del componente SeccionTitulo.
 * @typedef {Object} SeccionTituloProps
 * @property {string} titulo - Texto que se mostrará como título de la sección.
 * @property {string} slug   - Identificador (id) para anclaje de la sección.
 */

/**
 * Componente que renderiza un título de sección con un borde inferior y anclaje.
 *
 * @component
 * @param {SeccionTituloProps} props
 * @param {string} props.titulo - Texto que se mostrará en el encabezado.
 * @param {string} props.slug   - Valor usado en el atributo `id` para enlace por fragmento.
 * @returns {JSX.Element} Elemento contenedor con el título estilizado.
 */
const SeccionTitulo = ({ titulo, slug }) => {
  return (
    <div
      id={slug}
      className="flex flex-col text-2xl items-center mt-2 border-b-2 w-[95%] "
    >
      <h2 className="pt-5">
        {titulo}
      </h2>
    </div>
  );
};

export default SeccionTitulo;
