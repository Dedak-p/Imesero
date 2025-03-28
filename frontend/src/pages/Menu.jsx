import React from 'react';
import Header from "../components/Header";
import Item from '../components/Item';

const MenuPage = () => {

  return (
    <>
      <Header />     

      <div className='p-4 mt-25  flex flex-col items-center'>
        <h2 className="mt-3" style={{ borderBottom: "2px solid #000", width: "95%" }}>Recomendación de la casa</h2>

        <Item />
        <h2 style={{ borderBottom: "2px solid #000", width: "95%" }}>Especiales</h2>
        <Item />
        <Item />
        <h2 style={{ borderBottom: "2px solid #000", width: "95%" }}>Platos del día</h2>
        <Item />
        <Item />
        <h2 style={{ borderBottom: "2px solid #000", width: "95%" }}>Platos de la semana</h2>
        <Item />
        <Item />
        <Item />
      </div>

    </>
  );
};

export default MenuPage;





