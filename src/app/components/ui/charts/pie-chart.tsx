import { Chart } from "react-google-charts";

interface PieChartProps {
    data: any;
    color: string[];
}

export default function PieChart({ data, color }: PieChartProps) {

    const options = {
        pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
        is3D: true, // Enables 3D view
        // slices: {
        //   1: { offset: 0.2 }, // Explodes the second slice
        // },
        pieStartAngle: 100, // Rotates the chart
        sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: "#233238",
                fontSize: 14,
            },
        },
        colors: color,
    };
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    );
}