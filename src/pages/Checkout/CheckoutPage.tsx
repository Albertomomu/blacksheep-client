import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck } from 'lucide-react'
import Layout from "@/components/Layout"
import useCartStore from "@/store/cartStore"

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore();

  const shipping = 4.99;
  const subtotal = getTotalPrice();
  const total = subtotal + shipping;
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-white text-black">
      <Card className="overflow-hidden shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Finalizar compra</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Información de envío</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Juan" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellidos</Label>
                      <Input id="lastName" placeholder="Pérez" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" placeholder="Calle Mayor, 123" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" placeholder="Madrid" />
                    </div>
                    <div>
                      <Label htmlFor="postcode">Código Postal</Label>
                      <Input id="postcode" placeholder="28001" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country">País</Label>
                    <Select>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Selecciona un país" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">España</SelectItem>
                        <SelectItem value="fr">Francia</SelectItem>
                        <SelectItem value="de">Portugal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h2 className="text-xl font-semibold mb-4">Método de pago</h2>
                <RadioGroup defaultValue="card">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Tarjeta de crédito</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem disabled value="paypal" id="paypal" />
                    <Label className="text-zinc-400" htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
              <Card>
                <CardContent className="p-4 space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between">
                      <span>{item.name} (Talla {item.size}) x{item.quantity}</span>
                      <span>{(parseFloat(item.price) * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                  <Separator />
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
                </CardContent>
              </Card>
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4" />
                  <span>Envío gratuito en pedidos superiores a 50€</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span>Pago seguro con cifrado SSL</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full text-lg py-6">Realizar pedido</Button>
        </CardFooter>
      </Card>
    </div>
    </Layout>
  )
}