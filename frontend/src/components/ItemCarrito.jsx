import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const ItemCarrito = ({ producto, cantidad, onAdd, onRemove }) => {
  const {lang} = useContext(AppContext);
  return (
    <div className="flex flex-col justify-between mt-5 mb-5 w-full max-w-screen-md mx-auto h-72 border border-gray-600 rounded-lg overflow-hidden shadow-md bg-[#01344C]">
      <div className="flex flex-1">
        <div className="w-2/5 bg-gray-200 flex items-center justify-center">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="max-w-full max-h-full"
          />
        </div>
        <div className="w-3/5 p-2 flex flex-col text-center justify-center text-white">
          <h2 className="text-lg font-semibold mb-2">{producto[`nombre_${lang}`]}</h2>
          <p className="text-sm text-gray-300 mb-2">{producto[`descripcion_${lang}`]}</p>
          <p className="text-md font-bold text-white">
            {producto.precio * cantidad} €
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full py-2 px-4 border-t border-gray-600">
        <button
          onClick={() => onRemove(producto)}
          className="bg-greey text-white px-2 py-1 rounded transition-transform duration-300 hover:scale-200"
        >
          -
        </button>
        <span className="text-lg font-bold text-white">{cantidad}</span>
        <button
          onClick={() => onAdd(producto)}
          className="bg-greey text-white px-2 py-1 rounded transition-transform duration-300 hover:scale-200"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ItemCarrito;