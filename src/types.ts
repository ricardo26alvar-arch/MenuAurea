export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'entradas' | 'platos_fuertes' | 'restobar' | 'postres' | 'bebidas_sin' | 'bebidas_con' | 'estrella';
  categoryLabel: string;
  isNocheOnly?: boolean;
  isDiaOnly?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'recibido' | 'preparacion' | 'camino' | 'entregado';
  paymentMethod: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  preferredTheme: 'dia' | 'noche';
}
