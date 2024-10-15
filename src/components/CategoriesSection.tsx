import ProductCard from './ProductCard';


const CategoriesSection = ({products}) => {

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