"use client";

import { FC } from "react";
import { useWilayahStore, Wilayah } from "./store/wilayah-store";
import { wilayah } from "./store/wilayah-store";
import MapIllustration from "@/assets/icons/data-wilayah/map-illustration";
import { Provinsi } from "./screens/provinsi";
import { Kabupaten } from "./screens/kabupaten";
import { Kecamatan } from "./screens/kecamatan";
import { Kelurahan } from "./screens/kelurahan";

interface RegionButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Page: FC = () => {
  const { selectedWilayah, setSelectedWilayah } = useWilayahStore();

  if (selectedWilayah === "Provinsi") return <Provinsi />;
  if (selectedWilayah === "Kabupaten/Kota") return <Kabupaten />;
  if (selectedWilayah === "Kecamatan") return <Kecamatan />;
  if (selectedWilayah === "Desa/Kelurahan") return <Kelurahan />;

  return (
    <div className="-mt-4 flex flex-col items-center gap-4 px-4 md:gap-4 md:px-6">
      <MapIllustration />

      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Data Wilayah
        </h1>
        <p className="text-balance text-base md:text-lg">
          Admin dapat melakukan penambahan data baik tingkat Provinsi,
          Kabupaten/Kota, Kecamatan, dan Desa/Kelurahan. Kamu dapat melihat Kode
          Wilayah di Indonesia dengan klik{" "}
          <a href="#" className="text-red-500 underline hover:text-red-600">
            disini
          </a>
          .
        </p>
      </div>

      <div className="mt-4 w-full max-w-4xl rounded-2xl border border-primary p-6 md:p-8">
        <p className="mb-6 text-center text-sm font-medium text-primary md:text-base">
          Pilih Data Wilayah:
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {wilayah.map((item: Wilayah, i: number) => {
            return (
              <RegionButton
                key={i}
                label={item}
                onClick={() => {
                  setSelectedWilayah(item);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;

const RegionButton: FC<RegionButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-[#f5f7fb] transition-colors hover:opacity-90`}
  >
    <span className="truncate">{label}</span>
  </button>
);
