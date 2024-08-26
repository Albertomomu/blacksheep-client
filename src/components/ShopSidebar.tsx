import { Checkbox } from "@radix-ui/react-checkbox"
import { Slider } from "@radix-ui/react-slider"

export default function ShopSidebar() {
  return (
    <aside className="w-full md:w-1/4 pr-8 mb-8 md:mb-0">
    <h2 className="text-xl font-bold mb-4">Filtros</h2>
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Rango de precio</h3>
        <Slider defaultValue={[0, 100]} max={100} step={1} />
        <div className="flex justify-between mt-2">
          <span>0€</span>
          <span>100€</span>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Tamaño</h3>
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
  )
}
