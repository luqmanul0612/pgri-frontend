import CardDashboardFinance from "@/app/components/molecules/card-dashboard-finance";
import ArrowTopRight from "../assets/arrow-top-right.svg";
import { Card } from "@mui/material";
import Image from "next/image";
import DashboardPieChart from "@/app/components/molecules/dashboard-pie-charts";
import Button from "@/components/customs/button";
import { IoIosArrowDown } from "react-icons/io";
import { DataTable } from "@/components/table/DataTable";
import { TransactionColumns } from "../table/TransactionColumns";
import { transactionDummyData } from "../table/dummyTransaction";
import TextField from "@/components/customs/textfield";
import FilterIcon from "@/app/(dashboard)/dashboard/assets/filter.svg";
import PrintIcon from "@/app/(dashboard)/dashboard/assets/printer.svg";
import SearchIcon from "@/app/(dashboard)/dashboard/assets/search-normal.svg";

const cardData = [
  {
    label: "Data Anggota",
    value: "334.850",
    description: "per/1 Bulan",
    percentage: 0.12,
  },
  {
    label: "Total Uang Iuran",
    value: "Rp 14.500.000",
    description: "per/1 Bulan",
    percentage: 0.12,
  },
  {
    label: "Total Uang Pelatihan",
    value: "Rp 4.500.000",
    description: "per/1 Bulan",
    percentage: 0.12,
  },
  {
    label: "Total Uang Cetak KTA",
    value: "Rp 4.500.000",
    description: "per/1 Bulan",
    percentage: 0.12,
  },
];

const trainingData = [
  { name: "Training A", value: 250 },
  { name: "Training B", value: 850 },
  { name: "Training C", value: 250 },
  { name: "Training D", value: 50 },
  { name: "Training E", value: 150 },
];

const membershipData = [
  { name: "Training A", value: 250 },
  { name: "Training B", value: 850 },
  { name: "Training C", value: 250 },
  { name: "Training D", value: 50 },
  { name: "Training E", value: 150 },
];

const COLORS = ["#BF19B8", "#DC3545", "#007BFF", "#FFC107", "#0EC516"];

const FinanceAdminSection = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        {cardData.map((item, index) => (
          <CardDashboardFinance
            key={index}
            label={item.label}
            value={item.value}
            description={item.description}
            percentage={item.percentage}
          />
        ))}
      </div>

      <div className="mt-5 flex flex-row gap-4">
        <Card className="w-full p-6">
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="text-[16px] font-semibold text-primaryBlack">
                Pelatihan Anggota PGRI
              </h2>
              <h4 className="text-xs font-normal">
                Data pelatihan periode: Januari - Desember 2024
              </h4>
            </div>
            <div className="flex justify-center text-primary">
              <span className="text-xs font-semibold">Berbayar</span>
              <IoIosArrowDown />
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="mb-4 text-2xl font-bold text-primary">
                  2.500 Pelatihan
                </h1>
                <h4>Pelatihan Kabupaten/Kota</h4>
                <h4>Pelatihan Provinsi</h4>
                <h4>Pelatihan Nasional</h4>
              </div>

              <Button className="w-[124px] rounded-xl bg-primary">
                Lihat Detail
              </Button>
            </div>
            <DashboardPieChart data={trainingData} colors={COLORS} />
          </div>
        </Card>

        <Card className="w-full p-6">
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="text-[16px] font-semibold text-primaryBlack">
                Iuran Anggota PGRI
              </h2>
              <h4 className="text-xs font-normal">
                Iuran dari Daerah, Kabupaten/Kota, Provinsi dan Pusat
              </h4>
            </div>
            <div className="flex justify-center text-primary">
              <span className="text-xs font-semibold">Sudah Bayar</span>
              <IoIosArrowDown />
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="mb-4 text-2xl font-bold text-primary">
                  Rp. 1.500.000
                </h1>
                <h4>Pelatihan Kabupaten/Kota</h4>
                <h4>Pelatihan Provinsi</h4>
                <h4>Pelatihan Nasional</h4>
              </div>

              <Button className="w-[124px] rounded-xl bg-primary">
                Lihat Detail
              </Button>
            </div>
            <DashboardPieChart data={membershipData} colors={COLORS} />
          </div>
        </Card>
      </div>
      <p className="mt-5 text-[16px] font-semibold text-primary-500">
        Transaksi Terbaru
      </p>
      <div className="mt-5 flex flex-col rounded-[16px] border border-primary-50 bg-white">
        <div className="flex justify-between gap-4 p-4">
          <div className="flex gap-4">
            <Button
              className="!min-w-[150px] !justify-between"
              endIcon={<FilterIcon className="text-white" />}
            >
              Filter
            </Button>
            <Button
              variant="secondary"
              endIcon={<PrintIcon className="text-primary-500" />}
            >
              Cetak
            </Button>
          </div>
          <TextField
            placeholder="Pencarian"
            endIcon={<SearchIcon className="text-slate-400" />}
          />
        </div>
        <DataTable
          data={transactionDummyData}
          columns={TransactionColumns}
          pageSize={10}
          paginationLabel="Transaksi"
        />
      </div>
    </div>
  );
};

export default FinanceAdminSection;
