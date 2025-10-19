import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout, ProductCard } from "../../components";
import { Loader2 } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // filtros
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // 🚀 Cargar productos
  const handleProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://server.blacksheepclothing.es/products/");
      const data = response.data || [];

      setProducts(data);
      setFiltered(data);

      // 📦 extraer categorías únicas (soporta objetos o strings)
      const uniqueCategories = [
        ...new Set(
          data
            .map((p) => {
              if (typeof p.category === "string") return p.category.toLowerCase();
              if (p.category && typeof p.category === "object" && p.category.name)
                return p.category.name.toLowerCase();
              return null;
            })
            .filter(Boolean)
        ),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleProducts();
  }, []);

  // 🎯 Filtro + Orden: se ejecuta automáticamente
  useEffect(() => {
    if (!Array.isArray(products) || products.length === 0) return;

    let result = [...products];

    // Filtrar por categoría
    if (selectedCategory !== "all") {
      result = result.filter((p) => {
        if (!p.category) return false;
        if (typeof p.category === "string") {
          return p.category.toLowerCase() === selectedCategory.toLowerCase();
        }
        if (typeof p.category === "object" && p.category.name) {
          return p.category.name.toLowerCase() === selectedCategory.toLowerCase();
        }
        return false;
      });
    }

    // Filtrar por precio
    result = result.filter((p) => Number(p.price) <= maxPrice);

    // Ordenar
    if (sortBy === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    setFiltered(result);
  }, [products, selectedCategory, maxPrice, sortBy]);

  const clearFilters = () => {
    setMaxPrice(100);
    setSelectedCategory("all");
    setSortBy("newest");
    setFiltered(products);
  };

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row max-w-[1600px]">
        {/* Sidebar */}
        <aside className="w-full md:w-1/5 pr-8 mb-8 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Filtros</h2>
          <div className="space-y-8">
            
            {/* Filtro precio */}
            <div>
              <h3 className="font-semibold mb-2">Precio máximo</h3>
              <Slider
                value={[maxPrice]}
                max={100}
                step={1}
                onValueChange={(value) => setMaxPrice(value[0])}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>0€</span>
                <span>{maxPrice}€</span>
              </div>
            </div>

            {/* Filtro categoría dinámico */}
            {categories.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Categoría</h3>
                <div className="space-y-2">
                  <div
                    key="all"
                    className="flex items-center cursor-pointer"
                    onClick={() => setSelectedCategory("all")}
                  >
                    <Checkbox checked={selectedCategory === "all"} />
                    <label className="ml-2 capitalize cursor-pointer">Todas</label>
                  </div>

                  {categories.map((cat) => (
                    <div
                      key={cat}
                      className="flex items-center cursor-pointer"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <Checkbox checked={selectedCategory === cat} />
                      <label className="ml-2 capitalize cursor-pointer">
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botón limpiar */}
            <div className="flex flex-col gap-3">
              <Button variant="outline" onClick={clearFilters} className="w-full">
                Limpiar filtros
              </Button>
            </div>
          </div>
        </aside>

        {/* Productos */}
        <section className="w-full md:w-4/5">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Productos</h1>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Ordenar por..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Más nuevo</SelectItem>
                <SelectItem value="price-low-high">
                  Precio: Más bajo primero
                </SelectItem>
                <SelectItem value="price-high-low">
                  Precio: Más alto primero
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Loader / Sin resultados / Productos */}
          {loading ? (
            <div className="flex justify-center items-center h-[400px]">
              <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 mt-16">
              No se encontraron productos con los filtros seleccionados.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}
