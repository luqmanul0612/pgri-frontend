"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FeesData } from "./types";
import ThreeDotIcon from "../assets/three-dot.svg";
import Button from "@/components/customs/button";

export const FeesColumns: ColumnDef<FeesData>[] = [
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
    accessorKey: "trxId",
    header: "ID Transaksi",
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
    accessorKey: "npa",
    header: "NPA",
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
    header: "Nama Anggota",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "No. WhatsApp",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Lokasi",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "period",
    header: "Periode",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Dibayarkan",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Waktu Transaksi",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Metode Bayar",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Waktu Transaksi",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "trxId",
    header: "ID Transaksi",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status Pembayaran",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Distribusi Iuran Rp8000",
    // columns: [
    //   {
    //     accessorKey: "fees.center",
    //     header: "Pusat",
    //     cell: ({ getValue }) => {
    //       return (
    //         <div className="text-sm font-normal text-[#17191c]">
    //           {getValue() as string}
    //         </div>
    //       );
    //     },
    //   },
    //   {
    //     accessorKey: "fees.province",
    //     header: "Provinsi",
    //     cell: ({ getValue }) => {
    //       return (
    //         <div className="text-sm font-normal text-[#17191c]">
    //           {getValue() as string}
    //         </div>
    //       );
    //     },
    //   },
    //   {
    //     accessorKey: "fees.regency",
    //     header: "Kabupaten",
    //     cell: ({ getValue }) => {
    //       return (
    //         <div className="text-sm font-normal text-[#17191c]">
    //           {getValue() as string}
    //         </div>
    //       );
    //     },
    //   },
    //   {
    //     accessorKey: "fees.district",
    //     header: "Kecamatan",
    //     cell: ({ getValue }) => {
    //       return (
    //         <div className="text-sm font-normal text-[#17191c]">
    //           {getValue() as string}
    //         </div>
    //       );
    //     },
    //   },
    // ],
  },
  {
    accessorKey: "additionalAmount",
    header: "Tambahan Kab/Kota",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status Distribusi",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Opsi",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          <Button variant="neutral" className="!py-1 !px-4 !min-w-fit">
            <ThreeDotIcon />
          </Button>
        </div>
      );
    },
  },
];
