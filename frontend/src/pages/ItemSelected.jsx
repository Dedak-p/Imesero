import Header from "../components/Header";
import Item from "../components/Item";
import SeccionTitulo from "../components/SeccionTitulo";

const ItemPage = () => {

    return (
        <>
            <Header />
            <div className='p-4 mt-25 flex flex-col items-center'>
                <SeccionTitulo titulo="Item selecionado" />
                
                <Item  />

                <SeccionTitulo titulo="Descripción" />
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis culpa nulla possimus architecto omnis beatae nisi quisquam numquam, veniam vitae placeat perferendis reprehenderit aperiam? Eum commodi animi ad saepe consequatur.
                </p>

                <SeccionTitulo titulo="Ingredientes" />
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis culpa nulla possimus architecto omnis beatae nisi quisquam numquam, veniam vitae placeat perferendis reprehenderit aperiam? Eum commodi animi ad saepe consequatur.
                </p>
                

            </div>
        </>
    );
};

export default ItemPage;