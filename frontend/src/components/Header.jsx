import { Link, useNavigate } from "react-router-dom";
//import '../styles/Header.css';
import Flecha from "../assets/flecha.svg";
import Usuario from "../assets/usuario.svg";
import Caja from "../assets/caja.svg";

const Header = () => {
  const navigate = useNavigate();

  function changeLanguage(ext) {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split("?")[0];
    window.location.href = `${baseUrl}?lang=${ext}`;

  }


  return (
    <header className="fixed top-0 left-0 flex flex-col p-4 bg-blue-950 shadow-md w-full">

      {/* Línea superior con botones e idioma */}
      <div className="flex items-center justify-between w-full">

        {/* Contenedor para la flecha, usuario y carrito */}
        <div className="flex items-center gap-4">
          {/* Botón Volver */}
          <button
            className="relative p-2 rounded-full group"  // Agregamos 'group' aquí
            onClick={() => navigate(-1)}
          >
            <span
              className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                transform: 'translate(-0%, 75px)', // Ajusta el desplazamiento hacia abajo
              }}
            
              >
              Volver
            </span>
            <img src={Flecha} alt="Icono personalizado" className="w-10 h-7 cursor-pointer" />
          </button>

          {/* Botón Usuario */}
          <button className="relative group" onClick={() => navigate("/usuario")}>  {/* Agregamos 'group' aquí */}
          <span
              className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                transform: 'translate(-0%, 75px)', // Ajusta el desplazamiento hacia abajo
              }}
            
              >
              Usuario
            </span>
            <img src={Usuario} alt="Icono personalizado" className="w-10 h-7 cursor-pointer" />
          </button>

          {/* Botón Carrito */}
          <button className="relative group" onClick={() => navigate("/carrito")}>  {/* Agregamos 'group' aquí */}
            <span
              className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                transform: 'translate(-0%, 75px)', // Ajusta el desplazamiento hacia abajo
              }}
            
              >
              Carrito
            </span>
            <img src={Caja} alt="Icono personalizado" className="w-10 h-7 cursor-pointer" />
          </button>
        </div>

        {/* Botón de idioma a la derecha */}
        <div className="text-white font-semibold border border-white px-2 py-1 rounded ">
          <div className="flex items-center space-x-2 text-lg">
            <span className="relative group cursor-pointer">
              <span className="hover:text-blue-500" onClick={() => changeLanguage('es')}>ES</span>
              <span className="absolute left-0 bottom-full mb-1 w-max px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               style={{
                transform: 'translate(-25%, 70px)', // Ajusta el desplazamiento hacia abajo
              }}>
                Español
              </span>
            </span>
            <span className="cursor-pointer">|</span>
            <span className="relative group cursor-pointer">
              <span className="hover:text-blue-500" onClick={() => changeLanguage('ca')} >CA</span>
              <span className="absolute left-0 bottom-full mb-1 w-max px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
               style={{
                transform: 'translate(-25%, 70px)', // Ajusta el desplazamiento hacia abajo
              }}>
                Català
              </span>
            </span>
            <span className="cursor-pointer">|</span>
            <span className="relative group cursor-pointer">
              <span className="hover:text-blue-500" onClick={() => changeLanguage('en')}>EN</span>
              <span className="absolute left-0 bottom-full mb-1 w-max px-2 py-1 text-sm bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               style={{
                transform: 'translate(-25%, 70px)', // Ajusta el desplazamiento hacia abajo
              }}
            
              >
                English
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Navegación inferior */}
      <div className="flex flex-col p-4 items-center">
        <nav className="flex gap-6 text-white font-semibold">
          <Link className="hover:text-gray-300">PRIMEROS</Link>
          <Link className="hover:text-gray-300">SEGUNDOS</Link>
          <Link className="hover:text-gray-300">BEBIDAS</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;