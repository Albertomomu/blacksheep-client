import Product from '@/interfaces/product.interface';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/images/products/1.jpeg';

const SearchButton = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleProducts = async () => {
    const response = await axios.get('https://server.blacksheepclothing.es/products/');
    setProducts(response.data);
  }

  useEffect(() => {
    handleProducts();
  }, [])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);

    const filteredProducts = products.filter(product =>
      product?.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filteredProducts);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="hidden md:flex relative flex-col">
      <div className="relative">
        <input
          className="bg-gray-100 placeholder:text-gray-600 placeholder:text-sm rounded-full px-6 py-2 pr-10 focus:outline-none focus:bg-gray-200 transition duration-300 ease-in-out"
          type="text"
          placeholder="Buscar producto..."
          value={searchText}
          onChange={handleSearch}
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
        </span>
      </div>
      {results.length > 0 ? (
        <div className="absolute top-full left-0 right-0 bg-white border rounded mt-2 z-10">
          {results.map((result, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 flex items-center cursor-pointer"
              onClick={() => handleProductClick(result.id)}
            >
              <img src={image} alt={result.name} className="w-10 h-auto mr-2" />
              <span>{result.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute top-full left-0 right-0 bg-white border rounded mt-2 z-10">
          <p className="text-sm text-gray-500 mt-1 p-2">No se han encontrado resultados</p>
        </div>
      )
      }
    </div>
  );
};

export default SearchButton;