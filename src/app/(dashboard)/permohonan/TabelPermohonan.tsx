/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import Card from "@/app/components/Card";
import { IoIosArrowDown } from "react-icons/io";
import { IoFemaleOutline, IoMaleOutline } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
// import { getMembers } from "../serverActions/member";
import { IMember } from "@/interfaces/IMemberResponse";
import dummyProfile from "@/../public/assets/profileNew.png";
import { FaPlus, FaRegCopy, FaRegCreditCard } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiPencilLineLight } from "react-icons/pi";
import { PiPencilSimpleLine } from "react-icons/pi";
import { BsPrinter } from "react-icons/bs";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import { getMembers } from "../anggota/serverActions/member";
import TambahAnggotaModal from "../anggota/component/TambahAnggotaModal";
import { SearchInput } from "@/app/components/SearchInput";
import LoadingDots from "@/components/loading/LoadingDots";
// import TambahAnggotaModal from "./TambahAnggotaModal";

const initialPageSize = 10;

const columns: Column<IMember>[] = [
  {
    Header: "No.",
    Cell: (row) => row.row.index + 1,
  },
  { Header: "NPA", accessor: "npa_number" },
  { Header: "NIK", accessor: "nik" },
  { Header: "Nama Anggota", accessor: "name" },
  { Header: "Email", accessor: "email" },
//   { Header: "Tempat Lahir", accessor: "birth_place" },
//   { Header: "Tanggal Lahir", accessor: "dob" },
  { Header: "Provinsi", accessor: "province" },
  { Header: "Tanggal Pengajuan", accessor: "dob" },

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
//   { Header: "Whatsapp", accessor: "email" },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => (
      <div className="flex items-center justify-center">
        {value === 1 ? (
          <IoIosCheckmarkCircle color="green" fontSize={18} />
        ) : (
          <IoIosCloseCircle color="red" fontSize={18} />
        )}
      </div>
    ),
  },
  {
    Header: "Opsi",
    Cell: () => (
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
            <span className="text-sm font-bold">Opsi</span>
          </div>
          <DropdownMenuItem
            // onClick={handleViewDetails}
            className="flex justify-between rounded-lg bg-green-500 px-3 py-3 text-xs text-white hover:!bg-green-400 hover:!text-white/90"
          >
            <span>Lihat</span>
            <MdOutlineRemoveRedEye className="" size={18} />
          </DropdownMenuItem>
          <DropdownMenuItem
            // onClick={() => {
            //   setIsUpdateModalOpen(true);
            // }}
            className="flex justify-between rounded-lg bg-blue-500 px-3 py-3 text-xs text-white hover:!bg-blue-400 hover:!text-white/90"
          >
            <span>Ubah</span>
            <PiPencilSimpleLine className="" size={18} />
          </DropdownMenuItem>
          <DropdownMenuItem
            // onClick={() => setIsModaDeletelOpen(true)}
            className="flex justify-between rounded-lg bg-red-500 px-3 py-3 text-xs text-white hover:!bg-red-400 hover:!text-white/90"
          >
            <span>Hapus</span>
            <FaRegTrashAlt className="" size={18} />
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
      </DropdownMenu>
    ),
  },
];

const Table: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [tableData, setTableData] = useState<IMember[]>([]);
  const [pageCount, setPageCount] = useState<number>();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true); 
      try {
        const memberData = await getMembers(currentPage + 1, pageSize);
        setTableData(memberData.data.data);
        setPageCount(memberData.data.total_page);
      } catch (error) {
        console.error("Failed to fetch members data:", error);
      } finally {
        setLoading(false); 
      }
    })();
  }, [currentPage, pageSize]);

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

  const scrollStyle = {
    overflowX: "auto",
  };

  return (
    <div className="">
      <Card className="">
        <div className="flex justify-between p-5">
          <div className="flex items-center space-x-3 text-[16px] text-primary font-semibold">
            Cetak KTA Biasa
          </div>
          <div className="flex gap-4">
            <button className="flex flex-row items-center justify-center gap-1 rounded-lg border border-primary px-3 py-2 text-sm text-primary">
              <span>Cetak</span> <MdOutlineLocalPrintshop size={18} />
            </button>
            <SearchInput className="border border-primary" />
          </div>
        </div>

        <div className="overflow-y-hidden">
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
                      // style={{ minWidth: '150px' }}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {
              loading ? (
                <tr className="mt-4 ">
                  <td colSpan={headerGroups[0].headers.length} className="text-center py-6 ">
                  <LoadingDots/>
                  </td>
                </tr>
              ) :
              rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={index}
                    className={`border-t text-xs font-light ${row.index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
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
              })}
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
          {/* <ReactPaginate
            pageCount={pageCount!}
            pageRangeDisplayed={3} // Menampilkan 3 tombol halaman di tengah
            marginPagesDisplayed={1} // Menampilkan 1 tombol di awal dan akhir
            onPageChange={handlePageChange}
            containerClassName="flex gap-0" // Menghilangkan gap antar tombol
            pageClassName="px-3 py-0 border cursor-pointer flex items-center justify-center"
            pageLinkClassName="w-full h-full flex items-center justify-center text-[14px]" // Tombol angka bisa di-klik sepenuhnya
            activeClassName="bg-primary text-white border"
            previousClassName="px-4 py-2 bg-primary text-white rounded-l-md cursor-pointer text-[14px]"
            nextClassName="px-4 py-2 bg-primary text-white rounded-r-md cursor-pointer text-[14px]"
            breakClassName="px-3 py-1 border"
          /> */}

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
                backgroundColor: "#ffffff", // Warna tombol tidak aktif menjadi putih
                color: "#17a3b8", // Warna teks tombol tidak aktif
                margin: "0",
                border: "1px solid lightgray",
                "&:hover": {
                  backgroundColor: "#e0f7fa", // Warna saat hover
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
        borderTopLeftRadius: item.type === "previous" ? "15px !important" : "0px",
        borderBottomLeftRadius: item.type === "previous" ? "15px !important" : "0px",
        borderTopRightRadius: item.type === "next" ? "15px !important" : "0px",
        borderBottomRightRadius: item.type === "next" ? "15px !important" : "0px",
        paddingLeft:  item.type === "previous" || item.type === "next" ?  "20px !important" : "10px",
        paddingRight:  item.type === "previous" || item.type === "next" ?  "20px !important" : "10px",
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
