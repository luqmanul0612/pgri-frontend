"use client";

import React, { useEffect, useState } from "react";
import { Column, useTable } from "react-table";
import { IMember } from "@/interfaces/IMemberResponse";
import ActionOptions from "@/app/(dashboard)/anggota/component/ActionOptions";
import Card from "@/app/components/Card";
import LoadingDots from "@/components/loading/LoadingDots";
import { getMembers } from "@/app/(dashboard)/anggota/serverActions/member";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { SearchInput } from "@/app/components/SearchInput";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";

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


const TableAspirasiGuru: React.FC<any> = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [tableData, setTableData] = useState<IMember[]>([]);
  const [pageCount, setPageCount] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [SearchQuery, setSearchQuery] = useState<string>('');

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

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(0);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: tableData!,
    });

  return (
    <>
      <Card>

        <div className="flex justify-between p-5">
          <div className="flex items-center space-x-3 text-[16px] text-primary font-semibold">
            Aspirasi Guru
          </div>
          <div className="flex gap-4">
            <button
              className="flex flex-row items-center justify-center gap-1 rounded-lg border border-primary px-3 py-2 text-sm text-primary">
              <span>Cetak</span> <MdOutlineLocalPrintshop size={18} />
            </button>
            <SearchInput placeholder={'Pencarian'} onSearch={setSearchQuery} className="border border-primary" />
          </div>
        </div>

        <div className={'overflow-y-hidden'}>
          <table {...getTableProps()}
                 className={'min-w-full bg-white'}
          >
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
                    key={index}
                    className={'whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-white'}
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
                <tr className={'mt-2'}>
                  <td colSpan={headerGroups[0].headers.length} className={'text-center py-6'}>
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
                    {row.cells.map((cell, colIndex) => (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className={"px-4 py-2"}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                )
              })
            }
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
                  paddingLeft: item.type === "previous" || item.type === "next" ? "20px !important" : "10px",
                  paddingRight: item.type === "previous" || item.type === "next" ? "20px !important" : "10px",
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
    </>
  )
}

export default TableAspirasiGuru;
