/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const CardListKarya = () => {
  return (
    <Link passHref href={"/karyaguru/id"} className="w-[calc(33.333%-16px)] rounded-xl border border-custom-aqua bg-white p-3 flex justify-between items-center mb-0">
      <div className="flex">
        <img src="/icon/provinsi/jateng.svg" alt="provinsi"/>
        <div className="ml-2">
            <div className="uppercase text-sm font-bold text-[#000]">jawa tengah</div>
            <div className="text-[#919191] text-xs">Kode Provinsi #33</div>
        </div>
      </div>
      <div className="text-xs font-semibold text-primary">
        300.000 Karya
      </div>
    </Link>
  );
};

export default CardListKarya;
