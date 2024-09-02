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
  product: Product;
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
  product: Product;
  quantity: string;
  total_amount: string;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  address: Address;
  customer_id: string;
  order_id: string;
  order_items: OrderItem[];
  status: "pending" | "shipped" | "delivered" | "cancelled" | "processing";
  order_amount: string;
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
  username: string;
  address: string;
  customer_id: string;
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
};

export type UserData = {
  user: User;
  accessToken: string;
};

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
  customer: User;
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

export interface PaymentParams {
  cart_id: string;
  address_id: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_email: string;
  payment_method: PaymentMethod;
}

export interface CashPaymentParams {
  cart_id: string;
  address_id: string;
  payment_method: PaymentMethod;
}

export type PaymentStatus = "idle" | "loading" | "success" | "error";
export type PaymentMethod = "card" | "cash";
