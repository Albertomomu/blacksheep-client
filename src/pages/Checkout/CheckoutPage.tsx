import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck } from 'lucide-react'
import Layout from "@/components/Layout"

export default function CheckoutPage() {
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
                        <SelectItem value="de">Alemania</SelectItem>
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
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Número de tarjeta</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expDate">Fecha de expiración</Label>
                      <Input id="expDate" placeholder="MM/AA" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between">
                    <span>Dreamer (Talla M, Negro)</span>
                    <span>24.99€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Explorer (Talla L, Blanco) x2</span>
                    <span>59.98€</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>84.97€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío</span>
                    <span>4.99€</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>89.96€</span>
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