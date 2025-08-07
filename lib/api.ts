export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) throw new Error((await res.text()) || res.statusText);

  return res.json();
}

export async function fetcherWithMeta<T>(url: string) {
  const res = await fetch(url);

  if (!res.ok) throw new Error("Network error");
  const data: T[] = await res.json();
  const total = Number(res.headers.get("x-total-count") ?? 0);
  const pageSize = Number(new URL(url).searchParams.get("limit"));
  const currentPage = Number(new URL(url).searchParams.get("page"));

  return {
    data,
    meta: {
      page: currentPage,
      pageCount: Math.ceil(total / pageSize),
    },
  };
}
