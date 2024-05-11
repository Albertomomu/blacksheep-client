import logo from '../assets/images/logo.png'; // Importa el logo
import SearchButton from './SearchButton';
function Header() {
  return (
    <div className="w-full mx-auto max-w-[1600px] flex justify-center px-12 py-4">
      <div className='w-1/2 flex items-center justify-start gap-24'>
        <img src={logo} alt="" width={150} height="auto"/>
        <nav className='flex gap-5 font-openSans'>
          <a href="/">Home</a>
          <a href="">Shop</a>
          <a href="">About us</a>
          <a href="">Contact</a>
        </nav>
      </div>
      <div className='w-1/2 flex items-center justify-end gap-24'>
      <SearchButton />
        <button>Search</button>
        <button>Cart</button>
      </div>
    </div>
  )
}

export default Header