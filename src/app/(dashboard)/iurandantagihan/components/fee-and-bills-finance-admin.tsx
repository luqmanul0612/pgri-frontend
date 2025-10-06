import Button from "@/components/customs/button";
import FeeIcon from "../assets/fee-icon.svg";
import { useState } from "react";
import TextField from "@/components/customs/textfield";
import { DataTable } from "@/components/table/DataTable";
import { feesDummyData } from "../table/fees-data";
import { FeesColumns } from "../table/fees-columns";
import SearchIcon from "../assets/search.svg";
import FilterIcon from "../assets/filter.svg";
import DownloadIcon from "../assets/document-download.svg";
import InfoIcon from "../assets/info-circle.svg";
import ArrowRightIcon from "../assets/arrow-right.svg";
import { BillsColumns } from "../table/bills-column";
import { useRouter } from "next/navigation";

const Fees = [
  {
    key: 1,
    percentage: "10%",
    label: "Total Iuran Pusat",
    amount: "Rp25.000.000",
  },
  {
    key: 2,
    percentage: "20%",
    label: "Total Iuran Provinsi",
    amount: "Rp55.000.000",
  },
  {
    key: 3,
    percentage: "30%",
    label: "Total Iuran Kabupaten",
    amount: "Rp75.000.000",
  },
  {
    key: 4,
    percentage: "40%",
    label: "Total Iuran Kecamatan",
    amount: "Rp100.000.000",
  },
];

const FeeAndBillsFinanceAdmin = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<"fees" | "bills">("fees");

  const onClickFeeDetail = () => {
    router.push("/iurandantagihan/fee-detail");
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Button
          variant={selectedTab === "fees" ? "primary" : "secondary"}
          onClick={() => setSelectedTab("fees")}
        >
          Iuran
        </Button>
        <Button
          variant={selectedTab === "bills" ? "primary" : "secondary"}
          onClick={() => setSelectedTab("bills")}
        >
          Tagihan
        </Button>
      </div>
      {selectedTab === "fees" && (
        <>
          <div className="flex flex-col gap-5 rounded-[16px] border border-primary-200 bg-white p-3">
            <div className="flex justify-between border-b pb-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <p className="text-[16px] font-semibold text-black">
                    Iuran Anggota PGRI
                  </p>
                  <InfoIcon className="text-red-500" />
                </div>
                <p className="text-[12px] font-normal text-black">
                  Total keseluruhan Iuran Terkumpul
                </p>
                <p className="mt-4 text-[24px] font-bold text-primary-500">
                  Rp250.000.000
                </p>
              </div>
              <div className="flex flex-col items-end justify-center gap-4">
                <p className="text-[14px] font-bold text-black">
                  Diperbaharui setiap jam{" "}
                  <span className="text-red-500">23:59:00</span> WIB
                </p>
                <Button
                  variant="text"
                  endIcon={<ArrowRightIcon />}
                  onClick={onClickFeeDetail}
                >
                  Lihat Detail Iuran
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 rounded-[16px] bg-primary-500 p-4">
              {Fees.map((fee) => (
                <div
                  key={fee.key}
                  className="flex justify-between rounded-[16px] bg-white p-[16px]"
                >
                  <div className="flex flex-col">
                    <p className="text-[16px] font-bold text-primary-500">
                      {fee.amount}
                    </p>
                    <p className="mt-[10px] text-[16px] font-normal text-primary-500">
                      {fee.label}
                    </p>
                    <p className="text-[12px] font-normal text-primary-500">
                      {fee.percentage}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <FeeIcon className="text-primary-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[16px] font-semibold text-primary-500">
            Iuran Berjalan Saat Ini
          </p>
          <div className="flex flex-col gap-5 rounded-[16px] border border-primary-200 bg-white p-3">
            <div className="flex justify-between">
              <div className="flex gap-[16px]">
                <Button variant="secondary">Bayar Iuran Anggota</Button>
                <Button variant="secondary" endIcon={<DownloadIcon />}>
                  Unduh Data
                </Button>
              </div>
              <div className="flex gap-[16px]">
                <Button variant="secondary" endIcon={<FilterIcon />}>
                  Filter
                </Button>
                <TextField
                  placeholder="Ketik Nama, KTA"
                  endIcon={<SearchIcon />}
                />
              </div>
            </div>
            <DataTable
              data={feesDummyData}
              columns={FeesColumns}
              pageSize={10}
              paginationLabel="Transaksi"
            />
          </div>
        </>
      )}
      {selectedTab === "bills" && (
        <>
          <div className="flex flex-col gap-5 rounded-[16px] border border-primary-200 bg-white p-3">
            <div className="flex justify-between border-b pb-4">
              <div className="flex flex-col">
                <p className="text-[16px] font-semibold text-black">
                  Tagihan Anggota PGRI
                </p>
                <p className="text-[12px] font-normal text-black">
                  Total keseluruhan Tagihan Terkumpul
                </p>
                <p className="mt-4 text-[24px] font-bold text-primary-500">
                  Rp250.000.000
                </p>
              </div>
              <div className="flex flex-col items-end justify-center gap-4">
                <p className="text-[14px] font-bold text-black">
                  Diperbaharui setiap jam{" "}
                  <span className="text-red-500">23:59:00</span> WIB
                </p>
                <Button variant="text" endIcon={<ArrowRightIcon />}>
                  Lihat Detail
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 rounded-[16px] border border-primary-200 bg-white p-3">
            <div className="flex justify-between">
              <div className="flex gap-[16px]">
                <Button variant="secondary">Tambah Tagihan</Button>
                <Button variant="secondary">Bayar Tagihan Anggota</Button>
              </div>
              <div className="flex gap-[16px]">
                <Button variant="secondary" endIcon={<FilterIcon />}>
                  Filter
                </Button>
                <TextField
                  placeholder="Ketik Nama, KTA"
                  endIcon={<SearchIcon />}
                />
              </div>
            </div>
            <DataTable
              data={feesDummyData}
              columns={BillsColumns}
              pageSize={10}
              paginationLabel="Transaksi"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FeeAndBillsFinanceAdmin;
