import { ProductsGrid } from './';


const CategoriesSection = () => {
  return (
    <section className='mt-12 px-2'>
      <h2 className='text-4xl font-bold'>Nuestros destacados</h2>
      <hr className='h-1 my-8 bg-gray-300 rounded-full'/>
      <ProductsGrid />
    </section>
  )
}

export default CategoriesSection