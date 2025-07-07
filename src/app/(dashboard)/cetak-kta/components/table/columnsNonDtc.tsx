import { ColumnDef } from "@tanstack/react-table";
import { CetakKtaTableData } from "./types";
import { PhotoCell, QRCodeCell, StatusCell } from "./CellComponents";
import { Checkbox } from "../icons/checkbox";

export const columnsNonDtc: ColumnDef<CetakKtaTableData>[] = [
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
    header: () => <Checkbox strokeColor="#F5F7FB" onChange={() => {}} />,
    cell: ({ row }) => <Checkbox strokeColor="#17191c" onChange={() => {}} />,
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
