export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string>;

  constructor(message: string, status: number, errors?: Record<string, string>) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string | null;
}

// Thin fetch wrapper: JSON in/out, Bearer token, errors thrown as ApiError
export async function api<T = unknown>(
  path: string,
  { method = "GET", body, token }: RequestOptions = {},
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Cannot reach the server. Check your connection.", 0);
  }

  const data = await res.json().catch(() => null);
  if (!res.ok || data?.success === false) {
    throw new ApiError(
      data?.message || "Something went wrong. Please try again.",
      res.status,
      data?.errors,
    );
  }
  return data as T;
}
