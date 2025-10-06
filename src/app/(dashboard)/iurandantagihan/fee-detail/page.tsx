"use client";
import React from "react";
import useAuth from "@/store/useAuth";
import PgriLogo from "../../../../../public/pgri-logo.svg";
import Button from "@/components/customs/button";
import DownloadIcon from "../assets/document-download.svg";
import ArrowRightIcon from "../assets/arrow-right.svg";
import { useRouter } from "next/navigation";

const dataFees = [
  {
    year: 2024,
    totalAmount: "Rp850.000.000",
  },
  {
    year: 2023,
    totalAmount: "Rp850.000.000",
  },
];

const FeesDetail = () => {
  const { auth } = useAuth();
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <h1 className="mb-6 text-[16px] font-semibold text-[#17191c]">
        Detail Iuran
      </h1>
      <div className="flex flex-col items-center rounded-[16px] border bg-primary-500 p-[16px]">
        <PgriLogo width={80} height={80} />
        <p className="mt-4 text-[16px] font-semibold text-white">
          Iuran Anggota PGRI
        </p>
        <p className="text-[12px] font-normal text-white">
          Total keseluruhan Iuran Terkumpul (Pusat) / tahun
        </p>
        <p className="mt-4 rounded-[8px] bg-white px-2 py-1 text-[14px] font-bold text-primary-500">
          Tahun 2025
        </p>
        <p className="mt-4 text-[24px] font-bold text-white">Rp250.000.000</p>
        <div className="mt-4 min-h-[2px] min-w-[500px] border-b border-white" />
        <div className="flex w-full justify-between rounded-[16px] bg-white p-[16px]">
          <div className="flex flex-col">
            <p className="text-[16px] font-semibold text-black">
              Nominal Iuran
            </p>
            <p className="text-[14px] font-normal text-black">
              Kesepakatan nominal iuran dari pusat
            </p>
            <p className="mt-4 text-[24px] font-bold text-primary-500">
              Rp100.000
            </p>
          </div>
          <div className="flex flex-col items-end">
            <Button endIcon={<DownloadIcon />} variant="secondary">
              Lembar Persetujuan Pimpinan Pusat 2025
            </Button>
            <Button className="mt-4" onClick={() => router.push("/iurandantagihan/edit-fee")}>Edit Nominal</Button>
          </div>
        </div>
      </div>
      <p className="mt-4 text-[16px] font-semibold text-primary-500">
        Riwayat Iuran Anggota
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {dataFees.map((fee) => (
          <div
            key={fee.year}
            className="flex items-center justify-between rounded-[16px] border border-slate-200 bg-white p-4"
          >
            <div className="flex flex-col">
              <p className="text-[14px] font-bold text-black">
                Total keseluruhan Iuran Terkumpul
              </p>
              <p className="text-[12px] font-normal text-black">
                Tahun {fee.year}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-[14px] font-bold text-primary-500">
                {fee.totalAmount}
              </p>
              <ArrowRightIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeesDetail;
