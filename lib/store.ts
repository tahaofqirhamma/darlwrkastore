import { create } from "zustand";

export interface Order {
  id?: string;
  name: string;
  phone: string;
  address?: string;
  size: string;
  deliveryDate: string; 
  deliveryTime: string;
  deliveryType: string;
  deliveryZone?: string;
  quantity: number;
  totalCost: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  addOrder: (order: Omit<Order, "id">) => Promise<void>;
}
