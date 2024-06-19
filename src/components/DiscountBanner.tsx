
const DiscountBanner = () => {
  return (
    <section className='mt-8'>
      <div className='w-full h-38 discountBanner relative'>
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded"></div>
        <div className='flex flex-col gap-8 justify-between items-center h-full p-4'>
          <div>
            <h2 className='text-3xl text-center font-bold text-white z-10 relative'>50% DESCUENTO</h2>
            <p className='text-lg text-center text-white z-10 relative'>Las rebajas acaban en 10 días</p>
          </div>
          <div>
            <h4 className='text-5xl text-center text-white font-bold z-10 relative'>BLACKSHEEP</h4>
          </div>
        </div>
      </div>
  </section>
  )
}

export default DiscountBanner