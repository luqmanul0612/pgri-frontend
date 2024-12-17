"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";
import { FaRegHand } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiPencilSimpleLine } from "react-icons/pi";
import TindakanModal from "./TindakanModal";

interface ActionOptionsProps {
  row: {
    original: {
      id: string | number;
      name: string;
    };
  };
}

const ActionOptions: React.FC<ActionOptionsProps> = ({ row }) => {
  const [isModalTindakanOpen, setIsModalTindakanOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <SlOptionsVertical size={12} className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="space-y-2 rounded-l-2xl rounded-r-none p-3"
      >
        <div className="flex items-center justify-center">
          <span className="mb-1 text-sm font-bold">Opsi</span>
        </div>
        <Link href={`/anggota/${row.original.id}`} passHref>
          <DropdownMenuItem className="flex cursor-pointer justify-between rounded-lg bg-green-500 px-3 py-3 text-xs text-white hover:!bg-green-400 hover:!text-white/90">
            <span>Lihat</span>
            <MdOutlineRemoveRedEye className="" size={18} />
          </DropdownMenuItem>
        </Link>
        <Link href={`/anggota/edit/${row.original.id}`} passHref>
          <DropdownMenuItem
            // onClick={() => {
            //   setIsUpdateModalOpen(true);
            // }}
            className="flex justify-between rounded-lg bg-blue-500 px-3 py-3 text-xs text-white hover:!bg-blue-400 hover:!text-white/90"
          >
            <span>Ubah</span>
            <PiPencilSimpleLine className="" size={18} />
          </DropdownMenuItem>
          </Link>
        <DropdownMenuItem
          onClick={() => {
            setIsModalTindakanOpen(true);
          }}
          className="flex justify-between rounded-lg bg-red-500 px-3 py-3 text-xs text-white hover:!bg-red-400 hover:!text-white/90"
        >
          <span>Tindakan</span>
          <FaRegHand className="" size={18} />
        </DropdownMenuItem>
      </DropdownMenuContent>
      {/* <DeleteConfirmationModal
    isOpen={isModalDeleteOpen}
    onClose={() => setIsModaDeletelOpen(false)}
    onConfirm={() => {
      handleDelete(voucher.id.toString());
      setIsModaDeletelOpen(false);
    }}
  /> */}
  {
    <TindakanModal
    isOpen={isModalTindakanOpen}
    onClose={()=> setIsModalTindakanOpen(false)}
    row={row}
    />
  }
    </DropdownMenu>
  );
};

export default ActionOptions;
