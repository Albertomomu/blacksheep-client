import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Layout } from '../../components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Package } from 'lucide-react'
import useUserStore from '../../store/userStore';

export default function ProfilePage() {

  const user = useUserStore((state) => state.user);

  console.log(user);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-white text-black">
        <Card className="overflow-hidden shadow-none border-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Perfil de Usuario</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-500" />
                  </div>
                  <h2 className="text-2xl font-semibold">{user?.firstName} {user.lastName}</h2>
                  <Button className="w-full">Cambiar foto</Button>
                </div>
              </div>
              <div className="md:w-2/3">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Información</TabsTrigger>
                    <TabsTrigger value="address">Dirección</TabsTrigger>
                    <TabsTrigger value="orders">Pedidos</TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input id="name" value={user?.firstName || ''}  />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" value={user?.email || ''} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" value={user?.phone || ''}  />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="address" className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="street">Calle</Label>
                        <Input id="street" value={user?.address?.street || ''} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="portal">Portal</Label>
                          <Input id="portal" value={user?.address?.portal || ''} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="door">Puerta</Label>
                          <Input id="door" value={user?.address?.door || ''} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="city">Ciudad</Label>
                          <Input id="city" value={user?.address?.city || ''} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="province">Provincia</Label>
                          <Input id="province" value={user?.address?.province || ''} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="postal_code">Código Postal</Label>
                          <Input id="postal_code" value={user?.address?.postal_code || ''} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="country">País</Label>
                          <Input id="country" value={user?.address?.country || ''} />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="orders" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Package className="w-6 h-6" />
                          <div>
                            <p className="font-semibold">Pedido #1234</p>
                            <p className="text-sm text-gray-500">2 artículos - 54.98€</p>
                          </div>
                        </div>
                        <Button variant="outline">Ver detalles</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Package className="w-6 h-6" />
                          <div>
                            <p className="font-semibold">Pedido #1235</p>
                            <p className="text-sm text-gray-500">1 artículo - 29.99€</p>
                          </div>
                        </div>
                        <Button variant="outline">Ver detalles</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}