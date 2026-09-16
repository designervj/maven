/**
 * fetcher.ts
 * Generic typed HTTP helper used by Redux async thunks.
 */

export async function fetcher<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('access_token')
      : null;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-tenant-db': process.env.NEXT_PUBLIC_TENANT_ID || '',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    let message = errorBody;

    try {
      const parsed = JSON.parse(errorBody);
      message = parsed.detail || parsed.message || parsed.error || errorBody;
    } catch {
      message = errorBody;
    }

    throw new Error(message || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}
