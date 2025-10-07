import { Card } from "@/app/components/ui/card";
import { LineChart } from "@/app/components/ui/charts/line-chart";
import PieChart from "@/app/components/ui/charts/pie-chart";

interface ChartCardProps {
    title: string;
    amount: string;
    chartType: "line" | "pie" | "bar";
    data: any;
    index: string;
    categories: string[];
}

export const ChartCard = ({ title, amount, chartType, data, index, categories }: ChartCardProps) => {
    return (
        <Card className="w-full p-4 rounded-md">
            <div className="flex justify-between w-full items-center"><span>{title}</span> <span>View All</span></div>
            <div>{amount}</div>
            <div>
                {chartType === "line" && <LineChart data={data} index={index} categories={categories} />}
                {chartType === "pie" && <PieChart />}
            </div>
        </Card>
    )
}