import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Inicio</Link>
            <Link to="/about">Sobre Nosotros</Link>
        </nav>
    );
};

export default Navbar;