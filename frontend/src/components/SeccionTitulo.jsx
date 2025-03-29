import React from 'react';

const SeccionTitulo = ({ titulo }) => {
    return (
        <div className="flex flex-col items-center" style={{ borderBottom: "2px solid #000", width: "95%" }}>
            <h2 className="pt-5" >
                {titulo}
            </h2>
        </div>
    );
};

export default SeccionTitulo;