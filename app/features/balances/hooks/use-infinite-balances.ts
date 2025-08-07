"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { fetcher } from "@/lib/api";

export type Balance = {
  id: string;
  currency_id: string;
  amount: number;
};

export interface UseInfiniteBalancesOpts {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  pageSize?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export function useInfiniteBalances({
  search = "",
  sortBy = "amount",
  sortOrder = "asc",
  pageSize = 20,
}: UseInfiniteBalancesOpts = {}) {
  return useInfiniteQuery<Balance[]>({
    queryKey: ["balances", { search, sortBy, sortOrder }],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: String(pageParam),
        limit: String(pageSize),
        search,
        sortBy,
        order: sortOrder,
      });
      const url = `${BASE_URL}/balances?${params.toString()}`;

      return fetcher<Balance[]>(url);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === pageSize ? allPages.length + 1 : undefined,
  });
}
