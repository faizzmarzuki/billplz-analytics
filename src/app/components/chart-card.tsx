import { Card } from "@/app/components/ui/card";
import { LineChart } from "@/app/components/ui/charts/line-chart";
import PieChart from "@/app/components/ui/charts/pie-chart";

interface ChartCardProps {
    title: string;
    chartType: "line" | "pie";
    data: any;
    index: string;
    categories: string[];
    color?: any;
}

export const ChartCard = ({ title, chartType, data, index, categories, color }: ChartCardProps) => {

    const countDifference = (data: any[]) => {
        //calculate the difference of current date value compare to previous date value and return is it increase or decrease
        if (!data || data.length < 2) return "No data";

        const prev = data[data.length - 2].value;
        const current = data[data.length - 1].value;
        const diff = current - prev;
        const percentage = (diff / prev) * 100;

        if (diff > 0) return <span className="text-green-500">↑ {percentage.toFixed(2)}%</span>;
        if (diff < 0) return <span className="text-red-500">↓ {percentage.toFixed(2)}%</span>;
        return "No change";
    }

    const totalAmount = (data: any[]) => {
        if (!data || data.length === 0) return "No data";
        return data.reduce((acc, curr) => acc + curr.value, 0).toFixed(2);
    }

    return (
        <Card className="w-full p-4 rounded-md">
            <div className="flex justify-between w-full items-center">
                <span className="font-bold">{title}</span>
                {chartType === "line" && <span className="font-semibold text-blue-500 text-sm hover:underline cursor-pointer">View All</span>}
            </div>
            <div className={`flex items-center gap-2 ${chartType === "line" ? "" : "hidden"}`}>
                <span className="font-bold text-3xl">{totalAmount(data)}</span>
                <span className="font-semibold text-blue-500 text-sm">{countDifference(data)}</span>
            </div>
            <div>
                {chartType === "line" && <LineChart data={data} index={index} categories={categories} />}
                {chartType === "pie" && <PieChart data={data} color={color} />}
            </div>
        </Card>
    )
}