import { Card } from "@/app/components/ui/card";

interface StatsCardProps {
    title: string;
    amount: number;
    isLoading?: boolean;
}

export default function StatsCard({ title, amount, isLoading = false }: StatsCardProps) {
    if (isLoading) {
        return (
            <Card className="rounded-md">
                <div className="flex flex-col gap-2 p-4">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="rounded-md">
            <div className="flex flex-col gap-2 p-4">
                <span className="text-sm font-medium">{title}</span>
                <span className={`text-2xl font-bold ${title === "Total Paid" ? "text-green-500" : ""}`}>RM {amount}</span>
            </div>
        </Card>
    );
}