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
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const accessToken = useUserStore((state) => state.accessToken);
  const setUser = useUserStore((state) => state.setUser);
  const [formData, setFormData] = useState(user);
  const [isChanged, setIsChanged] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { toast } = useToast();

  const handleOrders = async () => {
    try {
      const response = await axios.get(`https://server.blacksheepclothing.es/orders/customer/${user.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error al obtener los pedidos:');
      if (error.response) {
        // Error de servidor (4xx/5xx)
        console.log('Detalles:', error.response.data);
      } else if (error.request) {
        // No se recibió respuesta
        console.log('No se pudo conectar al servidor');
      } else {
        // Error en la configuración de la petición
        console.log('Error:', error.message);
      }
    }
  };

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

  useEffect(() => {
    setFormData(user);
    handleOrders();
  }, [user]);

  const handleUpdate = async () => {
    if (!isChanged || !user) return;

    try {
      const { id, ...updateData } = formData; // eslint-disable-line @typescript-eslint/no-unused-vars

      const response = await axios.put(
        `https://server.blacksheepclothing.es/customers/${user.id}`,
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

  const statusColors = {
    pending: 'bg-orange-500',
    paid: 'bg-green-500',
    canceled: 'bg-red-500'
  };

  const translateStatus = (status) => {
    console.log(status);
    switch (status) {
      case 'pending':
        return 'Pendiente de pago';
      case 'paid':
        return 'Completado';
      case 'canceled':
        return 'Cancelado';
      default:
        return 'Desconocido';
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
                          <Input id="country" name="address.country" value={formData?.address?.country?.name || ''} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="orders" className="space-y-4">
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg gap-2">
                          <div className="flex items-center space-x-4">
                            <Package className="w-6 h-6" />
                            <div>
                              <p className="font-semibold">Pedido #{order.id}</p>
                              <p className="text-sm text-gray-500">
                                {order.orderItems.length} {order.orderItems.length === 1 ? 'artículo' : 'artículos'} - {order.total}€
                              </p>
                            </div>
                          </div>

                          <Dialog.Root>
                            <Dialog.Trigger asChild>
                              <Button
                                variant="outline"
                                onClick={() => setSelectedOrder(order)}
                                className="hover:bg-gray-200 transition-colors"
                              >
                                Ver detalles
                              </Button>
                            </Dialog.Trigger>

                            <Dialog.Portal>
                              <Dialog.Overlay className="bg-black/50 fixed inset-0 z-50 backdrop-blur-sm" />
                              <Dialog.Content className="fixed z-50 top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-6 shadow-xl">
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center">
                                    <Dialog.Title className="text-xl font-bold">
                                      Detalles del Pedido #{selectedOrder?.id}
                                    </Dialog.Title>
                                    <Dialog.Close className="text-gray-500 hover:text-gray-700">
                                      <Cross2Icon className="h-5 w-5" />
                                    </Dialog.Close>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-2">
                                      <p className="font-medium">Información del cliente</p>
                                      <div className="space-y-1 text-gray-600">
                                        <p>{selectedOrder?.first_name} {selectedOrder?.last_name}</p>
                                        <p>{selectedOrder?.email}</p>
                                        <p>{selectedOrder?.phone}</p>
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <p className="font-medium">Dirección de envío</p>
                                      <div className="space-y-1 text-gray-600">
                                        <p>{selectedOrder?.shipping_address}</p>
                                        <p>{selectedOrder?.shipping_postal_code} {selectedOrder?.shipping_city}</p>
                                        <p>{selectedOrder?.shipping_country}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="border-t pt-4">
                                    <p className="font-medium mb-2">Artículos del pedido</p>
                                    <div className="space-y-3">
                                      {selectedOrder?.orderItems?.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                          <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">Talla: {item.size}</p>
                                          </div>
                                          <div className="text-right">
                                            <p>{item.quantity} x {item.price}€</p>
                                            <p className="font-medium">{(item.quantity * item.price).toFixed(2)}€</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="border-t pt-4">
                                    <div className="grid grid-cols-2 gap-3 font-medium">
                                      <p>Subtotal:</p>
                                      <p className="text-right">{selectedOrder?.subtotal}€</p>
                                      <p>Envío:</p>
                                      <p className="text-right">{selectedOrder?.shipping}€</p>
                                      <p className="text-lg">Total:</p>
                                      <p className="text-lg text-right text-primary">{selectedOrder?.total}€</p>
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center pt-4 border-t">
                                    <div className="flex items-center gap-2">
                                    <span className={`h-2 w-2 rounded-full ${statusColors[selectedOrder?.status?.toLowerCase()] || 'bg-red-500'}`} />
                                    <p className="text-sm capitalize">{translateStatus(selectedOrder?.status?.toLowerCase())}</p>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                      Fecha: {new Date(selectedOrder?.created_at).toLocaleDateString('es-ES')}
                                    </p>
                                  </div>
                                </div>
                              </Dialog.Content>
                            </Dialog.Portal>
                          </Dialog.Root>
                        </div>
                      ))}
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