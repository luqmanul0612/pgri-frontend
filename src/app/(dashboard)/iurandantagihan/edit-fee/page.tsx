"use client";
import React from "react";
import { useRouter } from "next/navigation";
import TextField from "@/components/customs/textfield";
import DocumentUploadIcon from "../assets/document-upload.svg";
import Button from "@/components/customs/button";

const EditFee = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col rounded-[16px] border border-slate-200 bg-white p-6">
        <p className="text-[16px] font-semibold text-black">
          Edit Nominal Iuran
        </p>
        <p className="text-[14px]">
          Nominal tetap iuran anggota saat ini{" "}
          <span className="font-bold text-primary-500">Rp8000</span>, telah
          disetujui PB Pusat dan Pimpinan PGRI Seluruh Indonesia.
        </p>
        <TextField label="Iuran Minimal" className="mt-4" placeholder="Rp0" />
        <TextField
          label="Tambahan Iuran Konfrensi Provinsi/Kabupaten Kota"
          className="mt-4"
          placeholder="Rp0"
        />
        <TextField label="Total" className="mt-4" placeholder="Rp0" />
        <p className="mt-4 text-[16px] font-semibold text-black">
          Upload Surat Keputusan Konfrensi Provinsi/Kabupaten Kota Tentang Iuran
          Keanggotaan (Format PDF)
        </p>
        <div className="mt-4 flex h-[200px] min-h-[200px] w-full gap-2 flex-col items-center justify-center rounded-[16px] border border-dashed border-slate-300 p-[16px]">
          <p className="text-[16px] font-semibold text-slate-400">
            Unggah Formulir Persetujuan
          </p>
          <p className="text-[14px] font-normal text-slate-400">
            Seret dan lepat atau telusuri untuk mengunggah
          </p>
          <DocumentUploadIcon />
        </div>
      </div>
      <div className="flex mt-6 justify-end">
        <Button variant="secondary" className="mr-4" onClick={() => router.back()}>
          Batal
        </Button>
        <Button>
          Simpan
        </Button>
      </div>
    </div>
  );
};

export default EditFee;
