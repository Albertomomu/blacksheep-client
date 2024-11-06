import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Layout } from '../../components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Package } from 'lucide-react'
import useUserStore from '../../store/userStore';
import axios from 'axios';
import { useToast } from "@/components/hooks/use-toast"

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const accessToken = useUserStore((state) => state.accessToken);
  const setUser = useUserStore((state) => state.setUser);
  const [formData, setFormData] = useState(user);
  const [isChanged, setIsChanged] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        return {
          ...prevState,
          [parent]: {
            ...prevState[parent],
            [child]: value
          }
        };
      }
      return { ...prevState, [name]: value };
    });
    setIsChanged(true);
  };

  const handleUpdate = async () => {
    if (!isChanged || !user) return;
  
    try {
      const { id, ...updateData } = formData; // eslint-disable-line @typescript-eslint/no-unused-vars
  
      const response = await axios.put(
        `http://localhost:3000/customers/${user.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
  
      if (response.status === 200) {
        // Since the server is not returning updated data, we'll use the local formData
        const updatedUser = { ...user, ...updateData };
        setUser(updatedUser, accessToken);
        setFormData(updatedUser);
        setIsChanged(false);
        toast({
          title: "Perfil actualizado",
          description: `${updatedUser?.firstName}, tu perfil ha sido actualizado correctamente.`,
        });
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Error al actualizar el perfil');
    }
  };

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
                  <h2 className="text-2xl font-semibold">{formData?.firstName} {formData?.lastName}</h2>
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
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input id="firstName" name="firstName" value={formData?.firstName || ''} onChange={handleInputChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="lastName">Apellidos</Label>
                        <Input id="lastName" name="lastName" value={formData?.lastName || ''} onChange={handleInputChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" name="email" value={formData?.email || ''} onChange={handleInputChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" name="phone" value={formData?.phone || ''} onChange={handleInputChange} />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="address" className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="street">Calle</Label>
                        <Input id="street" name="address.street" value={formData?.address?.street || ''} onChange={handleInputChange} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="portal">Portal</Label>
                          <Input id="portal" name="address.portal" value={formData?.address?.portal || ''} onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="door">Puerta</Label>
                          <Input id="door" name="address.door" value={formData?.address?.door || ''} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="city">Ciudad</Label>
                          <Input id="city" name="address.city" value={formData?.address?.city || ''} onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="province">Provincia</Label>
                          <Input id="province" name="address.province" value={formData?.address?.province || ''} onChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="postal_code">Código Postal</Label>
                          <Input id="postal_code" name="address.postal_code" value={formData?.address?.postal_code || ''} onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="country">País</Label>
                          <Input id="country" name="address.country" value={formData?.address?.country || ''} onChange={handleInputChange} />
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
                <div className="mt-6">
                  <Button onClick={handleUpdate} disabled={!isChanged}>
                    Actualizar Perfil
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}