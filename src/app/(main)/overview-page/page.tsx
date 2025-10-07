"use client"

import { ChartCard } from "@/app/components/chart-card";
import CollectionCard from "@/app/components/collection";
import UpcomingFPX from "@/app/components/upcoming-fpx";

export default function OverviewPage() {
    return (
        <div className="flex flex-col gap-5">
            <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Total Collections */}
                <ChartCard title="Total Collections" chartType="line" data={[{ date: "2022-01-01", value: 100 }, { date: "2022-01-02", value: 200 }, { date: "2022-01-03", value: 250 }, { date: "2022-01-04", value: 220 }, { date: "2022-01-05", value: 200 }]} index="date" categories={["value"]} />
                {/* Total Transactions */}
                <ChartCard title="Total Transactions" chartType="line" data={[{ date: "2022-01-01", value: 100 }, { date: "2022-01-02", value: 200 }, { date: "2022-01-03", value: 250 }, { date: "2022-01-04", value: 220 }, { date: "2022-01-05", value: 250 }]} index="date" categories={["value"]} />
                {/* Upcoming FPX Payout */}
                <UpcomingFPX data={[{ date: "01 January 2022", value: 100 }, { date: "02 January 2022", value: 200 }, { date: "03 January 2022", value: 250 }, { date: "04 January 2022", value: 220 }, { date: "05 January 2022", value: 250 }]} />
                {/* Total Payouts */}
                <ChartCard title="Total Payouts" chartType="line" data={[{ date: "2022-01-01", value: 100 }, { date: "2022-01-02", value: 200 }, { date: "2022-01-03", value: 250 }, { date: "2022-01-04", value: 220 }, { date: "2022-01-05", value: 250 }]} index="date" categories={["value"]} />
                {/* Collection */}
                <CollectionCard title="Top 5 Performing Collections" />
                {/* Active vs Inactive Collections */}
                <ChartCard title="Active vs Inactive Collections" chartType="pie" data={[
                    ["Task", "Hours per Day"],
                    ["Active", 11],
                    ["Inactive", 2],
                ]} index="date" categories={["value"]} color={["#3784F4", "#E8E8E8"]} />
                {/* Collections by Payment Method */}
                <ChartCard title="Collections by Payment Method" chartType="pie" data={[
                    ["Task", "Hours per Day"],
                    ["Online", 11],
                    ["Cards", 2],
                    ["E-Wallet", 20],
                ]} index="date" categories={["value"]} color={["#3784F4", "#84B6FF", "#AECFFF"]} />
            </div>
        </div>
    );
}