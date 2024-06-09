
const DiscountBanner = () => {
  return (
    <section className='mt-32'>
      <div className='w-full h-32 discountBanner rounded relative'>
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded"></div>
        <div className='flex justify-between items-center h-full p-12'>
          <div>
            <h2 className='text-4xl font-bold text-white z-10 relative'>50% DESCUENTO</h2>
            <p className='text-xl text-white z-10 relative'>Las rebajas acaban en 10 días</p>
          </div>
          <div>
            <h4 className='text-xl text-white font-bold z-10 relative'>BLACKSHEEP</h4>
          </div>
        </div>
      </div>
  </section>
  )
}

export default DiscountBanner