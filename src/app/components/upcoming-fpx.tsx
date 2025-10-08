import { Card } from "@/app/components/ui/card";
import { QuestionMarkCircleIcon } from "@/app/components/ui/icons/bui_question-mark-circle";
import React from "react";

interface UpcomingFPXProps {
  data: {date: string;value: number;}[];
  lastSettlementDate: string | null;
  isLoading?: boolean;
}

export default function UpcomingFPX({ data, lastSettlementDate, isLoading = false }: UpcomingFPXProps) {
  const formatDate = (ymd: string) => {

    if (!ymd) return "-";
    const [y, m, d] = ymd.split("-").map(Number);
    const date = new Date(y, (m || 1) - 1, d || 1);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };
  const formatAmount = (n: number) => {
    const val = typeof n === "number" ? n : Number(n || 0);
    return val.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  const parseYmdToMs = (ymd?: string): number => {
    if (!ymd) return NaN;
    const [y, m, d] = ymd.split("-").map(Number);
    const date = new Date(y, (m || 1) - 1, d || 1);
    return date.getTime();
  };
  const nextPayout = Array.isArray(data) && data.length > 0 ? data[0] : null;
  const isUpcoming = (() => {
    const firstMs = parseYmdToMs(nextPayout?.date);
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    return !isNaN(firstMs) && firstMs >= startOfToday.getTime();
  })();
  const headerAmount = isUpcoming ? nextPayout?.value ?? 0 : 0;
  const subtitleDate = isUpcoming ? nextPayout?.date ?? null : lastSettlementDate;

  if (isLoading) {
    return (
      <Card className="w-full flex flex-col p-4 rounded-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex flex-col gap-2 pb-4 mt-4">
                    <div className="h-9 w-40 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div
          className="w-full border-t border-transparent pb-4"
          style={{
            borderImage: "repeating-linear-gradient(to right, #d4d4d4 0, #d4d4d4 10px, transparent 10px, transparent 20px) 1"
          }} />

                <div>
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex flex-col gap-2 pt-2">
                        {[1, 2, 3].map((index) =>
            <div key={index} className="flex items-center justify-between">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                            </div>
            )}
                    </div>
                </div>
            </Card>);

  }

  return (
    <Card className="w-full flex flex-col p-4 rounded-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-bold">Upcoming FPX Payout</span>
                    <QuestionMarkCircleIcon color={`oklch(62.3% 0.214 259.815)`} />
                </div>
                <span className="font-semibold text-blue-500 text-sm hover:underline cursor-pointer">See Details</span>
            </div>
            <div className="flex flex-col gap-2 pb-4">
                <span className="font-bold text-3xl">RM {formatAmount(headerAmount)}</span>
                <span className="text-sm text-neutral-500">{subtitleDate ? `Expected to reach your bank account on ${formatDate(subtitleDate)}` : "-"}</span>
            </div>
            <div
        className="w-full border-t border-transparent pb-4"
        style={{
          borderImage: "repeating-linear-gradient(to right, #d4d4d4 0, #d4d4d4 10px, transparent 10px, transparent 20px) 1"
        }} />

            <div>
                <span className="font-semibold text-neutral-500">COLLECTION DATE</span>
                <div className="flex flex-col gap-2 pt-2">
                    {data && data.length > 0 ?
          data.map((item, index) =>
          <div key={index} className="flex items-center justify-between">
                                <span>{formatDate(item.date)}</span>
                                <span className="font-semibold">RM {formatAmount(item.value)}</span>
                            </div>
          ) :

          <span className="text-sm text-neutral-500 italic">No upcoming FPX payouts</span>
          }
                </div>
            </div>
        </Card>);

}