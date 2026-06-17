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
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(errorBody || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}
