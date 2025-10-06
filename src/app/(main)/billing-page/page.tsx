"use client"

import { ChartCard } from "@/app/components/chart-card";
import CollectionCard from "@/app/components/collection";
import TableBilling from "@/app/components/table-billing";
import TotalPaidCard from "@/app/components/total-paid-card";

export default function BillingPage() {
    return (
        <div className="flex flex-col gap-5">
            <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <ChartCard
                    title="Total Paid"
                    amount="RM900.00"
                    chartType="line"
                    data={[
                        { date: "2022-09-01", value: 380 },
                        { date: "2022-09-06", value: 400 },
                        { date: "2022-09-12", value: 470 },
                        { date: "2022-09-18", value: 390 },
                        { date: "2022-09-24", value: 350 },
                        { date: "2022-09-30", value: 500 },
                    ]}
                    index="date"
                    categories={["value"]}
                />
                <CollectionCard title="Top 5 Performing Collections" />
                <div className="flex flex-col gap-5">
                    <TotalPaidCard />
                    <TotalPaidCard />
                </div>
            </div>
            <div>
                <span>Collections</span>
                <div>
                    <TableBilling />
                </div>
            </div>
        </div>
    );
}