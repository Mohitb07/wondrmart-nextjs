export type AdminRole = "ADMIN" | "SUPERADMIN";

export interface AdminUser {
  id: string;
  admin_id?: string;
  username: string;
  email: string;
  role: AdminRole;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminAuthResponse {
  message: string;
  token: string;
  admin: AdminUser;
}

export interface AdminRegisterResponse {
  message: string;
  admin: AdminUser;
}

export interface AdminProduct {
  product_id: string;
  name: string;
  description: string;
  price: string | number;
  image_url: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminProductsResponse {
  products: AdminProduct[];
  pagination: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number | string;
  image_url: string;
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number | string;
  image_url?: string;
}

// Storefront Customer / User Management Types
export interface AdminCustomerAddress {
  address_id: string;
  street?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  is_default?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminCustomerOrder {
  order_id: string;
  order_amount: number | string;
  payment_method: string;
  status: string;
  createdAt: string;
}

export interface AdminCustomer {
  customer_id: string;
  username: string;
  email: string;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    orders: number;
    addresses: number;
  };
}

export interface AdminCustomerDetail extends AdminCustomer {
  addresses: AdminCustomerAddress[];
  orders: AdminCustomerOrder[];
}

export interface AdminCustomersResponse {
  users: AdminCustomer[];
  pagination: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}
