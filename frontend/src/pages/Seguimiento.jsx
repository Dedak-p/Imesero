import Header from "../components/Header";
import Item from "../components/Item";
import SeccionTitulo from "../components/SeccionTitulo";

const SeguimientoPage = () => {

    return (
        <>
            <Header />
            <div className=' flex flex-col justify-between mt-5 mb-5 w-lg '>
                <SeccionTitulo titulo="Seguimiento de pedido" />
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis culpa nulla possimus architecto omnis beatae nisi quisquam numquam, veniam vitae placeat perferendis reprehenderit aperiam? Eum commodi animi ad saepe consequatur.
                </p>
            </div>
        </>
    );
};

export default SeguimientoPage;