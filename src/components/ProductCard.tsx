import { Button } from "@/components/ui/button"
import image from '../assets/images/products/1.jpeg';
import { Link } from "react-router-dom";
import useCartStore from "@/store/cartStore";
import { useToast } from "../hooks/use-toast"


const ProductCard = ({item}) => {
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = (event) => {
    event.preventDefault(); // Previene la navegación
    event.stopPropagation(); // Detiene la propagación del evento
    addItem(item);
    toast({
      description: "Your message has been sent.",
    })
  };

  return (
    <Link to={`/products/${item.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={image}
          alt={`Product ${item.name}`}
          className="w-full h-64 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">{item.price}€</span>
            <Button onClick={handleAddToCart}>Añadir al carrito</Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard