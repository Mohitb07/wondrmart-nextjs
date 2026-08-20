import axios from "axios";
import Cookies from "js-cookie";
import {
  AdminAuthResponse,
  AdminRegisterResponse,
  AdminUser,
  AdminProductsResponse,
  AdminProduct,
  CreateProductPayload,
  UpdateProductPayload,
  AdminCustomersResponse,
  AdminCustomerDetail,
} from "@/types/admin";

export const ADMIN_TOKEN_COOKIE_NAME = "adminAccessToken";

let adminToken: string | null =
  typeof window !== "undefined"
    ? Cookies.get(ADMIN_TOKEN_COOKIE_NAME) ?? null
    : null;

export function setAdminToken(token: string | null) {
  adminToken = token;
  if (typeof window === "undefined") return;

  if (token) {
    Cookies.set(ADMIN_TOKEN_COOKIE_NAME, token, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: 1, // 1 day
    });
  } else {
    Cookies.remove(ADMIN_TOKEN_COOKIE_NAME, { path: "/" });
  }
}

export function getAdminToken(): string | null {
  if (!adminToken && typeof window !== "undefined") {
    adminToken = Cookies.get(ADMIN_TOKEN_COOKIE_NAME) ?? null;
  }
  return adminToken;
}

export const adminAxios = axios.create({
  baseURL: "/api/admin",
  headers: {
    "Content-Type": "application/json",
  },
});

adminAxios.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Admin Auth API
export async function adminLoginApi(
  email: string,
  password: string
): Promise<AdminAuthResponse> {
  const res = await adminAxios.post<AdminAuthResponse>("/auth/login", {
    email,
    password,
  });
  return res.data;
}

export async function adminRegisterApi(
  username: string,
  email: string,
  password: string,
  role?: string
): Promise<AdminRegisterResponse> {
  const res = await adminAxios.post<AdminRegisterResponse>("/auth/register", {
    username,
    email,
    password,
    role,
  });
  return res.data;
}

export async function adminVerifyEmailApi(
  token: string,
  email: string
): Promise<{ message: string }> {
  const res = await adminAxios.post<{ message: string }>("/auth/verify-email", {
    token,
    email,
  });
  return res.data;
}

export async function adminResendVerificationApi(
  email: string
): Promise<{ message: string }> {
  const res = await adminAxios.post<{ message: string }>(
    "/auth/resend-verification",
    {
      email,
    }
  );
  return res.data;
}

export async function getAdminProfileApi(): Promise<{ admin: AdminUser }> {
  const res = await adminAxios.get<{ admin: AdminUser }>("/auth/me");
  return res.data;
}

export async function adminForgotPasswordApi(
  email: string
): Promise<{ message: string }> {
  const res = await adminAxios.post<{ message: string }>("/auth/forgot-password", {
    email,
  });
  return res.data;
}

export async function adminResetPasswordApi(
  token: string,
  email: string,
  password: string
): Promise<{ message: string }> {
  const res = await adminAxios.post<{ message: string }>("/auth/reset-password", {
    token,
    email,
    password,
  });
  return res.data;
}

// Admin Products API
export async function fetchAdminProductsApi(params?: {
  query?: string;
  page?: number;
  limit?: number;
  sortby?: string;
}): Promise<AdminProductsResponse> {
  const res = await adminAxios.get<AdminProductsResponse>("/products", {
    params,
  });
  return res.data;
}

export async function fetchAdminProductByIdApi(
  productId: string
): Promise<AdminProduct> {
  const res = await adminAxios.get<AdminProduct>(`/products/${productId}`);
  return res.data;
}

export async function createAdminProductApi(
  payload: CreateProductPayload
): Promise<{ message: string; product: AdminProduct }> {
  const res = await adminAxios.post<{ message: string; product: AdminProduct }>(
    "/products",
    payload
  );
  return res.data;
}

export async function updateAdminProductApi(
  productId: string,
  payload: UpdateProductPayload
): Promise<{ message: string; product: AdminProduct }> {
  const res = await adminAxios.put<{ message: string; product: AdminProduct }>(
    `/products/${productId}`,
    payload
  );
  return res.data;
}

export async function deleteAdminProductApi(
  productId: string
): Promise<{ message: string }> {
  const res = await adminAxios.delete<{ message: string }>(
    `/products/${productId}`
  );
  return res.data;
}

// Storefront Customers / Users Management API
export async function fetchAdminUsersApi(params?: {
  query?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortby?: string;
}): Promise<AdminCustomersResponse> {
  const res = await adminAxios.get<AdminCustomersResponse>("/users", {
    params,
  });
  return res.data;
}

export async function fetchAdminUserByIdApi(
  userId: string
): Promise<{ user: AdminCustomerDetail }> {
  const res = await adminAxios.get<{ user: AdminCustomerDetail }>(
    `/users/${userId}`
  );
  return res.data;
}
