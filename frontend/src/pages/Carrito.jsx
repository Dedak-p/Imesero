import { useEffect, useState } from "react";
import Header from "../components/Header";
import SeccionTitulo from "../components/SeccionTitulo";
import Item from "../components/Item";

const CarritoPage = () => {


    const [carrito, setCarrito] = useState([]);

    useEffect(() => {

        const carritoAlmacenado = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(carritoAlmacenado);
    }, []);

    return (
        <>
          <Header />
          <div className="p-4 mt-25 flex-col justify-content align-items-center text-center">
            <SeccionTitulo titulo="Este es tu carrito"/>
    
            {/* Mostrar los productos en el carrito */}
            <div className ="mt-4">
            {carrito.length > 0 ? (
              carrito.map((item, index) => (
                <Item key={item.id} producto={item} />
              ))
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
          </div>
          </div>
        </>
      );
    };
    
    export default CarritoPage;