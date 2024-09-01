import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';


const CategoriesSection = () => {

  const [products, setProducts] = useState([]);

  const handleProducts = async () => {
    const response = await axios.get('https://server.blacksheepclothing.es/products/');
    setProducts(response.data);
  }

  useEffect(() => {
    handleProducts();
  }, [])

  return (
    <section className='mt-12 px-2'>
      <h2 className='text-4xl font-bold'>Nuestros destacados</h2>
      <hr className='h-1 my-8 bg-gray-300 rounded-full'/>
      {products.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </section>
  )
}

export default CategoriesSection