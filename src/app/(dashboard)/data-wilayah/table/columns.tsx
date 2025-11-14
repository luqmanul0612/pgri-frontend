"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProvinsiData } from "./types";
import { ActionCell } from "./cells";

export const provinsiColumns: ColumnDef<ProvinsiData>[] = [
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
    accessorKey: "code",
    header: "Kode Provinsi",
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
    accessorKey: "name",
    header: "Nama Provinsi",
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
