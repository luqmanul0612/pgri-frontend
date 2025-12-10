/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useMemo } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

interface Props {
  key: string;
  data: {
    label: string;
    value: number;
  }[];
  colors: string[];
}

ChartJS.register(
  ArcElement,
  Tooltip,
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
);

const DashboardPieChart: FC<Props> = ({ data, colors, key }) => {
  const chartOptions: ChartOptions<"doughnut"> = useMemo(
    () => ({
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        datalabels: {
          color: "#fff",
          font: {
            weight: "normal",
            size: 12,
          },
          formatter: (value: number) => value,
          align: "center",
          anchor: "center",
        },
      },
    }),
    [],
  );

  const chartData: ChartData<"doughnut"> = useMemo(() => {
    return {
      labels: data.map((item) => item.label),
      datasets: [
        {
          data: data.map((item) => item.value),
          backgroundColor: colors,
          spacing: 0,
          borderWidth: 5,
          borderRadius: 10,
          borderColor: "#fff",
        },
      ],
    };
  }, [data]);

  return <Doughnut key={key} data={chartData} options={chartOptions} />;
};

export default DashboardPieChart;
