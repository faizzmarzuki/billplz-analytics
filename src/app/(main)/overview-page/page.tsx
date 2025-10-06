"use client"

import { ChartCard } from "@/app/components/chart-card";
import CollectionCard from "@/app/components/collection";
import UpcomingFPX from "@/app/components/upcoming-fpx";

export default function OverviewPage() {
    return (
        <div className="flex flex-col gap-5">
            <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Total Collections */}
                <ChartCard title="Total Collections" amount="RM 1,200.00" chartType="line" data={[{ date: "2022-01-01", value: 100 }, { date: "2022-01-02", value: 200 }, { date: "2022-01-03", value: 250 }, { date: "2022-01-04", value: 220 }, { date: "2022-01-05", value: 250 }]} index="date" categories={["value"]} />
                {/* Total Transactions */}
                <ChartCard title="Total Transactions" amount="RM 1,200.00" chartType="line" data={[{ date: "2022-01-01", value: 100 }, { date: "2022-01-02", value: 200 }, { date: "2022-01-03", value: 250 }, { date: "2022-01-04", value: 220 }, { date: "2022-01-05", value: 250 }]} index="date" categories={["value"]} />
                {/* Upcoming FPX Payout */}
                <UpcomingFPX />
                {/* Total Payouts */}
                <ChartCard title="Total Payouts" amount="RM 1,200.00" chartType="line" data={[{ date: "2022-01-01", value: 100 }, { date: "2022-01-02", value: 200 }, { date: "2022-01-03", value: 250 }, { date: "2022-01-04", value: 220 }, { date: "2022-01-05", value: 250 }]} index="date" categories={["value"]} />
                {/* Collection */}
                <CollectionCard title="Total Collections" />
                {/* Active vs Inactive Collections */}
                <ChartCard title="Active vs Inactive Collections" amount="RM 1,200.00" chartType="pie" data={[{ date: "2022-01-01", value: 100 }, { date: "2022-01-02", value: 200 }, { date: "2022-01-03", value: 300 }]} index="date" categories={["value"]} />
                {/* Collections by Payment Method */}
                <ChartCard title="Collections by Payment Method" amount="RM 1,200.00" chartType="pie" data={[{ date: "2022-01-01", value: 100 }, { date: "2022-01-02", value: 200 }, { date: "2022-01-03", value: 300 }]} index="date" categories={["value"]} />
            </div>
        </div>
    );
}