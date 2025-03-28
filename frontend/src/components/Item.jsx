
const Item = () => {
  return (
    <div className="flex flex-col justify-between mt-5 mb-5 w-full max-w-screen-md mx-auto h-72 border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <div className="flex flex-1">
        <div className="w-2/5 bg-gray-200 flex items-center justify-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Placeholder"
            className="max-w-full max-h-full"
          />
        </div>
        <div className="w-3/5 p-2 flex flex-col justify-center">
          <h2 className="text-lg font-semibold mb-2">Item Title</h2>
          <p className="text-sm text-gray-600">
            This is a description of the item. It provides more details about the item.
          </p>
        </div>
      </div>
      <button className="w-full py-2 bg-blue-500 text-white border-t border-gray-300 hover:bg-blue-600 transition-colors">
        Add to Cart
      </button>
    </div>
  );
};

export default Item;