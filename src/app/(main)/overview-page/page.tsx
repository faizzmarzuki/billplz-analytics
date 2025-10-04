"use client"

import { ChartCard } from "@/app/components/chart-card";
import CollectionCard from "@/app/components/collection";

export default function OverviewPage() {
    return (
        <div className="w-full">
            <span className="text-2xl font-bold">Overview Dashboard</span>
            <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-screen">
                <ChartCard title="Total Collections" amount="RM 1,200.00" chartType="line" data={[{ date: "2022-01-01", value: 100 }, { date: "2022-01-02", value: 200 }, { date: "2022-01-03", value: 250 }, { date: "2022-01-04", value: 220 }, { date: "2022-01-05", value: 250 }]} index="date" categories={["value"]} />
                <ChartCard title="Total Collections" amount="RM 1,200.00" chartType="pie" data={[{ date: "2022-01-01", value: 100 }, { date: "2022-01-02", value: 200 }, { date: "2022-01-03", value: 300 }]} index="date" categories={["value"]} />
                <CollectionCard title="Total Collections" />
            </div>
        </div>
    );
}