import Card from "@/app/components/Card";
import DashboardGrowthCard from "@/app/components/molecules/dashboard-growth-card";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import CardDashboard from "@/app/(dashboard)/dashboard/components/card-dashboard";
import DashboardBannerSlider from "@/app/(dashboard)/dashboard/components/dashboard-banner-slider";
import useDashboardMemberAdmin from "../hooks/use-dashboard-member-admin";
import MemberCharts from "../components/member-charts";
import DashboardPieChart from "../components/dashboard-pie-chart";
import Button from "@/components/customs/button";

const UserAdminSection = () => {
  const {
    asnGrowthData,
    nonAsnGrowthData,
    registerGrowthData,
    trainingData,
    genderData,
    trainingColors,
    genderColors,
    banners,
  } = useDashboardMemberAdmin();

  return (
    <div>
      <div className="flex gap-6">
        <CardDashboard idx={0} value={0} />
        <CardDashboard idx={1} value={0} />
        <CardDashboard idx={2} value={0} />
        <CardDashboard idx={3} value={0} />
      </div>
      <DashboardBannerSlider banners={banners} className="mt-5" />
      <MemberCharts className="mt-5" />
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

          <div className="mt-4 flex justify-between gap-4">
            <div className="flex flex-col flex-1">
              <div>
                <h1 className="mb-4 text-2xl font-bold text-primary">
                  2.500 Pelatihan
                </h1>
                <div className="flex max-h-[100px] flex-col gap-2 overflow-y-auto">
                  {trainingData.map((item, idx) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div
                        className="h-[12px] min-h-[12px] w-[12px] min-w-[12px] rounded-[4px]"
                        style={{ backgroundColor: trainingColors[idx] }}
                      ></div>
                      <p className="text-[12px] font-normal">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="mt-4">Lihat Detail</Button>
            </div>
            <div className="h-[200px] w-[200px]">
              <DashboardPieChart
                key="training"
                data={trainingData}
                colors={trainingColors}
              />
            </div>
          </div>
        </Card>

        <Card className="w-full p-6">
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="text-[16px] font-semibold text-primaryBlack">
                Gender Anggota
              </h2>
              <h4 className="text-xs font-normal">
                Daerah, Kabupaten/Kota, Provinsi dan Pusat
              </h4>
            </div>
            <div className="flex justify-center text-primary">
              <span className="text-xs font-semibold">Pilih Provinsi</span>
              <IoIosArrowDown />
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="mb-4 text-2xl font-bold text-primary">
                  Rp. 1.500.000
                </h1>
                <div className="flex flex-col gap-2">
                  {genderData.map((item, idx) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div
                        className="h-[12px] min-h-[12px] w-[12px] min-w-[12px] rounded-[4px]"
                        style={{ backgroundColor: genderColors[idx] }}
                      ></div>
                      <p className="text-[12px] font-normal">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="mt-4">Lihat Detail</Button>
            </div>
            <div className="h-[200px] w-[200px]">
              <DashboardPieChart
                key="gender"
                data={genderData}
                colors={genderColors}
              />
            </div>
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

export default UserAdminSection;
