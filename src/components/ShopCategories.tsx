import { Button } from "@/components/ui/button"

export default function ShopCategories() {
  return (
    <div className="bg-gray-100 py-4">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Button variant="ghost">T-Shirts</Button>
      <Button variant="ghost">Hoodies</Button>
      <Button variant="ghost">Tanks</Button>
      <Button variant="ghost">Accessories</Button>
    </div>
  </div>
  )
}
