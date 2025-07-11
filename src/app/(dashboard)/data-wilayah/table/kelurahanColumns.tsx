"use client";

import { ColumnDef } from "@tanstack/react-table";
import { KelurahanData } from "./types";
import { ActionCell } from "./cells";

export const kelurahanColumns: ColumnDef<KelurahanData>[] = [
  {
    id: "no",
    header: () => <div className="text-center">NO.</div>,
    size: 80,
    cell: ({ row }) => {
      return (
        <div className="text-center text-sm font-normal text-[#17191c]">
          {row.index + 1}
        </div>
      );
    },
  },
  {
    accessorKey: "kodeKelurahan",
    header: "Kode Kelurahan",
    size: 150,
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "namaKelurahan",
    header: "Nama Kelurahan",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    id: "aksi",
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => {
      return <ActionCell data={row.original} />;
    },
    size: 300,
  },
];