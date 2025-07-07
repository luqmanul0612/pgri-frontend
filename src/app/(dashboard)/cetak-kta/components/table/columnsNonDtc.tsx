import { ColumnDef } from "@tanstack/react-table";
import { CetakKtaTableData } from "./types";
import {
  CheckboxCell,
  PhotoCell,
  QRCodeCell,
  StatusCell,
} from "./CellComponents";

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
    header: "",
    cell: ({ row }) => (
      <CheckboxCell
        checked={row.getIsSelected()}
        onChange={(checked) => {
          row.toggleSelected(checked);
        }}
      />
    ),
    size: 50,
  },
  {
    accessorKey: "npa",
    header: "NPA",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs font-normal text-[#17191c]">
        {getValue() as string}
      </div>
    ),
    size: 120,
  },
  {
    accessorKey: "nik",
    header: "NIK",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs font-normal text-[#17191c]">
        {getValue() as string}
      </div>
    ),
    size: 160,
  },
  {
    accessorKey: "namaAnggota",
    header: "Nama Anggota",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs font-normal text-[#17191c]">
        {getValue() as string}
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: "tempatLahir",
    header: "Tempat Lahir",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs font-normal text-[#17191c]">
        {getValue() as string}
      </div>
    ),
    size: 120,
  },
  {
    accessorKey: "tanggalLahir",
    header: "Tanggal Lahir",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs font-normal text-[#17191c]">
        {getValue() as string}
      </div>
    ),
    size: 150,
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
    size: 90,
  },
  {
    accessorKey: "qrCode",
    header: "QR Code",
    cell: () => <QRCodeCell />,
    size: 100,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <StatusCell status={getValue() as "active" | "inactive"} />
    ),
    size: 80,
  },
];