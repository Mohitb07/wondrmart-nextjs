import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { User } from "@/types";

export const BASE_URL = "/api"
const ACCESS_TOKEN_COOKIE_NAME = "accessToken";

// restore persisted access token on client reloads
let accessToken: string | null =
  typeof window !== "undefined"
    ? Cookies.get(ACCESS_TOKEN_COOKIE_NAME) ?? null
    : null;

export function setAccessToken(token: string | null) {
  accessToken = token;

  if (typeof window === "undefined") return;

  if (token) {
    Cookies.set(ACCESS_TOKEN_COOKIE_NAME, token, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  } else {
    Cookies.remove(ACCESS_TOKEN_COOKIE_NAME, { path: "/" });
  }
}
export function getAccessToken() {
  return accessToken;
}

export function parseJwt(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function isAccessTokenValid(token?: string | null): boolean {
  if (!token) return false;
  const payload = parseJwt(token);
  if (!payload || typeof payload !== "object") return false;
  if (!payload.exp) return true;
  return payload.exp * 1000 > Date.now() + 10000;
}

export function getUserFromToken(token?: string | null): User | null {
  if (!token) return null;
  const payload = parseJwt(token);
  if (!payload || typeof payload !== "object") return null;

  const rawUser = (payload.user && typeof payload.user === "object") ? payload.user : payload;
  const userId = rawUser.customer_id || rawUser.id || rawUser.sub;

  if (userId || rawUser.email || rawUser.username) {
    return {
      ...rawUser,
      id: rawUser.id || userId,
      customer_id: rawUser.customer_id || userId,
      username: rawUser.username || "",
      email: rawUser.email || "",
    } as User;
  }

  return null;
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

type RefreshResult = { accessToken: string; user: User };

let isRefreshing = false;
let refreshPromise: Promise<RefreshResult | null> | null = null;
type Subscriber = (result: RefreshResult | null) => void;
const subscribers: Subscriber[] = [];
function subscribe(cb: Subscriber) {
  subscribers.push(cb);
}
function notify(result: RefreshResult | null) {
  while (subscribers.length) (subscribers.shift() as Subscriber)(result);
}

/**
 * Single, shared, dedupe-safe refresh.
 * Anyone who needs to refresh the session (the response interceptor,
 * the AuthProvider bootstrap effect, StrictMode's double-invoke, etc.)
 * should call this instead of posting to /auth/refresh directly.
 * Only one real network request is ever in flight at a time; everyone
 * else awaits the same in-flight promise / subscribes to its result.
 */
export function doRefresh(): Promise<RefreshResult | null> {
  if (isRefreshing && refreshPromise) {
    return new Promise((resolve) => subscribe(resolve));
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const r = await refreshClient.post("/auth/refresh");
      const result: RefreshResult = {
        accessToken: r.data?.accessToken,
        user: r.data?.user,
      };
      setAccessToken(result.accessToken);
      notify(result);
      return result;
    } catch (refreshError) {
      setAccessToken(null);
      notify(null);
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken && config && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => {
    console.log("request error", err);
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err: AxiosError<any>) => {
    const originalRequest = err.config as any;
    // safety guards
    if (!err.response || !originalRequest) return Promise.reject(err);
    const status = err.response?.status;
    const message = err.response?.data?.message;
    const requestUrl = originalRequest.url || "";
    const isRefreshEndPoint =
      requestUrl.endsWith("/auth/refresh") ||
      requestUrl.includes("/auth/refresh?");
    const needRefresh = status === 401 && message === "ACCESS_TOKEN_EXPIRED";

    if (needRefresh && !isRefreshEndPoint) {
      // avoid retrying same request multiple times
      if (originalRequest._retry) {
        return Promise.reject(err);
      }

      const result = await doRefresh();
      if (!result) return Promise.reject(err); // refresh failed

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
      originalRequest._retry = true;
      return axiosInstance.request(originalRequest);
    }

    return Promise.reject(err);
  }
);