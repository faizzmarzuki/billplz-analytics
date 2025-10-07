import { Card } from "@/app/components/ui/card";

interface StatsCardProps {
    title: string;
    amount: number;
}

export default function StatsCard({ title, amount }: StatsCardProps) {
    return (
        <Card className="rounded-md">
            <div className="flex flex-col gap-2 p-4">
                <span className="text-sm font-medium">{title}</span>
                <span className={`text-2xl font-bold ${title === "Total Paid" ? "text-green-500" : ""}`}>RM {amount}</span>
            </div>
        </Card>
    );
}