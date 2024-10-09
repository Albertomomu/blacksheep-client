export default function ContentContainer({ children }) {
  return (
    <div className='w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 mx-auto'>
      {children}
    </div>
  );
}