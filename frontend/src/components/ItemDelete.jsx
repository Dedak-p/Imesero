import { useContext } from "react";
import { AppContext } from "../context/AppContext"
const Item = ({ producto, deleteProduct }) => {  // Cambié 'delete' a 'deleteProduct'
    const { lang } = useContext(AppContext);
    return (
        <div className="flex flex-col justify-between mt-6 mb-6 w-full max-w-screen-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-1">
                <div className="w-2/5 bg-gray-100 flex items-center justify-center p-4">
                    <img
                        src={`http://${window.location.hostname}:8000/storage/${producto.imagen}`}
                        alt={producto.nombre_lang}
                        className="max-w-full max-h-48 object-contain rounded"
                    />
                </div>
                <div className="w-3/5 p-6 flex flex-col justify-center">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">
                        {producto[`nombre_${lang}`]}
                    </h2>
                    <p className="text-base text-gray-600 mb-4">
                        {producto[`descripcion_${lang}`]}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                        {producto.precio} €
                    </p>
                </div>
            </div>
            <button
                onClick={() => deleteProduct(producto)}
                className="w-full py-3 bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-200"
            >
                {lang === 'ca' && 'Eliminar el producte'}
                {lang === 'es' && 'Eliminar el producto'}
                {lang === 'en' && 'Delete item'}
            </button>
        </div>
    );


};

export default Item;


