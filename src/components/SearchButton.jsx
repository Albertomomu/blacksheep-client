const SearchButton = () => {
  return(
    <div className="relative">
      <input 
        className="bg-gray-100 placeholder:text-gray-600 placeholder:text-sm rounded-full px-6 py-2 pr-10 focus:outline-none focus:bg-gray-200 transition duration-300 ease-in-out" 
        type="text" 
        placeholder="Buscar producto..." 
      />
      <span className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer">
      <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
      </span>
    </div>  
  )
}

export default SearchButton