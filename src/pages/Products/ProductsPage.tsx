import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Layout } from '../../components';
import axios from "axios";
import Loader from '@/components/Loader';
import useCartStore from '@/store/cartStore';
import { useToast } from "@/components/hooks/use-toast";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  imageurl: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  category_id: number;
  category: Category;
  size?: string;
  price_id: string;
}

function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    const handleProducts = async () => {
      try {
        const response = await axios.get<Product>(`https://server.blacksheepclothing.es/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error cargando producto:", err);
      }
    };

    handleProducts();
  }, [id]);

  if (!product) return <Loader />;

  // ⚙️ Detectar si es una camiseta (u otra categoría con talla)
  const categoryName = product.category?.name?.toLowerCase() || "";
  const hasSizes = categoryName.includes("camiseta");
  const hasColors = categoryName.includes("camiseta"); // puedes extenderlo a otras categorías si quieres

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // Si el producto requiere talla y no se ha elegido, mostrar aviso
    if (hasSizes && !selectedSize) {
      toast({
        title: "Selecciona una talla",
        description: "Debes elegir una talla antes de añadir este producto al carrito.",
      });
      return;
    }

    const productToAdd = {
      ...product,
      ...(hasSizes && { size: selectedSize }),
    };

    addItem(productToAdd);
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
              
              {/* Imagen del producto */}
              <div className="space-y-4">
                <img
                  src={product.imageurl}
                  alt={product.name}
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>

              {/* Detalles */}
              <div className="space-y-6 w-full">
                <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <p className="text-lg mt-2 text-gray-700">{product.description}</p>
                </div>

                <p className="text-3xl font-bold">{product.price}€</p>
                <Separator />

                {/* Mostrar talla y color solo si aplica */}
                {(hasSizes || hasColors) && (
                  <div className="space-y-4">
                    {hasSizes && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
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
                    )}

                    {hasColors && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
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
                    )}
                  </div>
                )}

                <Button
                  className="w-full text-lg py-6"
                  disabled={hasSizes && !selectedSize}
                  onClick={handleAddToCart}
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
