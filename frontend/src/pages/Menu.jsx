import React from 'react';
import Header from "../components/Header";
import Item from '../components/Item';
import SeccionTitulo from '../components/SeccionTitulo';

const MenuPage = () => {

  return (
    <>
      <Header />

      <div className='p-4 mt-25  flex flex-col items-center'>
        <SeccionTitulo titulo="Recomendación de la casa" />
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