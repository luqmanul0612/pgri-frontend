"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TransactionData } from "./types";

export const TransactionColumns: ColumnDef<TransactionData>[] = [
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
    accessorKey: "transactionType",
    header: "Jenis Transaksi",
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
    accessorKey: "total",
    header: "Jumlah",
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
    header: "Status",
    cell: ({ getValue }) => {
      return (
        <div className="text-sm font-normal text-[#17191c]">
          {getValue() as string}
        </div>
      );
    },
  },
];
