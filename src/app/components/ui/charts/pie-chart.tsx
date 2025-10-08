import { Chart } from "react-google-charts";

interface PieChartProps {
  data: any;
  color: string[];
}

export default function PieChart({ data, color }: PieChartProps) {

  const options = {
    pieHole: 0.4,
    is3D: true,



    pieStartAngle: 100,
    sliceVisibilityThreshold: 0.02,
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 14
      }
    },
    colors: color
  };
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"} />);


}