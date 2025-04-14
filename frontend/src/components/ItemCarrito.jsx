import React from "react";

const ItemCarrito = ({ producto, cantidad, onIncrementar, onDecrementar, onRemove }) => {
  return (
    <div className="flex flex-col justify-between mt-5 mb-5 w-full max-w-screen-md mx-auto h-72 border border-gray-300 rounded-lg overflow-hidden shadow-md">
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

      <div className="flex items-center justify-between w-full py-2 px-4 border-t border-gray-300">
        <button
          onClick={onDecrementar}
          className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 transition"
        >
          -
        </button>
        <span className="text-lg font-semibold">{cantidad}</span>
        <button
          onClick={onIncrementar}
          className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 transition"
        >
          +
        </button>
      </div>

      <button
        onClick={() => onRemove(producto)}
        className="w-full py-2 bg-red-700 text-white border-t border-gray-300 hover:bg-red-600 transition-colors"
      >
        Eliminar del carrito
      </button>
    </div>
  );
};

export default ItemCarrito;