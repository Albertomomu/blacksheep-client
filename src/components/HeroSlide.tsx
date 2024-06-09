
const HeroSlide = ({ black }) => {
  return (
    <>
      <button className={`absolute top-[43%] left-5 bg-yellow-400 px-6 py-2 rounded-full`}>
        Obtener descuento
      </button>
      <h1 className={`absolute top-[50%] left-5 text-4xl font-bold ${black ? 'text-white' : ''}`}>
        Producto premium<br/> de alta calidad
      </h1>
      <p className={`absolute top-[65%] left-5 text-lg ${black ? 'text-white' : ''}`}>
        Camisetas de máxima calidad 100% algodón para el mejor estilo a la última moda y conseguir <br/> el mejor precio impresionar a esa nena que te mola.
      </p>
      <button className={`absolute top-[85%] left-5 bg-black text-white px-4 py-4 rounded`}>
        Comprar ahora
      </button>
    </>
  );
}

export default HeroSlide;
