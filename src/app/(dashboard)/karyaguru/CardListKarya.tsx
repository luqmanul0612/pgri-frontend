/* eslint-disable @next/next/no-img-element */
import useModalUnderDevelopment from "@/store/use-modal-underdevelopment";
import Link from "next/link";
import React from "react";

const CardListKarya = () => {
  return (
    <Link
      passHref
      href={"/karyaguru/id"}
      onClick={(e) => {
        e.preventDefault();
        useModalUnderDevelopment.getState().setOpenModalUnderDevelopment(true);
      }}
      className="mb-0 flex w-[calc(33.333%-16px)] items-center justify-between rounded-xl border border-custom-aqua bg-white p-3"
    >
      <div className="flex">
        <img src="/icon/provinsi/jateng.svg" alt="provinsi" />
        <div className="ml-2">
          <div className="text-sm font-bold uppercase text-[#000]">
            jawa tengah
          </div>
          <div className="text-xs text-[#919191]">Kode Provinsi #33</div>
        </div>
      </div>
      <div className="text-xs font-semibold text-primary">300.000 Karya</div>
    </Link>
  );
};

export default CardListKarya;
