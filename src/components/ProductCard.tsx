import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <Link to={`/products/${item.id}`} className="h-full">
      <div className="flex flex-col justify-between bg-white rounded-xl shadow-md overflow-hidden h-full">
        <img
          src={item.imageurl || "/placeholder.jpg"}
          alt={item.name}
          className="w-full h-80 object-cover"
        />
        <div className="flex flex-col justify-between flex-1 p-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {item.description}
            </p>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-lg font-bold">{item.price}€</span>
            <Button asChild>
              <Link to={`/products/${item.id}`}>Ver producto</Link>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
