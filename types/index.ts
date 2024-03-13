export type Product = {
  createdAt: string;
  description: string;
  image_url: string;
  name: string;
  price: string;
  product_id: string;
  updatedAt: string;
};

export type CartItem = {
  cart_id: string;
  cart_item_id: string;
  createdAt: string;
  product_id: string;
  products: Product;
  quantity: string;
  total_amount: string;
  updatedAt: string;
};

export type CartType = {
  cart_id: string;
  customer_id: string;
  cart_items: CartItem[];
  createdAt: string;
  updatedAt: string;
  status: "active" | "completed";
};

export type OrderItem = {
  order_id: string;
  order_item_id: string;
  product_id: string;
  products: Product;
  quantity: string;
  total_amount: string;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  address: string;
  customer_id: string;
  order_id: string;
  order_items: OrderItem[];
  status: "pending" | "shipped";
  total_amount: string;
  createdAt: string;
  updatedAt: string;
};

export type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  [key: string]: string;
};

export type SignInFormData = {
  email: string;
  password: string;
  [key: string]: string;
};

export type User = {
  address: string;
  createdAt: string;
  customer_id: string;
  email: string;
  password: string;
  phone: string;
  updatedAt: string;
  username: string;
};

export type UserData = {
  user: User;
  accessToken: string;
};

export interface CartItemData {
  cart: CartType[];
}

export type Address = {
  address_id: string;
  country: string;
  full_name: string;
  phone: string;
  pincode: string;
  flat_no: string;
  street: string;
  city: string;
  state: string;
  default: boolean;
  customer_id: string;
  createdAt: string;
  updatedAt: string;
  customers: string;
};

export type AddressFormData = {
  name: string;
  mobile: string;
  pinCode: string;
  apartment: string;
  area: string;
  city: string;
  state: string;
  country: string;
  isDefault: boolean;
  [key: string]: string | boolean;
};

export type AddressModes = "create" | "edit";