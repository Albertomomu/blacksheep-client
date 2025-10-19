import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <Link
      to={`/products/${item.id}`}
      className="group block h-full transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex flex-col justify-between bg-white dark:bg-neutral-950 rounded-2xl shadow-sm hover:shadow-lg overflow-hidden h-full border border-gray-100 dark:border-neutral-800 transition-all duration-300">
        {/* Imagen */}
        <div className="relative w-full h-[420px] bg-gray-50 dark:bg-neutral-900 flex items-center justify-center overflow-hidden ob">
          <img
            src={item.imageurl || "/placeholder.jpg"}
            alt={item.name}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Contenido */}
        <div className="flex flex-col justify-between flex-1 p-5">
          <div>
            <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
              {item.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-snug">
              {item.description}
            </p>
          </div>

          <div className="flex justify-between items-center mt-auto pt-2">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {Number(item.price).toFixed(2)}€
            </span>
            <Button
              variant="default"
              size="sm"
              className="rounded-full font-medium bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
              asChild
            >
              <Link to={`/products/${item.id}`}>Ver producto</Link>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
