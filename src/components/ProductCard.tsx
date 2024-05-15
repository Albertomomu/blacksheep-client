import React from 'react'
import Rating from '@mui/material/Rating';


const ProductCard = () => {
  return (
    <div className='w-1/4 flex flex-col gap-4'>
      <img className='rounded' src="https://via.placeholder.com/300x300" alt="" width="100%"/>
      <div className='flex justify-between mr-4'>
        <h3 className='font-bold text-lg'>Product Title</h3>
        <p className='font-bold'>$100.00</p>
      </div>
      <p>Product description is placed here</p>
      <Rating name="read-only" value={5} readOnly size='small'/>
      <button className='border-black border-2 rounded-full w-44 px-4 py-2 hover:bg-black hover:text-white transition duration-300'>Add to cart</button>
    </div>
  )
}

export default ProductCard