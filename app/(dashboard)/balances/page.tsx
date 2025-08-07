"use client";

import { useState, useEffect, useRef } from "react";
import { Spinner } from "@heroui/spinner";
import { Input } from "@heroui/input";

import { useCurrencies } from "@/app/features/balances/hooks/use-currencies";
import { useInfiniteBalances } from "@/app/features/balances/hooks/use-infinite-balances";
import {
  BalancesTable,
  Row,
} from "@/app/features/balances/components/balances-table";

export default function BalancesPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"code" | "symbol" | "amount">("amount");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data: currs, isLoading: loadingCurrencies } = useCurrencies();
  const currencyMap = new Map(currs?.map((c) => [c.id, c]) ?? []);

  const {
    data: infiniteData,
    isLoading: loadingBalances,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteBalances({
    sortBy: "amount",
    sortOrder,
  });

  const balances = infiniteData?.pages.flat() ?? [];

  const rows: Row[] = balances.map((b) => {
    const key = String(b.currency_id);
    const c = currencyMap.get(key);
    const amt = typeof b.amount === "number" ? b.amount : parseFloat(b.amount);

    return {
      id: b.id,
      code: c?.code ?? key,
      symbol: c?.symbol ?? "",
      amount: amt.toFixed(2),
    };
  });

  const filteredRows = rows.filter(
    (r) =>
      r.code.toLowerCase().includes(search.toLowerCase()) ||
      r.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && fetchNextPage(),
      { rootMargin: "200px" },
    );

    if (loader.current) obs.observe(loader.current);

    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (loadingCurrencies || loadingBalances) {
    return <Spinner label="Loading…" />;
  }

  const handleSort = (col: "code" | "symbol" | "amount") => {
    if (col === sortBy) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-6">
      <Input
        aria-label="Search currencies"
        placeholder="Search by code or symbol…"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />

      <BalancesTable
        rows={filteredRows}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      {hasNextPage && (
        <div ref={loader} className="h-10 flex items-center justify-center">
          {isFetchingNextPage && <Spinner label="Loading more…" size="sm" />}
        </div>
      )}
    </div>
  );
}
