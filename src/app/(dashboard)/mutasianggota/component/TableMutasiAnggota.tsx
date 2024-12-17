"use client";

import React, { FC, Fragment, useEffect, useState } from "react";
import { Column, useTable } from "react-table";
import { IMember } from "@/interfaces/IMemberResponse";
import LoadingDots from "@/components/loading/LoadingDots";
import { getMembers } from "@/app/(dashboard)/anggota/serverActions/member";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import Card from "@/app/components/Card";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import Image from 'next/image'
import { cn } from '@/lib/utils'
import ActionOptions from "@/app/(dashboard)/anggota/component/ActionOptions";

const initialPageSize = 10;
const columns: Column<IMember>[] = [
  {
    Header: 'No',
    Cell: (row) => row.row.index + 1,
  },
  {
    Header: 'Nama Anggota',
    accessor: 'name'
  },
  {
    Header: 'NPA',
    accessor: 'npa_number'
  },
  {
    Header: 'NIK',
    accessor: 'nik'
  },
  {
    Header: 'Tempat Lahir',
    accessor: 'birth_place'
  },
  {
    Header: 'Opsi',
    Cell: ({ row }) => (
      <ActionOptions row={row} />
    )
  }
]

const TableMutasiAnggota: React.FC<any> = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [tableData, setTableData] = useState<IMember[]>([]);
  const [pageCount, setPageCount] = useState<number>();
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data: tableData!,
  })

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const memberData = await getMembers(currentPage + 1, pageSize, '', null, null, null);
        setTableData(memberData.data.data);
        setPageCount(memberData.data.total_page);
      } catch (error) {
        console.error("Failed to fetch table", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage, pageSize]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(0);
  };

  return (
    <Fragment>
      <div>
        <Card className={''}>
          <div className={'flex justify-between items-center p-5'}>
            <p className={'font-semibold text-primary'}>Mutasi Anggota</p>
            <div className={"flex items-center space-x-3"}>
              <button
                className={"flex flex-row items-center justify-center gap-1 rounded-lg border border-primary px-3 py-2 text-sm text-primary"}
              >
                <span>Cetak</span> <MdOutlineLocalPrintshop size={18} />
              </button>
              <div className={cn('flex w-[300px] rounded-lg bg-white p-2 border border-primary')}>
                <Image
                  src={"/assets/search.svg"}
                  alt="search"
                  width={18}
                  height={18} />
                <input
                  placeholder="Ketik Nama, NPA"
                  className="w-full px-3 outline-none text-sm" />
              </div>
            </div>
          </div>

          <div className="overflow-y-hidden">
            <table
              {...getTableProps()}
              className={"min-w-full bg-white"}>
              <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={index}
                  className={'bg-[#17a3b8]'}
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
          <tbody
            {...getTableBodyProps()}
          >
          {loading ? (
            <tr className="mt-4 ">
              <td
                colSpan={headerGroups[0].headers.length}
                className={'text-center py-6'}
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
                  { row.cells.map((cell, cellIndex) => (
                    <td
                      {...cell.getCellProps()}
                      key={cellIndex}
                      className="px-4 py-2"
                    >
                      { cell.render("Cell") }
                    </td>
                  )) }
                </tr>
              );
            })
          )}
          </tbody>
        </table>
      </div>

      <div className={'flex items-center justify-between p-4'}>
        <div className={'flex items-center'}>
          <div className={'mr-4'}>
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
          color={'standard'}
          shape={'rounded'}
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
            ></PaginationItem>
          )}
        ></Pagination>
      </div>
        </Card>
      </div>
    </Fragment>
  )
}

export default TableMutasiAnggota;
