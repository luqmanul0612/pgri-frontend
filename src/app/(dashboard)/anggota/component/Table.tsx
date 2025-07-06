/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, Fragment, useRef } from "react";
import { useTable, Column } from "react-table";
import Card from "@/app/components/Card";
import { IoFemaleOutline, IoMaleOutline } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { getMembers } from "../serverActions/member";
import { IMember } from "@/interfaces/IMemberResponse";
import dummyProfile from "@/../public/assets/profileNew.png";
import { FaPlus, FaRegCopy, FaRegCreditCard } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import TambahAnggotaModal from "./TambahAnggotaModal";
import Link from "next/link";
import { FaRegHand } from "react-icons/fa6";
import ActionOptions from "./ActionOptions";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import LoadingDots from "@/components/loading/LoadingDots";
import LoadingDotTable from "@/components/loading/LoadingDotTable";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import clsx from "clsx";

interface TableProps {
  searchQuery: string;
  filterRegions: any;
  filterByStatus?: string;
}

const initialPageSize = 10;

const columns: Column<IMember>[] = [
  {
    Header: "No.",
    Cell: (row) => row.row.index + 1,
  },
  { Header: "Nama Anggota", accessor: "name" },
  { Header: "NPA", accessor: "npa_number" },
  { Header: "NIK", accessor: "nik" },
  { Header: "Tempat Lahir", accessor: "birth_place" },
  { Header: "Tanggal Lahir", accessor: "dob" },
  { Header: "Provinsi", accessor: "province" },
  {
    Header: "Foto",
    accessor: "profile",
    Cell: ({ value }) => (
      <div className="flex items-center justify-center">
        <div className="relative flex h-[24px] w-[24px] items-center justify-center rounded-md border border-primary">
          <img
            src={value ?? dummyProfile}
            alt="Foto"
            className="h-[23px] w-[23px] rounded-md border-transparent object-cover"
            // layout="fill"
            // objectFit="cover"
          />
        </div>
      </div>
    ),
  },
  {
    Header: "QR Code",
    accessor: "qr",
    Cell: ({ value }) => (
      <div className="flex items-center justify-center">
        <div className="relative flex h-[24px] w-[24px] items-center justify-center rounded-md border border-primary">
          <img
            src={value}
            alt="QR Code"
            className="h-[23px] w-[23px] rounded-md border-transparent object-cover"
            //  layout="fill"
            //  objectFit="cover"
          />
        </div>
      </div>
    ),
  },
  {
    Header: "Whatsapp",
    accessor: "email",
    Cell: ({ value }) => (
      <div className="flex items-center justify-center">
        <div className="relative flex h-[25px] w-[25px] items-center justify-center rounded-md">
          <img src="/assets/wa.png" alt="QR Code" className="object-cover" />
        </div>
      </div>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }: { value: number }) => (
      <div className="flex items-center justify-center">
        <Popover className="relative">
          {/* Tooltip Trigger */}
          <PopoverButton
            onMouseEnter={(e) => e.currentTarget.click()}
            onMouseLeave={(e) => e.currentTarget.click()}
            className="cursor-default border-none outline-none ring-0 focus:outline-none"
          >
            {value === 1 ? (
              <IoIosCheckmarkCircle color="green" fontSize={18} />
            ) : (
              <IoIosCloseCircle color="red" fontSize={18} />
            )}
          </PopoverButton>

          {/* Tooltip Panel */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              className={`absolute bottom-full left-1/2 mb-2 w-32 -translate-x-1/2 transform rounded-3xl border border-gray-100 bg-white shadow-xl ${value === 1 ? "text-green-600" : "text-red-600"} rounded-lg p-2 text-sm shadow-lg`}
            >
              {value === 1 ? "Sudah diverifikasi" : "Belum diverifikasi"}
            </PopoverPanel>
          </Transition>
        </Popover>
      </div>
    ),
  },
  {
    Header: "Opsi",
    Cell: ({ row }) => <ActionOptions row={row} />,
  },
];

const Table: React.FC<TableProps> = ({
  searchQuery,
  filterRegions,
  filterByStatus,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [tableData, setTableData] = useState<IMember[]>([]);
  const [pageCount, setPageCount] = useState<number>();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [countMale, setCountMale] = useState<number>(0);
  const [countFemale, setCountFemale] = useState<number>(0);
  const printRef = useRef<HTMLDivElement | null>(null);
  const [filterGender, setFilterGender] = useState<string>("");
  const defaultFilterMale: string = "laki-laki";
  const defaultFilterFemale: string = "perempuan";

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const memberData = await getMembers(
          currentPage + 1,
          pageSize,
          searchQuery,
          filterRegions,
          filterByStatus,
          filterGender,
        );
        setTableData(memberData.data.data);
        setPageCount(memberData.data.total_page);
        setCountMale(memberData.data?.counter?.laki_laki);
        setCountFemale(memberData.data?.counter?.perempuan);
      } catch (error) {
        console.error("Failed to fetch members data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [
    currentPage,
    pageSize,
    searchQuery,
    filterRegions,
    filterByStatus,
    filterGender,
  ]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: tableData!,
    });
  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(0);
  };

  const handlePrintPDF = async () => {
    const el = printRef.current;
    if (!el) return;
    const canvas = await html2canvas(el);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 0, 0, pdfWidth, pdfHeight);
    const date = new Date().valueOf();
    pdf.save(`download-tabel-anggota-${date}.pdf`);
  };

  const handleFilterGender = (gender: string) => () => {
    setFilterGender(gender);
  };

  const scrollStyle = {
    overflowX: "auto",
  };

  return (
    <div className="">
      <Card className="">
        {/*
        <LoadingDotTable/> */}
        <div className="flex justify-between p-5">
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrintPDF}
              className="flex flex-row items-center justify-center gap-1 rounded-lg border border-primary px-3 py-2 text-sm text-primary"
            >
              <span>Cetak</span> <MdOutlineLocalPrintshop size={18} />
            </button>
            <button
              onClick={() => {
                setIsModalAddOpen(true);
              }}
              className="flex flex-row items-center justify-center gap-1 rounded-lg border border-primary px-3 py-2 text-sm text-primary"
            >
              <span>Tambah Anggota</span> <FaPlus />
            </button>
          </div>
          <div className="flex gap-4">
            <div
              onClick={handleFilterGender(defaultFilterMale)}
              className={clsx(
                "flex cursor-pointer items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-300 px-4 py-1 text-sm font-normal",
                {
                  "bg-opacity-100 text-white":
                    filterGender === defaultFilterMale,
                  "bg-opacity-20 text-[#FFC107]":
                    filterGender !== defaultFilterMale,
                },
              )}
            >
              <IoMaleOutline />
              <span>Anggota Laki-laki : {countMale}</span>
            </div>
            <div
              onClick={handleFilterGender(defaultFilterFemale)}
              className={clsx(
                "flex cursor-pointer items-center gap-2 rounded-lg border border-red-500 bg-red-500 bg-opacity-20 px-4 py-1 text-sm font-normal",
                {
                  "bg-opacity-100 text-white":
                    filterGender === defaultFilterFemale,
                  "border-opacity-20 text-[#DC3545]":
                    filterGender !== defaultFilterFemale,
                },
              )}
            >
              <IoFemaleOutline />
              <span>Anggota Perempuan : {countFemale}</span>
            </div>
          </div>
        </div>

        <div className="overflow-y-hidden" ref={printRef}>
          <table {...getTableProps()} className="min-w-full bg-white">
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={index}
                  className="bg-[#17a3b8]"
                >
                  {headerGroup.headers.map((column, colIndex) => (
                    <th
                      {...column.getHeaderProps()}
                      key={colIndex}
                      className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-white"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {loading ? (
                <tr className="mt-4">
                  <td
                    colSpan={headerGroups[0].headers.length}
                    className="py-6 text-center"
                  >
                    <LoadingDots />
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={index}
                      className={`border-t text-xs font-light ${
                        row.index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          {...cell.getCellProps()}
                          key={cellIndex}
                          className="px-4 py-2"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <div className="mr-4">
              <label htmlFor="pageSize" className="mr-2 text-sm"></label>
              <select
                id="pageSize"
                className="rounded-md border border-primary p-1 text-sm font-light text-primary outline-none"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value={5}>5 Orang</option>
                <option value={10}>10 Orang</option>
                <option value={20}>20 Orang</option>
                <option value={50}>50 Orang</option>
              </select>
            </div>

            <div className="text-sm font-light text-primary">
              Halaman {currentPage + 1} dari {pageCount}
            </div>
          </div>

          <Pagination
            count={pageCount}
            page={currentPage + 1}
            onChange={(_, newPage) => setCurrentPage(newPage - 1)}
            color="standard"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "0px",
                minWidth: "40px",
                minHeight: "40px",
                padding: "5px 10px",
                backgroundColor: "#ffffff",
                color: "#17a3b8",
                margin: "0",
                border: "1px solid lightgray",
                "&:hover": {
                  backgroundColor: "#e0f7fa",
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#17a3b8 !important",
                color: "#ffffff !important",
                "&:hover": {
                  backgroundColor: "#138a99 !important",
                },
              },
            }}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  borderTopLeftRadius:
                    item.type === "previous" ? "15px !important" : "0px",
                  borderBottomLeftRadius:
                    item.type === "previous" ? "15px !important" : "0px",
                  borderTopRightRadius:
                    item.type === "next" ? "15px !important" : "0px",
                  borderBottomRightRadius:
                    item.type === "next" ? "15px !important" : "0px",
                  paddingLeft:
                    item.type === "previous" || item.type === "next"
                      ? "20px !important"
                      : "10px",
                  paddingRight:
                    item.type === "previous" || item.type === "next"
                      ? "20px !important"
                      : "10px",
                }}
                components={{
                  previous: () => <span>Sebelumnya</span>,
                  next: () => <span>Selanjutnya</span>,
                }}
              />
            )}
          />
        </div>
      </Card>
      {
        <TambahAnggotaModal
          isOpen={isModalAddOpen}
          onClose={() => setIsModalAddOpen(false)}
        />
      }
    </div>
  );
};

export default Table;
