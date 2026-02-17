"use client";

import React from "react";
import { FormField } from "@/app/components/FormField";
import { Input } from "@/components/ui/input";
import { MdAdd } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import useModalUnderDevelopment from "@/store/use-modal-underdevelopment";

interface SearchPelatihanProps {
  className?: string;
}

const SearchPelatihan: React.FC<SearchPelatihanProps> = ({
  className = "",
}) => {
  const router = useRouter();
  const handleAdd = () => {
    useModalUnderDevelopment.getState().setOpenModalUnderDevelopment(true);
    // router.push(`/pelatihan/add`);
  };
  return (
    <>
      <div
        className={`mb-6 flex flex-row items-center justify-between ${className}`}
      >
        <div className={"flex flex-row items-center gap-6"}>
          <h2 className={"font-semibold text-primary"}>Pelatihan Anggota</h2>
          <button
            onClick={handleAdd}
            className={
              "flex flex-row items-center gap-3.5 rounded-xl border border-primary px-6 py-3.5 text-sm text-primary transition-all hover:bg-primary hover:text-white"
            }
          >
            Tambah Pelatihan
            <MdAdd />
          </button>
        </div>
        <div className={"relative"}>
          <Input
            type={"text"}
            className={
              "h-full w-[300px] rounded-[10px] border border-primary border-opacity-20 py-3.5 pr-9 text-sm"
            }
            placeholder={"Cari Pelatihan"}
          />

          <FiSearch
            className={"absolute right-3 top-1/2 -translate-y-1/2 text-primary"}
          />
        </div>
      </div>
    </>
  );
};

export default SearchPelatihan;
