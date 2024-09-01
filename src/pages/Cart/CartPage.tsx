import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus } from 'lucide-react'
import useCartStore from '@/store/cartStore'
import { useCallback } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  const shipping = 4.99
  const subtotal = getTotalPrice()
  const total = subtotal + shipping

  const handleQuantityChange = useCallback((id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity)
    }
  }, [updateQuantity])

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 bg-white text-black">
          <h1 className="text-3xl font-bold mb-4">Carrito de compras</h1>
          <p>Tu carrito está vacío.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-white text-black">
        <Card className="overflow-hidden shadow-none border-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Carrito de compras</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt={`${item.name}`}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-lg font-bold mt-1">{parseFloat(item.price).toFixed(2)}€</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      aria-label="Disminuir cantidad"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      aria-label="Aumentar cantidad"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    aria-label="Eliminar producto"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <Separator className="my-6" />
          <CardFooter className="flex flex-col items-end space-y-4">
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>{shipping.toFixed(2)}€</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{total.toFixed(2)}€</span>
              </div>
            </div>
            <Button className="w-full max-w-md text-lg py-6">Proceder al pago</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}