import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { CetakKtaTableData } from "./types";
import { ActionCell } from "./cells/ActionCell";
import { PhotoCell } from "./cells/PhotoCell";
import { QRCodeCell } from "./cells/QRCodeCell";
import { StatusCell } from "./cells/StatusCell";
import { YesNoCell } from "./cells/YesNoCell";
import { ktaPrintService } from "@/services/kta-print";

export const columns: ColumnDef<CetakKtaTableData>[] = [
  {
    accessorKey: "id",
    header: "NO.",
    cell: ({ row }) => (
      <div className="w-full justify-center text-center text-xs text-[#17191c]">
        {row.index + 1}
      </div>
    ),
    size: 50,
  },
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const handleCR80Print = async (data: CetakKtaTableData) => {
        try {
          await ktaPrintService.printKTANonBlanko({
            data,
            cardType: 'CR80'
          });
        } catch (error) {
          console.error('Failed to print CR80 Non-Blanko:', error);
        }
      };

      const handleCR79Print = async (data: CetakKtaTableData) => {
        try {
          await ktaPrintService.printKTANonBlanko({
            data,
            cardType: 'CR79'
          });
        } catch (error) {
          console.error('Failed to print CR79 Non-Blanko:', error);
        }
      };

      return (
        <ActionCell
          data={row.original}
          onCR80Click={handleCR80Print}
          onCR79Click={handleCR79Print}
        />
      );
    },
    size: 150,
  },
  {
    accessorKey: "npa",
    header: "NPA",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs text-[#17191c]">
        {getValue() as string}
      </div>
    ),
    size: 120,
  },
  {
    accessorKey: "nik",
    header: "NIK",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs text-[#17191c]">
        {getValue() as string}
      </div>
    ),
    size: 140,
  },
  {
    accessorKey: "namaAnggota",
    header: "Nama Anggota",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs text-[#17191c]">
        {getValue() as string}
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: "tempatLahir",
    header: "Tempat Lahir",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs text-[#17191c]">
        {getValue() as string}
      </div>
    ),
    size: 100,
  },
  {
    accessorKey: "tanggalLahir",
    header: "Tanggal Lahir",
    cell: ({ getValue }) => (
      <div className="flex-1 justify-start text-xs text-[#17191c]">
        {getValue() as string}
      </div>
    ),
    size: 100,
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
    size: 80,
  },
  {
    accessorKey: "qrCode",
    header: "QR Code",
    cell: () => <QRCodeCell />,
    size: 80,
  },
  {
    accessorKey: "cetakKtaBiasa",
    header: "Cetak KTA Biasa",
    cell: ({ getValue }) => <YesNoCell value={getValue() as boolean} />,
    size: 150,
  },
  {
    accessorKey: "cetakKtaMultiPayment",
    header: "Cetak KTA Multi Payment",
    cell: ({ getValue }) => <YesNoCell value={getValue() as boolean} />,
    size: 180,
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