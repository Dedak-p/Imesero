import React from "react";

const ItemCarrito = ({ producto, cantidad, onAdd, onRemove }) => {
  return (
    <div className="flex mt-5 mb-5 w-full max-w-screen-md mx-auto h-72 border border-gray-300 rounded-lg overflow-hidden shadow-md">
      
      {/* Botones +/- a la izquierda */}
      <div className="flex flex-col items-center justify-center bg-gray-100 px-3">
        <button
          onClick={() => onAdd(producto)}
          className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 transition mb-2"
        >
          +
        </button>
        <span className="text-lg font-semibold">{cantidad}</span>
        <button
          onClick={() => onRemove(producto)}
          className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 transition mt-2"
        >
          -
        </button>
      </div>

      {/* Contenido del producto */}
      <div className="flex flex-1">
        <div className="w-2/5 bg-gray-200 flex items-center justify-center">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="max-w-full max-h-full"
          />
        </div>
        <div className="w-3/5 p-2 flex flex-col text-center justify-center">
          <h2 className="text-lg font-semibold mb-2">{producto.nombre}</h2>
          <p className="text-sm text-gray-600 mb-2">{producto.descripcion}</p>
          <p className="text-md font-bold text-black">{producto.precio * cantidad} €</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCarrito;
