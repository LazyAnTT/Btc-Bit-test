"use client";

import { useQuery } from "@tanstack/react-query";

import { fetcher } from "@/lib/api";

export type Currency = {
  id: string;
  code: string;
  symbol: string;
};

export function useCurrencies() {
  return useQuery<Currency[], Error>({
    queryKey: ["currencies"],
    queryFn: () =>
      fetcher<Currency[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/currencies`),
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
}
