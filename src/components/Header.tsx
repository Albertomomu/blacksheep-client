import { useState } from 'react';
import logo from '../assets/images/logo.png'; // Import the logo
import SearchButton from './SearchButton';
import useUserStore from '../store/userStore';
import LogoutButton from './LogoutButton';
import { ShoppingCart, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserStore(state => ({
    user: state.user,
  }));

  return (
    <div className="w-full mx-auto max-w-[1600px] flex justify-between py-4 px-4">
      <div className='flex items-center gap-24'>
        <a href="/">
          <img src={logo} alt="" width={150} height="auto"/>
        </a>
        <nav className='hidden md:flex gap-5 font-openSans'>
          <a href="/products">Tienda</a>
          <a href="#">Sobre Nosotros</a>
          <a href="#">Contacto</a>
        </nav>
      </div>
      <div className='flex items-center gap-6'>
        <SearchButton />
        <Link to="/cart">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
        <div className='hidden md:block'>
        <LogoutButton />
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700 rounded focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 left-0 w-full h-screen bg-white shadow-lg z-40 flex flex-col items-start py-4 gap-4 transition-transform duration-300 ease-in-out ${
          isOpen ? 'transform translate-x-00' : 'transform -translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-start w-full h-[95%]">
          <div className='flex flex-col items-center justify-between h-full'>
            <div>
              <a href="/products" className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">Tienda</a>
              <a href="#" className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">Sobre Nosotros</a>
              <a href="#" className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">Contacto</a>
              <a href={user ? '/profile' : '/login'} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">Perfil</a>
            </div>
            <LogoutButton />
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;