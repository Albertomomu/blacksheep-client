import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Truck } from 'lucide-react';
import Layout from "@/components/Layout";
import useCartStore from "@/store/cartStore";
import PaymentCard from "@/components/PaymentCard";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState(null);                                                                                                                                                                                                                                                                                          
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const shipping = 4.99;
  const subtotal = getTotalPrice();
  const total = subtotal + shipping;

  async function handleCheckout() {
    setProcessing(true);
    setError(null);

    // Llamar a tu backend para crear un Payment Intent
    const response = await fetch('http://localhost:3000/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    const data = await response.json();

    if (response.ok) {
      const { clientSecret } = data;

      // Confirmar el pago con Stripe
      const stripe = await stripePromise;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else {
        // El pago fue exitoso
        if (result.paymentIntent.status === 'succeeded') {
          alert('¡Pago exitoso!');
          // Aquí puedes redirigir al usuario o realizar otras acciones
        }
      }
    } else {
      setError(data.error);
      setProcessing(false);
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-white text-black">
        <Elements stripe={stripePromise}>
          <Card className="overflow-hidden shadow-none border-none">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Finalizar compra</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Información de envío */}
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
                        {/* Aquí puedes agregar un Select para elegir el país */}
                      </div>
                    </div>
                  </div>

                  {/* Método de pago */}
                  <Separator />
                  <h2 className="text-xl font-semibold mb-4">Método de pago</h2>

                  {/* Componente PaymentCard */}
                  <PaymentCard onPaymentMethodCreated={setPaymentMethod} />

                </div>

                {/* Resumen del pedido */}
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
                      {/* Subtotal y Envío */}
                      <Separator />
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{subtotal.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Envío</span>
                        <span>{shipping.toFixed(2)}€</span>
                      </div>

                      {/* Total */}
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>{total.toFixed(2)}€</span>
                      </div>

                    </CardContent>
                  </Card>

                  {/* Mensajes adicionales */}
                  <div className="mt-6 space-y-4">
                    {/* Mensaje sobre envío gratuito */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Truck className="w-4 h-4" />
                      <span>Envío gratuito en pedidos superiores a 50€</span>
                    </div>

                    {/* Mensaje sobre pago seguro */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <CreditCard className="w-4 h-4" />
                      <span>Pago seguro con cifrado SSL</span>
                    </div>

                  </div>

                </div> {/* Fin del Resumen del pedido */}
              </div> {/* Fin del Grid */}
            </CardContent>

            {/* Botón para realizar pedido */}
            <CardFooter>
              {/* Botón para realizar el pedido */}
              <Button 
                className={`w-full text-lg py-6 bg-black text-white hover:bg-gray-600 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`} 
                onClick={handleCheckout} 
                disabled={!paymentMethod || processing}
              >
                {processing ? 'Procesando...' : 'Realizar pedido'}
              </Button>

              {/* Mostrar mensaje de error si hay alguno */}
              {error && (<div className="text-red-500 mt-2">{error}</div>)}
            </CardFooter>

          </Card> {/* Fin del Card */}
        </Elements> {/* Fin de Elements */}
      </div> {/* Fin del Container */}
    </Layout> // Fin del Layout
  );
}
