// serverAuth.ts  (server-only)
import axios from "axios";
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL!;

function parseSetCookieValue(setCookieStr: string) {
  const first = (setCookieStr.split(";")[0] || "").trim();
  const [name, ...valParts] = first.split("=");
  return { name: name?.trim(), value: valParts.join("=") };
}

// Parses a full Set-Cookie header string into structured cookie options
function parseFullSetCookie(setCookieStr: string): {
  name: string;
  value: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
  path: string;
  maxAge?: number;
} {
  const parts = setCookieStr.split(";").map((p) => p.trim());
  const [nameVal, ...attrParts] = parts;
  const eqIdx = (nameVal ?? "").indexOf("=");
  const name = nameVal!.substring(0, eqIdx).trim();
  const value = nameVal!.substring(eqIdx + 1);

  let httpOnly = false;
  let secure = false;
  let sameSite: "strict" | "lax" | "none" = "lax";
  let path = "/";
  let maxAge: number | undefined;

  for (const part of attrParts) {
    const lower = part.toLowerCase();
    if (lower === "httponly") { httpOnly = true; continue; }
    if (lower === "secure") { secure = true; continue; }
    if (lower.startsWith("samesite=")) {
      const val = part.split("=")[1]?.trim().toLowerCase();
      if (val === "none" || val === "strict" || val === "lax") sameSite = val;
      continue;
    }
    if (lower.startsWith("path=")) {
      path = part.split("=")[1]?.trim() ?? "/";
      continue;
    }
    if (lower.startsWith("max-age=")) {
      const v = parseInt(part.split("=")[1]?.trim() ?? "", 10);
      if (!isNaN(v)) maxAge = v;
      continue;
    }
  }

  return { name, value, httpOnly, secure, sameSite, path, maxAge };
}

function getJwtPayload(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(Buffer.from(base64, "base64").toString("utf8"));
  } catch {
    return null;
  }
}

function getAccessTokenMaxAgeSeconds(token: string): number | undefined {
  const payload = getJwtPayload(token);
  if (!payload?.exp) return undefined;

  return Math.max(0, Math.floor(payload.exp - Date.now() / 1000));
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
      maxAge: getAccessTokenMaxAgeSeconds(newAccessToken),
    });
  } catch {
    /* Readonly cookie store context */
  }

  // Parse and persist the rotated refresh_token cookie from the backend response.
  // store.set() succeeds in Server Actions and Route Handlers;
  // it throws (and is caught) in read-only Server Component render contexts.
  const setCookieHeader = refreshRes.headers?.["set-cookie"];
  let refreshCookie: string | undefined;
  if (setCookieHeader) {
    const cookiesToForward = Array.isArray(setCookieHeader)
      ? setCookieHeader
      : [setCookieHeader];

    for (const cookieStr of cookiesToForward) {
      const { name } = parseSetCookieValue(cookieStr);
      if (name === "refresh_token") {
        refreshCookie = cookieStr;

        try {
          const c = parseFullSetCookie(cookieStr);
          store.set(c.name, c.value, {
            httpOnly: c.httpOnly,
            secure: c.secure,
            sameSite: c.sameSite,
            path: c.path,
            ...(c.maxAge !== undefined ? { maxAge: c.maxAge } : {}),
          });
        } catch {
          // Readonly cookie store — refreshCookie string is still returned
          // for any caller that needs to forward it manually.
        }
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
