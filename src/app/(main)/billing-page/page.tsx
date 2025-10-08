"use client";

import { ChartCard } from "@/app/components/chart-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { TableBilling } from "@/app/components/table-billing";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerBody, DrawerFooter } from "@/app/components/ui/drawer";
import { Button } from "@/app/components/ui/button";
import { FilterIcon } from "@/app/components/ui/icons/bui_filter";
import { DateRangePicker } from "@/app/components/date-picker";
import { Checkbox } from "@/app/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { Collection, Transaction, TableBillingData } from "@/app/types/collection";

import StatsCard from "@/app/components/stats-card";
import CollectionCard from "@/app/components/collection";
import CloseButton from "@/app/components/close-icon";
import React from "react";
import { useFilterDate } from "@/app/context/filter-date";

// Helpers hoisted to module scope to keep stable identities for React hook deps
const toMs = (v: unknown): number => {
  if (v === undefined || v === null) return NaN;
  if (typeof v === 'number') return v < 1e12 ? v * 1000 : v;
  const n = Number(v);
  if (!isNaN(n) && String(v).trim() !== '') return n < 1e12 ? n * 1000 : n;
  const t = Date.parse(String(v));
  return isNaN(t) ? NaN : t;
};

const truncHour = (ms: number) => {
  const d = new Date(ms); return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours()).getTime();
};
const truncDay = (ms: number) => {
  const d = new Date(ms); return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
};
const truncMonth = (ms: number) => {
  const d = new Date(ms); return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
};
const rangeBuckets = (startMs: number, endMs: number, unit: 'hour' | 'day' | 'month'): number[] => {
  const buckets: number[] = [];
  if (isNaN(startMs) || isNaN(endMs) || endMs < startMs) return buckets;
  let cur = unit === 'hour' ? truncHour(startMs) : unit === 'day' ? truncDay(startMs) : truncMonth(startMs);
  const step = unit === 'hour' ? 3600000 : unit === 'day' ? 86400000 : 0; // month handled by date roll
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
const fillAndMap = (byKey: Record<number, number>, buckets: number[]) =>
  buckets.map((ms) => ({ bucket: new Date(ms).toISOString(), amount: byKey[ms] ?? 0 }));

type StateType = [boolean, () => void, () => void, () => void] &
{
  state: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const useToggleState = (initial = false) => {
  const [state, setState] = React.useState<boolean>(initial);
  const close = () => {setState(false);};
  const open = () => {setState(true);};
  const toggle = () => {setState((state) => !state);};
  const hookData = [state, open, close, toggle] as StateType;
  hookData.state = state;
  hookData.open = open;
  hookData.close = close;
  hookData.toggle = toggle;
  return hookData;
};

export default function BillingPage() {
  const { range } = useFilterDate();
  const [editOpen, showEdit, closeEdit] = useToggleState();
  const onSave = () => {
    closeEdit();
  };

  const { data: transactions, isLoading: isLoadingTransactions, isError: isErrorTransactions } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await fetch('/api/transactions', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      return response.json();
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0
  });


  const { data: collections, isLoading: isLoadingCollections, isError: isErrorCollections } = useQuery<Collection[]>({
    queryKey: ['collections'],
    queryFn: async () => {
      const response = await fetch('/api/collections', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch collections');
      }
      return response.json();
    },
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0
  });


  const filteredTransactions = React.useMemo(() => {
    if (!transactions) return [] as Transaction[];
    if (!range) return transactions;
    const startMs = range ? toMs(range.start) : NaN;
    const endMs = range ? toMs(range.end) : NaN;
    return transactions.filter((t) => {
      const ms = toMs(t.created_at);
      return !isNaN(ms) && !isNaN(startMs) && !isNaN(endMs) && ms >= startMs && ms <= endMs;
    });
  }, [transactions, range]);


  const totalPaidSeries = React.useMemo(() => {
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


  const paidDeltaTotals = React.useMemo(() => {
    const result = { current: 0, previous: 0 };
    if (!transactions || !range) return result;
    const start = toMs(range.start);
    const end = toMs(range.end);
    if (isNaN(start) || isNaN(end)) return result;
    const duration = end - start;
    const prevStart = start - duration;
    const prevEnd = end - duration;

    const currentTx = transactions.filter((t) => {
      const ms = toMs(t.created_at);
      return !isNaN(ms) && ms >= start && ms <= end;
    });
    result.current = currentTx.reduce((s, t) => s + (Number(t.amount) || 0), 0);

    const prevTx = transactions.filter((t) => {
      const ms = toMs(t.created_at);
      return !isNaN(ms) && ms >= prevStart && ms <= prevEnd;
    });
    result.previous = prevTx.reduce((s, t) => s + (Number(t.amount) || 0), 0);
    return result;
  }, [transactions, range]);


  const transformedData: TableBillingData[] = React.useMemo(() => {
    if (!filteredTransactions || !collections) return [];


    const transactionsByCollection = filteredTransactions.reduce((acc, transaction) => {
      if (!acc[transaction.collectionId]) {
        acc[transaction.collectionId] = [];
      }
      acc[transaction.collectionId].push(transaction);
      return acc;
    }, {} as Record<string, Transaction[]>);


    return collections.map((collection, index) => {
      const collectionTransactions = transactionsByCollection[collection.id] || [];
      const totalCollected = collectionTransactions.reduce((sum, t) => sum + t.amount, 0);
      const totalVolume = collectionTransactions.reduce((sum, t) => sum + t.volume, 0);


      const now = Math.floor(Date.now() / 1000);
      const hoursSinceCreation = Math.floor((now - collection.createdAt) / 3600);

      return {
        id: index + 1,
        name: collection.name,
        collectionId: collection.id,
        totalCollected: `RM${totalCollected.toFixed(2)}`,
        volume: totalVolume.toString(),
        status: collection.status.charAt(0).toUpperCase() + collection.status.slice(1),
        deltaType: totalCollected > 50 ? "Up" : "Down",
        hours: hoursSinceCreation
      };
    });
  }, [filteredTransactions, collections]);


  const TableDataAll = transformedData;
  const TableDataActive = transformedData.filter((c) => c.status === "Active");
  const TableDataInactive = transformedData.filter((c) => c.status === "Inactive");
  const isLoading = isLoadingTransactions || isLoadingCollections;
  const isError = isErrorTransactions || isErrorCollections;


  const totalTransactionsAmount = React.useMemo(() => {
    if (!filteredTransactions) return 0;
    return filteredTransactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
  }, [filteredTransactions]);

  return (
    <div className="flex flex-col gap-5">
            <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <ChartCard
          title="Total Paid"
          chartType="line"
          data={totalPaidSeries}
          index="bucket"
          categories={["amount"]}
          isLoading={isLoadingTransactions}
          deltaCurrentTotal={paidDeltaTotals.current}
          deltaPreviousTotal={paidDeltaTotals.previous} />

                {isLoading ?
        <div className="p-4 rounded-md border border-neutral-200 bg-white">
                        <div className="h-6 w-48 mb-3 bg-neutral-200 animate-pulse rounded" />
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-neutral-200 animate-pulse rounded" />
                            <div className="h-4 w-11/12 bg-neutral-200 animate-pulse rounded" />
                            <div className="h-4 w-10/12 bg-neutral-200 animate-pulse rounded" />
                            <div className="h-4 w-9/12 bg-neutral-200 animate-pulse rounded" />
                        </div>
                    </div> :

        <CollectionCard title="Top 5 Performing Collections" />
        }
                <div className="flex flex-col gap-5">
                    {isLoading ?
          <div className="p-4 rounded-md border border-neutral-200 bg-white animate-pulse">
                            <div className="h-4 w-24 mb-2 bg-neutral-200 rounded" />
                            <div className="h-6 w-32 bg-neutral-200 rounded" />
                        </div> :

          <StatsCard title="Total Paid" amount={totalTransactionsAmount} />
          }
                    {isLoading ?
          <div className="p-4 rounded-md border border-neutral-200 bg-white animate-pulse">
                            <div className="h-4 w-28 mb-2 bg-neutral-200 rounded" />
                            <div className="h-6 w-20 bg-neutral-200 rounded" />
                        </div> :

          <StatsCard title="Total Collections" amount={collections?.length || 0} />
          }
                </div>
            </div>
            <div>
                <span className="text-2xl font-bold">Collections</span>
                <Card className="rounded-md">
                    <Tabs defaultValue="all">
                        <div>
                            <TabsList className="flex flex-col-reverse items-end gap-2 md:flex-row md:justify-between w-full">
                                <div className="flex w-full gap-2">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                                    <TabsTrigger value="active">Active</TabsTrigger>
                                </div>
                                <div className="flex items-center gap-2 p-2">
                                    <Input placeholder="Search" className="w-full p-2" />
                                    <Button variant="secondary" onClick={showEdit} className="flex items-center gap-2"> <FilterIcon color="black" size={20} strokeWidth={1} /> Filter</Button>
                                </div>
                            </TabsList>
                        </div>
                        <TabsContent value="all">
                            {isLoading ?
              <div className="p-4">
                                    <div className="h-6 w-40 mb-3 bg-neutral-200 animate-pulse rounded" />
                                    <div className="h-64 w-full bg-neutral-200 animate-pulse rounded" />
                                </div> :
              isError ?
              <div className="p-4 text-center text-red-500">Error loading collections</div> :

              <TableBilling data={TableDataAll} />
              }
                        </TabsContent>
                        <TabsContent value="inactive">
                            {isLoading ?
              <div className="p-4">
                                    <div className="h-6 w-40 mb-3 bg-neutral-200 animate-pulse rounded" />
                                    <div className="h-64 w-full bg-neutral-200 animate-pulse rounded" />
                                </div> :
              isError ?
              <div className="p-4 text-center text-red-500">Error loading collections</div> :

              <TableBilling data={TableDataInactive} />
              }
                        </TabsContent>
                        <TabsContent value="active">
                            {isLoading ?
              <div className="p-4">
                                    <div className="h-6 w-40 mb-3 bg-neutral-200 animate-pulse rounded" />
                                    <div className="h-64 w-full bg-neutral-200 animate-pulse rounded" />
                                </div> :
              isError ?
              <div className="p-4 text-center text-red-500">Error loading collections</div> :

              <TableBilling data={TableDataActive} />
              }
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
            <Drawer open={editOpen} onOpenChange={(modalOpened) => {if (!modalOpened) {closeEdit();}}}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle><span>Filter</span></DrawerTitle>
                        <DrawerClose><CloseButton onClick={closeEdit} /></DrawerClose>
                    </DrawerHeader>
                    <DrawerBody className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <span>Collection Name</span>
                            <Input placeholder="Type to search" />
                        </div>
                        <div>
                            <span>Date Range</span>
                            <DateRangePicker />
                        </div>
                        <div>
                            <span>Status</span>
                            <div className="flex items-center gap-2">
                                <Checkbox defaultChecked id="r1" />
                                <span>Paid</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="r2" />
                                <span>Unpaid</span>
                            </div>
                        </div>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button onClick={onSave}>ApplyFilter</Button>
                        <Button variant="secondary" onClick={closeEdit}>Reset</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>);

}