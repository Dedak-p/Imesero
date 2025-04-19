import { Link } from "react-router-dom";
//import '../styles/Header.css';

import Flecha from "../assets/flecha.svg";
import Usuario from "../assets/usuario.svg";

import useApiCall from "../hooks/useApiCall";
import CarritoDrop from "./CarritoDrop";

const Header = () => {
  const { data: categorias, loading, error, refetch } = useApiCall('/categorias');
  return (
    <header className="fixed top-0 left-0  grid grid-cols-2 grid-rows-2 p-4  bg-blue-950 shadow-md  w-full">
      
      
        <button className=" p-2 rounded-full justify-items-start">
          <img src={Flecha} alt="Icono personalizado" className="w-10 h-7" />
        </button>

        <div className="flex items-center justify-end gap-2">
          <button className=" ">
            <img src={Usuario} alt="Icono personalizado" className="w-10 h-7" />
          </button>
          <CarritoDrop />
        </div>


      <div className="flex flex-col col-span-2 items-center self-end">
      <nav className="flex gap-6 overflow-x-auto text-white font-semibold">
        {loading && <span>Cargando categorías…</span>}
        {error && <span>Error al cargar</span>}
        {!loading && !error && categorias.map(cat => {
          // genera un slug para el hash: e.g. "Platos Calientes" → "platos-calientes"
          const slug = cat.nombre
            .toLowerCase()
            .replace(/\s+/g, "-")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""); // quita tildes

          return (
            <a
              key={cat.id}
              href={`#${slug}`}
              className="hover:text-gray-300 whitespace-nowrap"
            >
              {cat.nombre.toUpperCase()}
            </a>
          );
        })}
      </nav>
       
      </div>

    </header>
  );
};

export default Header;