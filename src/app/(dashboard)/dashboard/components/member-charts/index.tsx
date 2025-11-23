import Button from "@/components/customs/button";
import Select from "@/components/customs/select";
import { cn } from "@/lib/utils";
import { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { plugin } from "postcss";

interface Props {
  className?: string;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const colors = [
  "#4d5390",
  "#909d3b",
  "#cc3333",
  "#669933",
  "#cc66cc",
  "#99ccff",
  "#c0c0c0",
  "#99cc33",
  "#cccc33",
  "#cc9900",
  "#993399",
  "#cccc66",
  "#6666ff",
  "#ff6633",
  "#66ccff",
  "#ffcc99",
  "#ff9966",
  "#ff9933",
  "#cc66ff",
  "#ff9933",
  "#333333",
  "#996633",
  "#66cc99",
  "#ff9999",
  "#cc3366",
  "#999999",
  "#cc6633",
  "#ffcc33",
  "#cc9999",
  "#669933",
  "#336699",
  "#000000",
  "#6699cc",
  "#993333",
  "#ff3366",
  "#ff6699",
  "#996600",
  "#663300",
];

export const options: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        title: (items) => {
          const item = items[0];
          const index = item.dataIndex + 1;
          return provinces[index - 1];
        },
        label: function (context) {
          const value = context.raw;
          return value as string;
        },
      },
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
    },
    y: {
      grid: { display: false },
      border: { display: false },
      ticks: {
        display: false,
      },
    },
  },
};

const provinces = [
  "Nanggroe Aceh Darussalam",
  "Sumatera Utara",
  "Sumatera Selatan",
  "Sumatera Barat",
  "Bengkulu",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Lampung",
  "Bangka Belitung",
  "Kalimantan Barat",
  "Kalimantan Timur",
  "Kalimantan Selatan",
  "Kalimantan Tengah",
  "Kalimantan Utara",
  "Banten",
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "Daerah Istimewa Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Gorontalo",
  "Sulawesi Barat",
  "Sulawesi Tengah",
  "Sulawesi Utara",
  "Sulawesi Tenggara",
  "Sulawesi Selatan",
  "Maluku",
  "Maluku Utara",
  "Papua Barat Daya",
  "Papua Barat",
  "Papua Tengah",
  "Papua",
  "Papua Pegunungan",
  "Papua Selatan",
];

const labels = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
];

export const data: ChartData<"bar", number[], string> = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [
        421, 87, 993, 245, 610, 302, 777, 18, 954, 123, 680, 512, 901, 44, 799,
        265, 37, 532, 710, 864, 299, 140, 975, 63, 508, 284, 691, 820, 356, 447,
        909, 228, 764, 551, 330, 1000, 72, 415,
      ],
      backgroundColor: colors,
      borderWidth: 0,
      maxBarThickness: 15,
    },
  ],
};

const MemberCharts: FC<Props> = (props) => {
  const { className } = props;
  return (
    <div
      className={cn(
        "flex flex-col rounded-[16px] border border-primary-100 bg-white p-[26px]",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <p className="text-[16px] font-semibold text-slate-800">
            Anggota PGRI
          </p>
          <p className="text-[12px] font-normal text-slate-800">
            Data Anggota PGRI : Januari - Desember 2025
          </p>
          <p className="mt-2 text-[18px] font-semibold text-primary-500">
            6.000.000 Anggota
          </p>
        </div>
        <div className="flex gap-4">
          <Select placeholder="Seluruh Anggota" />
          <Select placeholder="Pilih Provinsi" />
        </div>
      </div>
      <div className="mt-4 h-[100px] w-full">
        <Bar options={options} data={data} />
      </div>
      <div className="mt-4 flex">
        <Button>Lihat Detail</Button>
      </div>
    </div>
  );
};

export default MemberCharts;
