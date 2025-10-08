import { Card } from "@/app/components/ui/card";
import { LineChart } from "@/app/components/ui/charts/line-chart";
import PieChart from "@/app/components/ui/charts/pie-chart";
import React from "react";

interface ChartCardProps {
  title: string;
  chartType: "line" | "pie";
  data: any;
  index: string;
  categories: string[];
  color?: any;
  isLoading?: boolean;
  currencyPrefix?: string;
  headerOverride?: string | number;
  showHeaderDelta?: boolean;
  deltaCurrentTotal?: number;
  deltaPreviousTotal?: number;
}

export const ChartCard = ({ title, chartType, data, index, categories, color, isLoading = false, currencyPrefix = "RM ", headerOverride, showHeaderDelta = true, deltaCurrentTotal, deltaPreviousTotal }: ChartCardProps) => {

  const normalizedData = React.useMemo(() => {
    if (!Array.isArray(data)) return [] as any[];
    const pad2 = (n: number) => n < 10 ? `0${n}` : `${n}`;
    const toMs = (v: any): number => {
      if (v === undefined || v === null) return NaN;
      if (typeof v === 'number') return v < 1e12 ? v * 1000 : v;
      const n = Number(v);
      if (!isNaN(n) && String(v).trim() !== '') return n < 1e12 ? n * 1000 : n;
      return Date.parse(v);
    };
    const startOf = (d: Date, unit: 'year' | 'month' | 'day' | 'time'): Date => {
      if (unit === 'year') return new Date(d.getFullYear(), 0, 1, 0, 0, 0, 0);
      if (unit === 'month') return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
      if (unit === 'day') return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);

      return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), 0, 0);
    };
    const labelOf = (d: Date, unit: 'year' | 'month' | 'day' | 'time', opts?: {weekdayShort?: boolean;}): string => {
      if (unit === 'year') return `${d.getFullYear()}`;
      if (unit === 'month') return d.toLocaleDateString('en-GB', { month: 'short' });
      if (unit === 'day') {
        if (opts?.weekdayShort) return d.toLocaleDateString('en-GB', { weekday: 'short' });
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }

      return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
    };


    const withTs = data.map((item: any) => {
      const raw = item?.[index];
      const ms = toMs(raw);
      return { ...item, __ts: ms };
    }).filter((x: any) => !isNaN(x.__ts));

    if (withTs.length === 0) return [] as any[];


    if (index === 'bucket') {
      const times = withTs.map((x: any) => x.__ts).sort((a: number, b: number) => a - b);
      const min = times[0];
      const max = times[times.length - 1];
      const span = max - min;

      const isMonthlyBuckets = withTs.every((it: any) => {
        const d = new Date(it.__ts);
        return d.getUTCDate() === 1 && d.getUTCHours() === 0 && d.getUTCMinutes() === 0;
      });

      const diffs = times.slice(1).map((t, i) => t - times[i]);
      const avgDiff = diffs.length ? diffs.reduce((a, b) => a + b, 0) / diffs.length : 0;
      const approxMonthly = avgDiff >= 27 * 24 * 60 * 60 * 1000;
      let unit: 'time' | 'day' | 'month';
      if (isMonthlyBuckets || approxMonthly) unit = 'month';else
      if (span <= 24 * 60 * 60 * 1000) unit = 'time';else
      unit = 'day';
      const useWeekdayShort = unit === 'day' && span <= 7 * 24 * 60 * 60 * 1000;
      const sorted = withTs.sort((a: any, b: any) => a.__ts - b.__ts).map(({ __ts, ...rest }: any) => {
        const d = new Date(__ts);
        return { ...rest, [index]: labelOf(d, unit, { weekdayShort: useWeekdayShort }) };
      });
      return sorted;
    }


    const years = new Set<number>();
    const ym = new Set<string>();
    const ymd = new Set<string>();
    withTs.forEach((it: any) => {
      const d = new Date(it.__ts);
      years.add(d.getFullYear());
      ym.add(`${d.getFullYear()}-${pad2(d.getMonth() + 1)}`);
      ymd.add(`${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`);
    });
    let unit: 'year' | 'month' | 'day' | 'time' = 'time';
    if (index === 'date') {

      unit = 'day';
    } else {

      if (ym.size > 1 && ymd.size <= ym.size) unit = 'month';else
      if (years.size > 1) unit = 'year';else
      if (ym.size > 1) unit = 'month';else
      if (ymd.size > 1) unit = 'day';else
      unit = 'time';
    }


    const groups = new Map<number, any>();
    withTs.forEach((it: any) => {
      const d = new Date(it.__ts);
      const groupDate = startOf(d, unit);
      const key = groupDate.getTime();
      const existing = groups.get(key) ?? { [index]: labelOf(groupDate, unit) };

      categories.forEach((cat) => {
        const val = typeof it?.[cat] === 'number' ? it[cat] : Number(it?.[cat] ?? 0);
        existing[cat] = (existing[cat] ?? 0) + (isNaN(val) ? 0 : val);
      });

      (existing as any).__ts = key;
      groups.set(key, existing);
    });


    const aggregated = Array.from(groups.values()).sort((a: any, b: any) => (a.__ts ?? 0) - (b.__ts ?? 0));
    return aggregated.map(({ __ts, ...rest }: any) => rest);
  }, [data, index, categories]);


  const totalAmount = (items: any[]) => {
    if (!Array.isArray(items) || items.length === 0) return 0;
    const sum = items.reduce((acc, curr) => {
      const val = typeof curr?.amount === 'number' ? curr.amount : Number(curr?.amount ?? 0);
      return acc + (isNaN(val) ? 0 : val);
    }, 0);
    return sum.toFixed(2);
  };


  const deltaDescriptor = (items: any[]) => {
    const asDescriptor = (curr: number, prev: number) => {
      if (isNaN(prev) || prev <= 0) {
        if (curr > 0) return { text: '↑ New', className: 'text-green-500' };
        return { text: '0%', className: 'text-neutral-500' };
      }
      const pct = (curr - prev) / prev * 100;
      if (pct > 0) return { text: `↑ ${Math.abs(pct).toFixed(2)}%`, className: 'text-green-500' };
      if (pct < 0) return { text: `↓ ${Math.abs(pct).toFixed(2)}%`, className: 'text-red-500' };
      return { text: '0%', className: 'text-neutral-500' };
    };
    if (typeof deltaCurrentTotal === 'number' && typeof deltaPreviousTotal === 'number') {
      const prev = Number(deltaPreviousTotal) || 0;
      const curr = Number(deltaCurrentTotal) || 0;
      return asDescriptor(curr, prev);
    }
    if (!Array.isArray(items) || items.length < 2) return { text: '0%', className: 'text-neutral-500' };
    const toTime = (v: any) => {
      if (typeof v === 'number') {

        return v < 1e12 ? v * 1000 : v;
      }
      const t = new Date(v as string).getTime();
      return isNaN(t) ? 0 : t;
    };
    const sorted = [...items].sort((a, b) => toTime(a?.[index]) - toTime(b?.[index]));
    const prev = typeof sorted[sorted.length - 2]?.amount === 'number' ? sorted[sorted.length - 2].amount : Number(sorted[sorted.length - 2]?.amount ?? 0);
    const curr = typeof sorted[sorted.length - 1]?.amount === 'number' ? sorted[sorted.length - 1].amount : Number(sorted[sorted.length - 1]?.amount ?? 0);
    return asDescriptor(curr, prev);
  };



  if (isLoading) {
    return (
      <Card className="w-full p-4 rounded-md">
                <div className="flex justify-between w-full items-center">
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                    {chartType === "line" && <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>}
                </div>
                <div className={`flex items-center gap-2 mt-2 ${chartType === "line" ? "" : "hidden"}`}>
                    <div className="h-9 w-40 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="mt-4">
                    {chartType === "line" &&
          <div className="h-64 w-full bg-gray-200 rounded animate-pulse"></div>
          }
                    {chartType === "pie" &&
          <div className="h-64 w-full flex items-center justify-center">
                            <div className="h-48 w-48 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
          }
                </div>
            </Card>);

  }

  return (
    <Card className="w-full p-4 rounded-md">
            <div className="flex justify-between w-full items-center">
                <span className="font-bold">{title}</span>
                {chartType === "line" && <span className="font-semibold text-blue-500 text-sm hover:underline cursor-pointer">View All</span>}
            </div>
            <div className={`flex items-center gap-2 ${chartType === "line" ? "" : "hidden"}`}>
                <span className="font-bold text-3xl">{headerOverride !== undefined ? String(headerOverride) : `${currencyPrefix}${totalAmount(data)}`}</span>
                {showHeaderDelta && (() => {const d = deltaDescriptor(data);return <span className={`font-semibold text-sm ${d.className}`}>{d.text}</span>;})()}
            </div>
            <div>
                {chartType === "line" && <LineChart data={normalizedData} index={index} categories={categories} />}
                {chartType === "pie" && <PieChart data={data} color={color} />}
            </div>
        </Card>);

};