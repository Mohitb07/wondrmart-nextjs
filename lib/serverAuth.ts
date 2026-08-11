// serverAuth.ts  (server-only)
import axios from "axios";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL!;

function parseSetCookieValue(setCookieStr: string) {
  const first = (setCookieStr.split(";")[0] || "").trim();
  const [name, ...valParts] = first.split("=");
  return { name: name?.trim(), value: valParts.join("=") };
}

export async function serverFetchWithRefresh<T>(
  url: string,
  opts: { method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"; body?: any } = {}
): Promise<{ data: T; refreshCookie?: string }> {
  const store = cookies();
  const targetUrl = `${API_BASE}${url}`;
  const accessTokenCookie = store.get("accessToken");
  const refresh = store.get("refresh_token");

  // 1) Try request with current access token if present
  if (accessTokenCookie?.value) {
    try {
      const apiRes = await axios.request<T>({
        url: targetUrl,
        method: opts.method ?? "GET",
        data: opts.body,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessTokenCookie.value}`,
        },
        validateStatus: () => true,
      });

      if (apiRes.status < 400) {
        return { data: apiRes.data };
      }
    } catch {
      /* fallback to refresh */
    }
  }

  // 2) Access token missing or expired; verify refresh token exists
  if (!refresh?.value) {
    throw new Error("NO_REFRESH");
  }

  // 3) Request fresh access token from auth server
  const refreshRes = await axios.post(`${API_BASE}/auth/refresh`, null, {
    withCredentials: true,
    headers: {
      Cookie: `${refresh.name}=${refresh.value}`,
    },
    validateStatus: () => true,
    maxRedirects: 0,
  });

  if (refreshRes.status >= 400 || !refreshRes.data?.accessToken) {
    throw new Error(
      `REFRESH_FAILED:${refreshRes.status}:${JSON.stringify(refreshRes.data ?? {})}`
    );
  }

  const newAccessToken = refreshRes.data.accessToken;

  // Persist updated accessToken to browser cookies if store permits
  try {
    store.set("accessToken", newAccessToken, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  } catch {
    /* Readonly cookie store context */
  }

  // Parse refresh cookie if backend rotated refresh_token
  const setCookieHeader = refreshRes.headers?.["set-cookie"];
  let refreshCookie: string | undefined;
  if (setCookieHeader) {
    const cookiesToForward = Array.isArray(setCookieHeader)
      ? setCookieHeader
      : [setCookieHeader];

    for (const cookieStr of cookiesToForward) {
      const parsed = parseSetCookieValue(cookieStr);
      if (parsed.name === "refresh_token") {
        refreshCookie = cookieStr;
        break;
      }
    }
  }

  // 4) Retry target API request with fresh access token
  const apiRes = await axios.request<T>({
    url: targetUrl,
    method: opts.method ?? "GET",
    data: opts.body,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${newAccessToken}`,
    },
    validateStatus: () => true,
  });

  if (apiRes.status >= 400) {
    throw new Error(
      `API_REQUEST_FAILED:${apiRes.status}:${JSON.stringify(apiRes.data ?? {})}`
    );
  }

  return { data: apiRes.data, refreshCookie };
}

