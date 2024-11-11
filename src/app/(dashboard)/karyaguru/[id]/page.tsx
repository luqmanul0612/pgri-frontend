"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { SearchInput } from "@/app/components/SearchInput";
import { FilterByKota } from "../FilterKota";
import CardKaryaAnggota from "../CardKaryaAnggota";

interface pageProps {
    params: {
      id: string;
    };
  }

const KaryaGuruDetail: FC<pageProps> = ({ params: { id } }) => {
  const router = useRouter();
  return (
    <div>
        {/* header back */}
        <div className="mb-4 flex items-center gap-2 font-bold">
        <button className="cursor-pointer" onClick={() => router.back()}>
          <FaArrowLeft />
        </button>
        <span>Karya Anggota</span>
      </div>

<div className="flex justify-between items-center">
  <div className="text-primary font-bold">Provinsi Jawa Tengah</div>
  <div className="flex gap-4 items-center">
    <div>
      <FilterByKota/>
    </div>
    <div>
    <SearchInput className="border border-primary" />
    </div>
  </div>
</div>

{/* LIST */}

<div className="flex w-full flex-wrap gap-6 mt-5">
  <CardKaryaAnggota/>
  <CardKaryaAnggota/>
  <CardKaryaAnggota/>
  <CardKaryaAnggota/>
  <CardKaryaAnggota/>
  <CardKaryaAnggota/>
  <CardKaryaAnggota/>
  <CardKaryaAnggota/>
  <CardKaryaAnggota/>
  <CardKaryaAnggota/>
  <CardKaryaAnggota/>

</div>

    </div>
  )
}

export default KaryaGuruDetail