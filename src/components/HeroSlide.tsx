import React from 'react';

const HeroSlide = ({ black }) => {
  return (
    <>
      <button className={`absolute top-[20%] left-20 bg-yellow-400 px-6 py-2 rounded-full`}>
        Obtener descuento
      </button>
      <h1 className={`absolute top-[30%] left-20 text-7xl font-bold ${black ? 'text-white' : ''}`}>
        Producto premium<br/> de alta calidad
      </h1>
      <p className={`absolute top-[60%] left-20 text-lg ${black ? 'text-white' : ''}`}>
        Camisetas de máxima calidad 100% algodón para el mejor estilo a la última moda y conseguir <br/> el mejor precio impresionar a esa nena que te mola.
      </p>
      <button className={`absolute top-[75%] left-20 bg-black text-white px-4 py-4 rounded`}>
        Comprar ahora
      </button>
    </>
  );
}

export default HeroSlide;
