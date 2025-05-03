import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const ItemConfirmado = ({ producto, cantidad }) => {
  const { lang } = useContext(AppContext);
  return (
    <div className="flex flex-col justify-between mt-5 mb-5 w-full max-w-screen-md mx-auto border border-gray-600 rounded-lg overflow-hidden shadow-md bg-[#01344C]">
        <div className="flex flex-1">
            <div className="w-2/5 bg-gray-200 flex items-center justify-center p-2">
                <img
                    src={`http://${window.location.hostname}:8000/storage/${producto.imagen}`}
                    alt={producto.nombre_lang}
                    className="max-w-full max-h-48 object-contain"
                />
            </div>
            <div className="w-3/5 p-4 flex flex-col text-center justify-center text-white">
                <h2 className="text-lg font-semibold mb-2">{producto[`nombre_${lang}`]}</h2>
                <p className="text-sm text-gray-300 mb-2">{producto[`descripcion_${lang}`]}</p>
                <p className="text-md font-bold text-white mb-1">
                    {lang === 'es' && 'Cantidad'}
                    {lang === 'ca' && 'Quantitat'}
                    {lang === 'en' && 'Quantity'}: {cantidad}
                </p>
                <p className="text-md font-bold text-white">
                    Total: {(producto.precio * cantidad).toFixed(2)} €
                </p>
            </div>
        </div>
    </div>
);

};

export default ItemConfirmado;