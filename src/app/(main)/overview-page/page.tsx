"use client";

import { ChartCard } from "@/app/components/chart-card";
import CollectionCard from "@/app/components/collection";
import UpcomingFPX from "@/app/components/upcoming-fpx";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Collection, Transaction } from "@/app/types/collection";
import { useFilterDate } from "@/app/context/filter-date";

const toYMD = (d: Date) => {
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${day}`;
};
const toMs = (v: unknown): number => {
  if (v === undefined || v === null) return NaN;
  if (typeof v === 'number') return v < 1e12 ? v * 1000 : v;
  const n = Number(v);
  if (!isNaN(n) && String(v).trim() !== '') return n < 1e12 ? n * 1000 : n;
  const t = Date.parse(String(v));
  return isNaN(t) ? NaN : t;
};
const truncHour = (ms: number) => { const d = new Date(ms); return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()).getTime(); };
const truncDay = (ms: number) => { const d = new Date(ms); return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); };
const truncMonth = (ms: number) => { const d = new Date(ms); return new Date(d.getFullYear(), d.getMonth(), 1).getTime(); };
const rangeBuckets = (startMs: number, endMs: number, unit: 'hour' | 'day' | 'month'): number[] => {
  const buckets: number[] = [];
  if (isNaN(startMs) || isNaN(endMs) || endMs < startMs) return buckets;
  let cur = unit === 'hour' ? truncHour(startMs) : unit === 'day' ? truncDay(startMs) : truncMonth(startMs);
  const step = unit === 'hour' ? 3600000 : unit === 'day' ? 86400000 : 0;
  while (cur <= endMs) {
    buckets.push(cur);
    if (unit === 'month') {
      const d = new Date(cur);
      cur = new Date(d.getFullYear(), d.getMonth() + 1, 1).getTime();
    } else {
      cur += step;
    }
  }
  return buckets;
};
const chooseUnit = (startMs?: number, endMs?: number): 'hour' | 'day' | 'month' => {
  if (!startMs || !endMs) return 'day';
  const span = endMs - startMs;
  if (span <= 24 * 60 * 60 * 1000) return 'hour';
  if (span <= 31 * 24 * 60 * 60 * 1000) return 'day';
  return 'month';
};
const fillAndMap = (byKey: Record<number, number>, buckets: number[]) => {
  return buckets.map((ms) => ({ bucket: new Date(ms).toISOString(), amount: byKey[ms] ?? 0 }));
};

export default function OverviewPage() {
  const { range } = useFilterDate();

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await fetch('/api/transactions', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch transactions');
      return res.json();
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0
  });


  const { data: collections, isLoading: isLoadingCollections } = useQuery<Collection[]>({
    queryKey: ['collections'],
    queryFn: async () => {
      const res = await fetch('/api/collections', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch collections');
      return res.json();
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0
  });

 
  const filteredTransactions = React.useMemo(() => {
    if (!transactions) return [] as Transaction[];
    if (!range) return transactions;
    const startMs = toMs(range.start);
    const endMs = toMs(range.end);
    return transactions.filter((t) => {
      const ms = toMs(t.created_at);
      return !isNaN(ms) && !isNaN(startMs) && !isNaN(endMs) && ms >= startMs && ms <= endMs;
    });
  }, [transactions, range]);


  const totalCollectionsSeries = React.useMemo(() => {
    if (!filteredTransactions) return [] as {bucket: string;amount: number;}[];
    const startMs = range ? toMs(range.start) : NaN;
    const endMs = range ? toMs(range.end) : NaN;
    const unit = chooseUnit(startMs, endMs);
    const byKey: Record<number, number> = {};
    filteredTransactions.forEach((t) => {
      const ms = toMs(t.created_at);
      if (!isNaN(ms)) {
        const key = unit === 'hour' ? truncHour(ms) : unit === 'day' ? truncDay(ms) : truncMonth(ms);
        byKey[key] = (byKey[key] ?? 0) + (Number(t.amount) || 0);
      }
    });
    const buckets = range ? rangeBuckets(startMs, endMs, unit) : Object.keys(byKey).map(Number).sort((a, b) => a - b);
    return fillAndMap(byKey, buckets);
  }, [filteredTransactions, range]);


  const prevWindow = React.useMemo(() => {
    if (!range) return null as null | {start: number;end: number;duration: number;};
    const start = toMs(range.start);
    const end = toMs(range.end);
    if (isNaN(start) || isNaN(end)) return null;
    const duration = end - start;
    return { start: start - duration, end: end - duration, duration };
  }, [range]);


  const totalsForDelta = React.useMemo(() => {
    const result = {
      collections: { current: 0, previous: 0 },
      transactions: { current: 0, previous: 0 },
      payouts: { current: 0, previous: 0 }
    };
    if (!transactions || !range) return result;
    const startMs = toMs(range.start);
    const endMs = toMs(range.end);
    if (isNaN(startMs) || isNaN(endMs)) return result;
    const prev = prevWindow;

    const currentTx = transactions.filter((t) => {
      const ms = toMs(t.created_at);
      return !isNaN(ms) && ms >= startMs && ms <= endMs;
    });
    result.transactions.current = currentTx.length;
    result.collections.current = currentTx.reduce((s, t) => s + (Number(t.amount) || 0), 0);

    const now = Date.now();
    result.payouts.current = currentTx.reduce((s, t) => {
      const sms = toMs(t.settlement_date);
      if (isNaN(sms) || sms >= now) return s;
      if (sms < startMs || sms > endMs) return s;
      return s + (Number(t.amount) || 0);
    }, 0);

    if (prev) {
      const prevTx = transactions.filter((t) => {
        const ms = toMs(t.created_at);
        return !isNaN(ms) && ms >= prev.start && ms <= prev.end;
      });
      result.transactions.previous = prevTx.length;
      result.collections.previous = prevTx.reduce((s, t) => s + (Number(t.amount) || 0), 0);
      result.payouts.previous = prevTx.reduce((s, t) => {
        const sms = toMs(t.settlement_date);
        if (isNaN(sms) || sms >= now) return s;
        if (sms < prev.start || sms > prev.end) return s;
        return s + (Number(t.amount) || 0);
      }, 0);
    }
    return result;
  }, [transactions, range, prevWindow]);


  const totalTransactionsSeries = React.useMemo(() => {
    if (!filteredTransactions) return [] as {bucket: string;amount: number;}[];
    const startMs = range ? toMs(range.start) : NaN;
    const endMs = range ? toMs(range.end) : NaN;
    const unit = chooseUnit(startMs, endMs);
    const byKey: Record<number, number> = {};
    filteredTransactions.forEach((t) => {
      const ms = toMs(t.created_at);
      if (!isNaN(ms)) {
        const key = unit === 'hour' ? truncHour(ms) : unit === 'day' ? truncDay(ms) : truncMonth(ms);
        byKey[key] = (byKey[key] ?? 0) + 1;
      }
    });
    const buckets = range ? rangeBuckets(startMs, endMs, unit) : Object.keys(byKey).map(Number).sort((a, b) => a - b);
    return fillAndMap(byKey, buckets);
  }, [filteredTransactions, range]);


  const upcomingFpxData = React.useMemo(() => {
    if (!transactions) return [] as {date: string;value: number;}[];
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const futureByDay: Record<string, number> = {};
    const pastByDay: Record<string, number> = {};
    transactions.forEach((t) => {
      const ms = toMs(t.settlement_date);
      if (isNaN(ms)) return;
      const dayStr = toYMD(new Date(ms));
      const amt = Number(t.amount) || 0;
      if (ms >= startOfToday.getTime()) {
        futureByDay[dayStr] = (futureByDay[dayStr] ?? 0) + amt;
      } else {
        pastByDay[dayStr] = (pastByDay[dayStr] ?? 0) + amt;
      }
    });
    const future = Object.entries(futureByDay).
    map(([date, value]) => ({ date, value })).
    sort((a, b) => a.date.localeCompare(b.date)).
    slice(0, 5);
    if (future.length > 0) return future;

    const past = Object.entries(pastByDay).
    map(([date, value]) => ({ date, value })).
    sort((a, b) => b.date.localeCompare(a.date)).
    slice(0, 5);
    return past;
  }, [transactions]);


  const lastSettlementDate = React.useMemo(() => {
    if (!transactions) return null as string | null;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const past: number[] = [];
    transactions.forEach((t) => {
      const ms = toMs(t.settlement_date);
      if (!isNaN(ms) && ms < startOfToday.getTime()) past.push(ms);
    });
    past.sort((a, b) => b - a);
    return past.length ? toYMD(new Date(past[0])) : null;
  }, [transactions]);


  const totalPayoutsSeries = React.useMemo(() => {
    if (!filteredTransactions) return [] as {bucket: string;amount: number;}[];
    const now = Date.now();
    const startMs = range ? toMs(range.start) : NaN;
    const endMs = range ? toMs(range.end) : NaN;
    const unit = chooseUnit(startMs, endMs);
    const byKey: Record<number, number> = {};
    filteredTransactions.forEach((t) => {
      const ms = toMs(t.settlement_date);
      if (!isNaN(ms) && ms < now) {
        const key = unit === 'hour' ? truncHour(ms) : unit === 'day' ? truncDay(ms) : truncMonth(ms);
        byKey[key] = (byKey[key] ?? 0) + (Number(t.amount) || 0);
      }
    });
    const buckets = range ? rangeBuckets(startMs, endMs, unit) : Object.keys(byKey).map(Number).sort((a, b) => a - b);
    return fillAndMap(byKey, buckets);
  }, [filteredTransactions, range]);


  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('[OverviewPage] upcomingFpxData', upcomingFpxData);
      console.log('[OverviewPage] lastSettlementDate', lastSettlementDate);
    }
  }, [upcomingFpxData, lastSettlementDate]);


  const collectionsStatusPie = React.useMemo(() => {
    if (!collections) return [["Status", "Count"]] as any[];
    const active = collections.filter((c) => String(c.status).toLowerCase() === 'active').length;
    const inactive = collections.filter((c) => String(c.status).toLowerCase() === 'inactive').length;
    return [["Status", "Count"], ["Active", active], ["Inactive", inactive]];
  }, [collections]);


  const byPaymentMethodPie = React.useMemo(() => {
    if (!filteredTransactions) return [["Method", "Count"]] as any[];
    const counts: Record<string, number> = {};
    filteredTransactions.forEach((t) => {
      counts[t.payment_method] = (counts[t.payment_method] ?? 0) + 1;
    });
    const rows = Object.entries(counts).map(([method, count]) => [method, count]);
    return [["Method", "Count"], ...rows];
  }, [filteredTransactions]);

  return (
    <div className="flex flex-col gap-5">
            <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                
                <ChartCard title="Total Collections" chartType="line" data={totalCollectionsSeries} index="bucket" categories={["amount"]} isLoading={isLoadingTransactions} deltaCurrentTotal={totalsForDelta.collections.current} deltaPreviousTotal={totalsForDelta.collections.previous} />
                
                <ChartCard title="Total Transactions" chartType="line" data={totalTransactionsSeries} index="bucket" categories={["amount"]} isLoading={isLoadingTransactions} currencyPrefix="" headerOverride={filteredTransactions?.length ?? 0} showHeaderDelta={true} deltaCurrentTotal={totalsForDelta.transactions.current} deltaPreviousTotal={totalsForDelta.transactions.previous} />
                
                <UpcomingFPX data={upcomingFpxData} lastSettlementDate={lastSettlementDate} isLoading={isLoadingTransactions} />
                
                <ChartCard title="Total Payouts" chartType="line" data={totalPayoutsSeries} index="bucket" categories={["amount"]} isLoading={isLoadingTransactions} deltaCurrentTotal={totalsForDelta.payouts.current} deltaPreviousTotal={totalsForDelta.payouts.previous} />
                
                {isLoadingTransactions ?
        <div className="p-4 rounded-md border border-neutral-200 bg-white">
                        <div className="h-6 w-40 mb-3 bg-neutral-200 animate-pulse rounded" />
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-neutral-200 animate-pulse rounded" />
                            <div className="h-4 w-11/12 bg-neutral-200 animate-pulse rounded" />
                            <div className="h-4 w-10/12 bg-neutral-200 animate-pulse rounded" />
                            <div className="h-4 w-9/12 bg-neutral-200 animate-pulse rounded" />
                        </div>
                    </div> :

        <CollectionCard title="Top 5 Performing Collections" />
        }
                
                {isLoadingTransactions ?
        <div className="p-4 rounded-md border border-neutral-200 bg-white">
                        <div className="h-6 w-60 mb-3 bg-neutral-200 animate-pulse rounded" />
                        <div className="h-48 w-full bg-neutral-200 animate-pulse rounded" />
                    </div> :

        <ChartCard title="Active vs Inactive Collections" chartType="pie" data={collectionsStatusPie} index="date" categories={["value"]} color={["#3784F4", "#E8E8E8"]} />
        }
                
                {isLoadingTransactions ?
        <div className="p-4 rounded-md border border-neutral-200 bg-white">
                        <div className="h-6 w-64 mb-3 bg-neutral-200 animate-pulse rounded" />
                        <div className="h-48 w-full bg-neutral-200 animate-pulse rounded" />
                    </div> :

        <ChartCard title="Collections by Payment Method" chartType="pie" data={byPaymentMethodPie} index="date" categories={["value"]} color={["#3784F4", "#84B6FF", "#AECFFF"]} />
        }
            </div>
        </div>);

}