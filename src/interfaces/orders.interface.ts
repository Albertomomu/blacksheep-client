// interfaces/order.interface.ts

export interface Order {
  id: number;
  customer_id: number;
  order_date: Date;
  status: string;
  shipping_city?: string;
  shipping_postal_code?: string;
  shipping_country?: string;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  subtotal: number;
  shipping: number;
  total: number;
  shipping_address?: string;
  items: OrderItem[]; // Relación con los ítems del pedido
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id?: number;
  quantity: number;
  price: number;
  size?: string;
  name: string;
}