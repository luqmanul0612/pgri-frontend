import { FC } from "react";
import Image from "next/image";
import ilustrasi from "../../../../../public/assets/login-slider-illustration.webp";

interface LeftSectionProps {}

export const LeftSection: FC<LeftSectionProps> = () => {
  return (
    <section className="relative h-[76vh] max-h-[548px] min-h-[456px] w-[458px] overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white">
      <BackgroundCircles />
      <div className="absolute flex h-full w-full flex-col justify-end px-16 pb-6">
        <Image alt="Ilustrasi Guru" src={ilustrasi} />
        <Content />
      </div>
    </section>
  );
};

const BackgroundCircles: FC = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0">
      <div className="absolute left-[244px] top-[-213px] h-[339px] w-[381px] rounded-full bg-[#17a2b8]/20" />
      <div className="absolute left-[-37px] top-[-198px] h-[339px] w-[381px] rounded-full bg-[#17a2b8]/20" />
    </div>
  </div>
);

const Content: FC = () => (
  <div className="flex flex-col items-center gap-4 p-2.5">
    <h2 className="text-center text-base font-bold text-[#17191c]">
      Verifikasi
    </h2>
    <p className="text-center text-sm font-normal text-[#17191c]">
      Untuk Verifikasi Keanggotaan dan Pencetakan KTA Harap Menghubungi
      Admin/Petugas PGRI Tempat Bertugas (Kabupaten/Kota/Cabang)
    </p>
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-6 rounded-lg bg-[#007bff]" />
      <div className="h-1.5 w-1.5 rounded-lg bg-[#a7a7a7]" />
      <div className="h-1.5 w-1.5 rounded-lg bg-[#a7a7a7]" />
    </div>
  </div>
);
