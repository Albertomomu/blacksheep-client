import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Layout } from '../../components';
import image from '../../assets/images/products/1.jpeg';
import axios from "axios";
import Loader from '@/components/Loader';
import useCartStore from '@/store/cartStore';
import { useToast } from "@/components/hooks/use-toast"

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  category_id: number;
  category: Category;
  size: string;
  price_id: string;
}

function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>(''); // Nuevo estado para la talla seleccionada

  useEffect(() => {
    const handleProducts = async () => {
      const response = await axios.get<Product>(`http://localhost:3000/products/${id}`);
      setProduct(response.data);
    }

    handleProducts();
  }, [id])

  // Nueva función para manejar la selección de talla
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  if (!product) {
    return <Loader />
  }

  const handleAddToCart = (event) => {
    event.preventDefault(); // Previene la navegación
    event.stopPropagation(); // Detiene la propagación del evento

    if (!selectedSize) {
      toast({
        title: "Error",
        description: "Por favor, selecciona una talla antes de añadir al carrito.",
      });
      return;
    }

    const productWithSize = { ...product, size: selectedSize };

    console.log('Añadir al carrito', product);
    addItem(productWithSize);
    toast({
      title: "Producto añadido",
      description: `${product.name} ha sido añadido al carrito.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-0 py-8 bg-white text-black max-w-[1600px]">
        <Card className="overflow-hidden shadow-none border-none">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8 place-items-center w-full">
              <div className="space-y-4">
                <img
                  src={image}
                  alt="Camiseta Dreamer - Vista frontal y trasera"
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
              <div className="space-y-6 w-full">
                <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <p className="text-xl mt-2">{product.description}</p>
                </div>
                <p className="text-3xl font-bold">{product.price}€</p>
                <Separator />
                <div className="space-y-4">
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium mb-2">
                      Tamaño
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['S', 'M', 'L'].map((size) => (
                        <Button
                          key={size}
                          variant={selectedSize === size ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => handleSizeSelect(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="color" className="block text-sm font-medium mb-2">
                      Color
                    </label>
                    <div className="flex space-x-2">
                      {['bg-black'].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full ${color} border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                          aria-label={`Seleccionar color ${color.replace('bg-', '')}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full text-lg py-6"
                  disabled={!selectedSize} // Deshabilita el botón si no se ha seleccionado una talla
                  onClick={() => {
                    handleAddToCart(event);
                  }}
                >
                  Añadir al carrito
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

export default ProductDetail;