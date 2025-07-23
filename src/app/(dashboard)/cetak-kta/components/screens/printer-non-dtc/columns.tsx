import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CetakKtaTableData } from "./types";
import { PhotoCell } from "./cells/PhotoCell";
import { QRCodeCell } from "./cells/QRCodeCell";
import { StatusCell } from "./cells/StatusCell";

export const createColumns = (
  data: CetakKtaTableData[],
  handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSelectRow: (rowId: number) => (e: React.ChangeEvent<HTMLInputElement>) => void,
  CheckboxComponent: React.ComponentType<any>
): ColumnDef<CetakKtaTableData>[] => [
  {
    accessorKey: "id",
    header: "NO.",
    cell: ({ row }) => (
      <div className="w-full justify-center text-center text-xs font-normal text-[#17191c]">
        {row.index + 1}
      </div>
    ),
    size: 50,
  },
  {
    accessorKey: "selected",
    header: () => {
      return (
        <CheckboxComponent
          strokeColor="#F5F7FB"
          className="mx-auto"
          onChange={handleSelectAll}
          checked={data.length > 0 && data.every((row) => row.selected)}
          indeterminate={
            data.some((row) => row.selected) &&
            !data.every((row) => row.selected)
          }
        />
      );
    },
    cell: ({ row }: { row: { original: CetakKtaTableData } }) => (
      <CheckboxComponent
        className="mx-auto"
        strokeColor="#17191c"
        checked={!!row.original.selected}
        onChange={handleSelectRow(row.original.id)}
      />
    ),
    size: 70,
  },
  {
    accessorKey: "npa",
    header: () => <span className="">NPA</span>,
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs font-normal text-[#17191c]">
        {getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: "nik",
    header: "NIK",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs font-normal text-[#17191c]">
        {getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: "namaAnggota",
    header: "Nama Anggota",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs font-normal text-[#17191c]">
        {getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: "tempatLahir",
    header: "Tempat Lahir",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs font-normal text-[#17191c]">
        {getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: "tanggalLahir",
    header: "Tanggal Lahir",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs font-normal text-[#17191c]">
        {getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: "foto",
    header: "Foto",
    cell: ({ getValue, row }) => (
      <PhotoCell
        src={getValue() as string}
        alt={`Foto ${row.original.namaAnggota}`}
      />
    ),
  },
  {
    accessorKey: "qrCode",
    header: "QR Code",
    cell: () => <QRCodeCell />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <StatusCell status={getValue() as "active" | "inactive"} />
    ),
  },
];