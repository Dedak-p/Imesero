
import Item from '../components/ItemDelete.jsx';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import useApiCall from '../hooks/useApiCall';

const EliminarProductos = () => {
    const [productos, setProductos] = useState([]);
    const { token } = useContext(AppContext);

    const { data: menu, loading, error, refetch } = useApiCall(`${window.location.protocol}//${window.location.hostname}:8000/api/productos`);

    useEffect(() => {
        if (menu) {
            setProductos(menu);
        }
    }, [menu]);

    const eliminarProducto = async (producto) => {
        try {
            const response = await fetch(`http://${window.location.hostname}:8000/api/productos/${producto.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
             
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                // Actualiza el estado para eliminar el producto de la lista
                setProductos((prevProductos) =>
                    prevProductos.filter((p) => p.id !== producto.id)
                );
            } else {
                console.error(data.message || 'Error eliminando el producto');
            }
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    };

    if (loading) return <p className="text-white text-center mt-4">Cargando productos...</p>;
    if (error) return <p className="text-red-500 text-center mt-4">Error al cargar los productos.</p>;

    return (
        <div className="max-w mx-auto p-4 bg-[#012340]">
            <h1 className="text-6xl lg:text-7xl font-bold text-white italic text-center mb-12 
                                   [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)]">Eliminar Productos</h1>
            {productos.length === 0 ? (
                <p className="text-center text-gray-300">No hay productos disponibles para eliminar.</p>
            ) : (
                productos.map((producto) => (
                    <div className="mb-8"> {/* Añadimos margen inferior a cada Item */}
                        <Item
                            key={producto.id}
                            producto={producto}
                            deleteProduct={() => eliminarProducto(producto)}
                        />
                    </div>
                ))
            )}
        </div>
    );
    
};

export default EliminarProductos;
