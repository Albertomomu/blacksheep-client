import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Layout } from '../../components';
import ShopCategories from "@/components/ShopCategories";

export default function ShopPage() {
  return (
    <Layout>
      <ShopCategories />

      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 pr-8 mb-8 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Price Range</h3>
              <Slider defaultValue={[0, 100]} max={100} step={1} />
              <div className="flex justify-between mt-2">
                <span>$0</span>
                <span>$100</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Size</h3>
              <div className="space-y-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <div key={size} className="flex items-center">
                    <Checkbox id={`size-${size}`} />
                    <label htmlFor={`size-${size}`} className="ml-2">
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {['bg-black', 'bg-white', 'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'].map((color) => (
                  <div key={color} className={`w-6 h-6 rounded-full ${color} border border-gray-300 cursor-pointer`} />
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={`https://via.placeholder.com/400x300?text=Product+${item}`}
                  alt={`Product ${item}`}
                  className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Classic T-Shirt</h3>
                  <p className="text-gray-600 mb-4">100% Premium Cotton</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">$29.99</span>
                    <Button>Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </nav>
          </div>
        </section>
      </main>
    </Layout>
  )
}