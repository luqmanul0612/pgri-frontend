"use client";

import React, { useEffect, useState } from "react";
import { Column, useTable } from "react-table";
import { IMember } from "@/interfaces/IMemberResponse";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlOptionsVertical } from "react-icons/sl";
import { MdAdd, MdOutlineLocalPrintshop, MdOutlineRemoveRedEye } from "react-icons/md";
import { PiPencilSimpleLine } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";
import Card from "@/app/components/Card";
import { SearchInput } from "@/app/components/SearchInput";
import LoadingDots from "@/components/loading/LoadingDots";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import { getMembers } from "@/app/(dashboard)/anggota/serverActions/member";
import FilterSVG from "../../../../../public/icon/Filter";

const initialPageSize = 10;
const columns: Column<IMember>[] = [
  {
    Header: "No.",
    Cell: (row) => row.row.index + 1,
  },
  {
    Header: "NIK",
    accessor: "nik"
  },
  {
    Header: "Nama Anggota",
    accessor: "name",
  },
  {
    Header: "Provinsi",
    accessor: "province",
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
            className="flex justify-between rounded-lg bg-red-500 px-3 py-3 text-xs text-white hover:!bg-red-400 hover:!text-white/90"
          >
            <span>Hapus</span>
            <FaRegTrashAlt className="" size={18} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
]

const TableIuranTagihan: React.FC<any> = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [tableData, setTableData] = useState<IMember[]>([]);
  const [pageCount, setPageCount] = useState<number>(initialPageSize);
  const [loading, setLoading] = useState(true);
  const [SearchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const memberData = await getMembers(currentPage, pageSize);
        setTableData(memberData.data.data);
        setPageCount(memberData.data.total_page);
      } catch (e) {
        console.log('Failed to Fetch Member data:', e)
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage, pageSize]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data: tableData!,
  });

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(0)
  }

  return (
    <div>
      <Card>
        <div className="flex justify-between p-5">
          <div className="flex items-center space-x-3">
            <h3 className={"text-[16px] text-primary font-semibold"}>Iuran Guru</h3>
            <button
              className="flex flex-row items-center justify-center gap-1 rounded-lg border border-primary px-3 py-2 text-sm text-primary">
              <MdAdd size={18} />
              <span>Tambah Iuran</span>
            </button>
          </div>
          <div className="flex gap-4">
            <button
              className="flex flex-row items-center justify-center gap-1 rounded-lg border border-primary px-3 py-2 text-sm text-primary bg-white">
              Filter <FilterSVG />
            </button>
            <SearchInput placeholder={"Pencarian"} onSearch={setSearchQuery} className="border border-primary" />
          </div>
        </div>
        <div className={"overflow-y-hidden"}>
          <table {...getTableProps()} className={"min-w-full bg-white"}>
            <thead>
            {headerGroups.map((headerGroups, index) => (
              <tr
                {...headerGroups.getHeaderGroupProps()}
                key={index}
                className={"bg-[#17a3b8]"}
              >
                {headerGroups.headers.map((column, colIndex) => (
                  <th
                    {...column.getHeaderProps()}
                    key={colIndex}
                    className={"whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-white"}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
            >
            {loading ? (
                <tr className={"mt-4"}>
                  <td colSpan={headerGroups[0].headers.length} className={"text-center py-6"}>
                    <LoadingDots />
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
                        className={"px-4 py-2"}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
                backgroundColor: "#ffffff", // Warna tombol tidak aktif menjadi putih
                color: "#17a3b8", // Warna teks tombol tidak aktif
                margin: "0",
                border: "1px solid lightgray",
                "&:hover": {
                  backgroundColor: "#e0f7fa" // Warna saat hover
                }
              },
              "& .Mui-selected": {
                backgroundColor: "#17a3b8 !important",
                color: "#ffffff !important",
                "&:hover": {
                  backgroundColor: "#138a99 !important"
                }
              }
            }}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  borderTopLeftRadius: item.type === "previous" ? "15px !important" : "0px",
                  borderBottomLeftRadius: item.type === "previous" ? "15px !important" : "0px",
                  borderTopRightRadius: item.type === "next" ? "15px !important" : "0px",
                  borderBottomRightRadius: item.type === "next" ? "15px !important" : "0px",
                  paddingLeft: item.type === "previous" || item.type === "next" ? "20px !important" : "10px",
                  paddingRight: item.type === "previous" || item.type === "next" ? "20px !important" : "10px"
                }}
                components={{
                  previous: () => <span>Sebelumnya</span>,
                  next: () => <span>Selanjutnya</span>
                }}
              />
            )}
          />
        </div>
      </Card>
    </div>
  )
}

export default TableIuranTagihan
