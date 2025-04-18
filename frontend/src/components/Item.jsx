const Item = ({ producto, onAddToCart }) => {
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
          <p className="text-md font-bold text-black">{producto.precio} €</p>
        </div>
      </div>
      <button onClick={() => onAddToCart(producto)} className="w-full py-2 bg-blue-700 text-white border-t border-gray-300 hover:bg-blue-600 transition-colors">
        Añadir al carrito
      </button>
    </div>
  );
};

export default Item;