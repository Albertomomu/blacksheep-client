import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus } from 'lucide-react'
import useCartStore from '@/store/cartStore'
import { useNavigate } from "react-router-dom"
import { useCallback } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const navigate = useNavigate();

  const shipping = 4.99
  const subtotal = getTotalPrice()
  const total = subtotal + shipping

  const handleQuantityChange = useCallback((id: number, size: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, size, newQuantity)
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
      <div className="container mx-auto px-2 sm:px-4 py-8 bg-white text-black">
        <Card className="overflow-hidden shadow-lg border-none">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold">Carrito de compras</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex flex-col md:flex-row md:gap-4 space-y-4 p-4 rounded-lg border border-gray-200">
                  <img
                    src={ item.imageurl }
                    alt={`${item.name}`}
                    className="w-full h-full md:w-64 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Talla: {item.size}</p>
                    <p className="text-lg font-bold mt-2">{parseFloat(item.price).toFixed(2)}€</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        aria-label="Disminuir cantidad"
                        onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        aria-label="Aumentar cantidad"
                        onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      aria-label="Eliminar producto"
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <Separator className="my-4 sm:my-6" />
          <CardFooter className="flex flex-col items-end space-y-4 bg-gray-50 p-4 sm:p-6">
            <div className="w-full space-y-2">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-semibold">{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Envío</span>
                <span className="font-semibold">{shipping.toFixed(2)}€</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>{total.toFixed(2)}€</span>
              </div>
            </div>
            <Button onClick={() => navigate("/checkout")} className="w-full text-lg py-6 mt-4 bg-black hover:bg-gray-700 transition-colors">
              Proceder al pago
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}