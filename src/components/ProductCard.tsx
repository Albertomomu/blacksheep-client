import { Button } from "@/components/ui/button"
import image from '../assets/images/products/1.jpeg';
import { Link } from "react-router-dom";
const ProductCard = ({item}) => {
  return (
    <Link to={`/products/${item.id}`} key={item.id}>
    <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image}
        alt={`Product ${item}`}
        className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">{item.price}€</span>
          <Button>Añadir al carrito</Button>
        </div>
      </div>
    </div>
  </Link>
  )
}

export default ProductCard