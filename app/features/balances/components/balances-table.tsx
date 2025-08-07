"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { ChevronUp, ChevronDown } from "lucide-react";

export interface Row {
  id: string;
  code: string;
  symbol: string;
  amount: string;
}

interface BalancesTableProps {
  rows: Row[];
  sortBy: "code" | "symbol" | "amount";
  sortOrder: "asc" | "desc";
  onSort: (column: "code" | "symbol" | "amount") => void;
}

export function BalancesTable({
  rows,
  sortBy,
  sortOrder,
  onSort,
}: BalancesTableProps) {
  const renderHeader = (
    label: string,
    column: "code" | "symbol" | "amount",
  ) => {
    const isActive = sortBy === column;

    return (
      <button
        className="flex items-center gap-1 cursor-pointer select-none bg-transparent p-0"
        type="button"
        onClick={() => onSort(column)}
      >
        {label}
        {isActive &&
          (sortOrder === "asc" ? (
            <ChevronUp aria-label="ascending" className="w-4 h-4" />
          ) : (
            <ChevronDown aria-label="descending" className="w-4 h-4" />
          ))}
      </button>
    );
  };

  return (
    <Table aria-label="Your Balances">
      <TableHeader>
        <TableColumn>{renderHeader("Currency", "code")}</TableColumn>
        <TableColumn>{renderHeader("Symbol", "symbol")}</TableColumn>
        <TableColumn>{renderHeader("Amount", "amount")}</TableColumn>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id}>
            <TableCell>{r.code}</TableCell>
            <TableCell>{r.symbol}</TableCell>
            <TableCell align="right">{r.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
