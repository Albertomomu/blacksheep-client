import { ProductCard } from '../components'

const ProductsGrid = () => {
  return (
    <div className='flex flex-col gap-8 justify-between w-full '>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

export default ProductsGrid