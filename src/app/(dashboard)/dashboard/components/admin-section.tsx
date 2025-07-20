import Card from "@/app/components/Card";
import DashboardGrowthCard from "@/app/components/molecules/dashboard-growth-card";
import DashboardPieChart from "@/app/components/molecules/dashboard-pie-charts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Filter } from "../../components/Filter";
import { IoIosArrowDown } from "react-icons/io";

const registerGrowthData = [
  { value: 100 },
  { value: 200 },
  { value: 150 },
  { value: 250 },
  { value: 180 },
  { value: 300 },
  { value: 230 },
];

const asnGrowthData = [
  { value: 100 },
  { value: 200 },
  { value: 150 },
  { value: 250 },
  { value: 180 },
  { value: 300 },
  { value: 230 },
];

const nonAsnGrowthData = [
  { value: 100 },
  { value: 200 },
  { value: 150 },
  { value: 250 },
  { value: 180 },
  { value: 300 },
  { value: 230 },
  { value: 50 },
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

const AdminSection = () => {
  return (
    <div>
      <div className="mt-10">
        <Filter />
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
      <div className="mt-5 flex gap-5">
        {/* statistik */}
        <Card className="w-[30%]">
          <div className="flex justify-between border-b border-primary-light px-6 py-4">
            <div className="flex">
              <Image
                src={"/icon/chart-bar.png"}
                alt="chart-bar"
                height={24}
                width={24}
                // fill
              />
              <h4 className="ml-1 text-[16px] font-bold text-primary">
                Statistik
              </h4>
            </div>
            <div className="text-primary">500000</div>
          </div>
          <div className="px-6 py-4">
            <div className="flex justify-between">
              <h4>Pengunjung hari ini</h4>
              <h4>: 500</h4>
            </div>
            <div className="flex justify-between">
              <h4>Total Pengunjung</h4>
              <h4>: 500</h4>
            </div>
            <div className="flex justify-between">
              <h4>Pengunjung Online</h4>
              <h4>: 500</h4>
            </div>
            <div className="flex justify-between">
              <h4>Total Hits</h4>
              <h4>: 500</h4>
            </div>
            <div className="flex justify-between">
              <h4>Hits Hari ini</h4>
              <h4>: 500</h4>
            </div>
          </div>
        </Card>
        <div className="flex w-[70%] gap-5">
          <DashboardGrowthCard
            data={registerGrowthData}
            title="Total Pendaftar"
          />
          <DashboardGrowthCard
            data={asnGrowthData}
            title="Total Guru ASN (PNS & PPPK)"
          />
          <DashboardGrowthCard
            data={nonAsnGrowthData}
            title="Total Guru Non ASN"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSection;
