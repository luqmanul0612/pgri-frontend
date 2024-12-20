import React from "react";
import { FormField } from "@/app/components/FormField";
import { Input } from "@/components/ui/input";
import { MdAdd } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";

interface SearchPelatihanProps {
  className?: string;
}

const SearchPelatihan: React.FC<SearchPelatihanProps> = ({ className = '' }) => {
  return (
    <>
      <div className={`flex flex-row items-center justify-between mb-6 ${className}`}>
        <div className={'flex flex-row items-center gap-6'}>
          <h2 className={'text-primary font-semibold'}>Pelatihan Anggota</h2>
          <button className={'py-3.5 px-6 text-primary border border-primary rounded-xl text-sm flex flex-row items-center gap-3.5 hover:bg-primary hover:text-white transition-all'}>
            Tambah Pelatihan
            <MdAdd />
          </button>
        </div>
        <div className={'relative'}>
          <Input
            type={'text'}
            className={'w-[300px] border rounded-[10px] border-primary border-opacity-20 py-3.5 text-sm pr-9 h-full'}
            placeholder={'Cari Pelatihan'}
          />

          <FiSearch className={'absolute right-3 top-1/2 -translate-y-1/2 text-primary'} />
        </div>
      </div>
    </>
  )
}

export default SearchPelatihan;
