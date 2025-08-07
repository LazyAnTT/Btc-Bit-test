export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) throw new Error((await res.text()) || res.statusText);

  return res.json();
}
