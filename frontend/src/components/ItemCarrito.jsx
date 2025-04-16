const ItemCarrito = ({ producto }) => {
    console.log("Producto en ItemCarrito:", producto); // Esto mostrará el contenido de producto en la consola


    return (
        <div className="flex flex-col justify-between mt-5 mb-5 w-full max-w-screen-md mx-auto   rounded-lg overflow-hidden ">
            <div className="flex items-center justify-between border rounded-xl p-4 mb-3 shadow bg-white">

                <div className="text-lg font-medium text-gray-800 flex-1">
                    {producto.nombre}
                </div>


                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-8 h-8 text-xl flex items-center justify-center">
                    −
                </button>


                <span className="mx-4 text-lg font-semibold text-gray-800">
                    {producto.pivot.cantidad}
                </span>


                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full w-8 h-8 text-xl flex items-center justify-center">
                    +
                </button>


                <div className="ml-6 text-lg font-bold text-gray-900">
                    {producto.precio * producto.pivot.cantidad} €
                </div>
            </div>

        </div>

    );
};

export default ItemCarrito;