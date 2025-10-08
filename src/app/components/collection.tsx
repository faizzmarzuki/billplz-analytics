"use client";

import CollectionProgress from "./collection-progress";
import { Card } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useFilterDate } from "@/app/context/filter-date";
import type { Transaction, Collection } from "@/app/types/collection";

interface CollectionProps {
  title: string;
}

export default function CollectionCard({ title }: CollectionProps) {
  const { range } = useFilterDate();

  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await fetch("/api/transactions", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch transactions");
      return res.json();
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0
  });
  const { data: collections } = useQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await fetch("/api/collections", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch collections");
      return res.json();
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0
  });

  const toMs = (v: any): number => {
    if (v === undefined || v === null) return NaN;
    if (typeof v === "number") return v < 1e12 ? v * 1000 : v;
    const n = Number(v);
    if (!isNaN(n) && String(v).trim() !== "") return n < 1e12 ? n * 1000 : n;
    const t = Date.parse(String(v));
    return isNaN(t) ? NaN : t;
  };

  const top5 = React.useMemo(() => {
    if (!transactions) return [] as {title: string;amount: number;}[];
    const startMs = range ? toMs(range.start) : NaN;
    const endMs = range ? toMs(range.end) : NaN;
    const filtered = range ?
    transactions.filter((t) => {
      const ms = toMs(t.created_at);
      return !isNaN(ms) && !isNaN(startMs) && !isNaN(endMs) && ms >= startMs && ms <= endMs;
    }) :
    transactions;


    const nameById: Record<string, string> = {};
    (collections || []).forEach((c) => {
      nameById[c.id] = c.name;
    });

    const sums: Record<string, number> = {};
    filtered.forEach((t) => {
      const key = t.collectionId || "unknown";
      sums[key] = (sums[key] ?? 0) + (Number(t.amount) || 0);
    });
    const entries = Object.entries(sums).
    map(([cid, amount]) => ({ cid, amount, title: nameById[cid] || cid })).
    sort((a, b) => b.amount - a.amount).
    slice(0, 5);
    return entries.map(({ title, amount }) => ({ title, amount }));
  }, [transactions, collections, range]);

  const total = top5.reduce((s, i) => s + i.amount, 0) || 1;

  return (
    <Card className="p-4 rounded-md">
            <h1 className="font-bold">{title}</h1>
            {top5.length === 0 ?
      <div className="text-sm text-neutral-500 py-2">No collections in selected period</div> :

      top5.map((item, index) =>
      <CollectionProgress
        key={index}
        title={item.title}
        amount={item.amount}
        percentage={Math.round(item.amount / total * 100)} />

      )
      }
        </Card>);

}