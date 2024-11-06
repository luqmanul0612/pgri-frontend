import { SearchInput } from "@/app/components/SearchInput";
import React from "react";
import FilterSVG from "../../../../public/icon/Filter";
import CardListKarya from "./CardListKarya";

const ListKaryaGuru = () => {
  return (
    <div>
      <div className="flex justify-between p-5">
        <div className="flex items-center space-x-3 text-[16px] font-semibold text-primary">
          38 Provinsi di Indonesia
        </div>
        <div className="flex gap-4">
          <button className="flex flex-row items-center justify-center gap-1 rounded-lg border border-primary px-3 py-2 text-sm text-primary">
            Filter <FilterSVG />
          </button>
          <SearchInput className="border border-primary" />
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-4 ">
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
        <CardListKarya />
      </div>
    </div>
  );
};

export default ListKaryaGuru;
