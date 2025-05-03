import { Link, useLocation, useParams } from "react-router-dom";
//import '../styles/Header.css';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext"; 
import Flecha from "../assets/flecha.svg";
import Usuario from "../assets/usuario.svg";
import Caja from "../assets/caja.svg"
import Seguimiento from "../assets/seguimiento.svg"
import useApiCall from "../hooks/useApiCall";
// import CarritoDrop from "./CarritoDrop";

const Header = () => {
  const {setLang } = useContext(AppContext);
  const location = useLocation();
  const { mesaId: mesaObtenida } = useParams();
  const path = location.pathname;
  const navigate = useNavigate();
  const { statusComand, mesaId } = useContext(AppContext);
  function changeLanguage(ext) {
    setLang(ext);
  }

  const { data: categorias, loading, error, refetch } = useApiCall(`${window.location.protocol}//${window.location.hostname}:8000/api/categorias`);
  return (
    <header className="sticky top-0 left-0  grid grid-cols-2 grid-rows-2 p-4  bg-blue-950 shadow-md  w-full">


      <button className=" p-2 rounded-full justify-items-start  "
        >
        <img src={Flecha} alt="Icono personalizado" className="w-10 h-7 cursor-pointer" onClick={() => navigate(-1)}/>

      </button>

      <div className="flex items-center justify-end gap-2 text-white">
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

        <button className="cursor-pointer "
          onClick={() => navigate("/usuario")}>
          <img src={Usuario} alt="Icono personalizado" className="w-10 h-7" />
        </button>
        {/* <CarritoDrop /> */}
        <button className="cursor-pointer "
          onClick={() => navigate("/carrito/" + mesaId)}>
          <img src={Caja} alt="Icono personalizado" className="w-10 h-7" />
        </button>


        <button className={`cursor-pointer ${statusComand > 3 ? "" : "hidden"}`}
        onClick={() => navigate("/seguimiento/" + mesaId)}>
          <img src={Seguimiento} alt="Icono personalizado" className="w-10 h-7" />
        </button>
        
      </div>


      <div className="flex flex-col col-span-2 items-center self-end">
      <nav className="flex gap-6 overflow-x-auto text-white font-semibold">
        {path.startsWith("/menu/") && 
          // ——— Si estamos en /menu ———
          <>
            {loading && <span>Cargando categorías…</span>}
            {error && <span>Error al cargar categorías</span>}
            {!loading && !error && categorias.map(cat => {
              if (!cat?.nombre) return null;
              const slug = cat.nombre
                .toLowerCase()
                .replace(/\s+/g, "-")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
              return (
                <a
                  key={cat.id}
                  href={`/menu/${mesaObtenida}#${slug}`}
                  className="hover:text-gray-300 whitespace-nowrap"
                >
                  {cat.nombre.toUpperCase()}
                </a>
              );
            })}
          </>
        }
        {path.startsWith("/carrito/") && 
          // ——— Si estamos en /menu ———
                <a
                  href={`/menu/${mesaObtenida}`}
                  className="hover:text-gray-300 whitespace-nowrap"
                >
                  Volver a la Carta
                </a>
        }
     </nav>

      </div>

    </header>
  );
};

export default Header;