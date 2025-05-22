import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import Layout from '@/components/Layout'

export default function Component() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-white text-black">
        <Card className="overflow-hidden shadow-none border-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Contacto</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Envíanos un mensaje</h2>
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
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" type="email" placeholder="juan.perez@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="subject">Asunto</Label>
                      <Input id="subject" placeholder="Consulta sobre mi pedido" />
                    </div>
                    <div>
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Escribe tu mensaje aquí..." 
                        className="min-h-[150px]" 
                      />
                    </div>
                    <Button className="w-full">Enviar mensaje</Button>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Información de contacto</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="font-medium">Dirección</p>
                        <p className="text-gray-600">C/ d'Alboraia, 67, 2bajo izq, Benimaclet</p>
                        <p className="text-gray-600">46010 Valencia</p>
                        <p className="text-gray-600">España</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Teléfono</p>
                        <p className="text-gray-600">+34 603 781 700</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">info@blacksheepclothing.es</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Horario</p>
                        <p className="text-gray-600">Lunes - Viernes: 9:00 - 18:00</p>
                        <p className="text-gray-600">Sábado: 10:00 - 14:00</p>
                        <p className="text-gray-600">Domingo: Cerrado</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h2 className="text-xl font-semibold mb-4">Nuestra ubicación</h2>
                  <div className="bg-gray-200 rounded-lg w-full h-[250px] flex items-center justify-center">
                  <div className="bg-gray-200 rounded-lg w-full h-[250px] overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.230005841292!2d-0.37088252338862193!3d39.486720671604395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd60497dab647f6b%3A0x8a20c19e453f23bd!2sKhaleesi%20tattoo%20art!5e0!3m2!1sen!2ses!4v1747934618175!5m2!1sen!2ses"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}