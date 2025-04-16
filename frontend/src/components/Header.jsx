import { Link } from "react-router-dom";
//import '../styles/Header.css';

import Flecha from "../assets/flecha.svg";
import Usuario from "../assets/usuario.svg";
import Caja from "../assets/caja.svg";

const Header = () => {
  return (
    <header className="fixed top-0 left-0  flex flex-col p-4  bg-blue-950 shadow-md  w-full">
      <div className="flex  items-center gap-2  ">

        <button className=" p-2 rounded-full justify-items-start">
          <img src={Flecha} alt="Icono personalizado" className="w-10 h-7" />
        </button>

        <div className="flex items-center justify-end gap-2">
          <button className=" ">
            <img src={Usuario} alt="Icono personalizado" className="w-10 h-7" />
          </button>

        <Link to="/carrito">
          <button className="  ">
            <img src={Caja} alt="Icono personalizado" className="w-10 h-7 " />
          </button>
        </Link>
        </div>
      </div>


      <div className="flex flex-col items-center">
        <nav className="flex gap-6 text-white font-semibold">
          <Link to="/platos-calientes" className="hover:text-gray-900">
            PLATOS CALIENTES
          </Link>
          <Link to="/platos-frios" className="hover:text-gray-900">
            PLATOS FRIOS
          </Link>
          <Link to="/bebidas" className="hover:text-gray-900">
            BEBIDAS
          </Link>
        </nav>

      </div>

    </header>
  );
};

export default Header;