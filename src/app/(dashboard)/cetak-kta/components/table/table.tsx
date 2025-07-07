"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

import { CetakKtaTableData } from "./types";
import { columns } from "./columns";
import { sampleData } from "./sampleData";

interface TableKtaProps {
  data?: CetakKtaTableData[];
  columns?: ColumnDef<CetakKtaTableData>[];
}

export const TableKta: React.FC<TableKtaProps> = ({
  data = sampleData,
  columns: columnsProp = columns,
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [showPageSizeDropdown, setShowPageSizeDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pageSizeOptions = [5, 10, 20, 50, 100];

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newPageSize,
      pageIndex: 0, // Reset to first page when changing page size
    }));
    setShowPageSizeDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowPageSizeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const table = useReactTable({
    data,
    columns: columnsProp,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="inline-flex flex-col items-start justify-start gap-2 self-stretch">
      <div className="w-full overflow-x-auto">
        <div className="flex min-w-fit flex-col items-start justify-start self-stretch rounded-2xl bg-white outline outline-1 outline-offset-[-1px] outline-[#17a3b8]/20">
          <div className="inline-flex items-start justify-start self-stretch">
            {/* Data Columns */}
            {table.getHeaderGroups()[0].headers.map((header, columnIndex) => (
              <div
                key={`column-${columnIndex}`}
                className="inline-flex flex-col items-start justify-start"
                style={{ minWidth: "max-content", width: "auto" }}
              >
                {/* Column Header - tidak terpotong, panjang menyesuaikan */}
                <div
                  className={`inline-flex items-center justify-start gap-2.5 self-stretch bg-[#17a3b8] px-2.5 py-4 ${
                    columnIndex === 0 ? "rounded-tl-2xl" : ""
                  } ${
                    columnIndex ===
                    table.getHeaderGroups()[0].headers.length - 1
                      ? "rounded-tr-2xl"
                      : ""
                  }`}
                >
                  <div className="text-sm font-semibold text-[#f5f7fb]">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </div>
                </div>

                {/* Column Data Cells */}
                {table.getRowModel().rows.map((row, rowIndex) => {
                  const cell = row.getVisibleCells()[columnIndex];
                  return (
                    <div
                      key={`cell-${rowIndex}-${columnIndex}`}
                      className={`inline-flex h-[58px] items-center justify-start gap-2.5 self-stretch p-2.5 ${
                        rowIndex % 2 === 0 ? "bg-white" : "bg-[#f5f7fb]"
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="relative flex w-full flex-wrap items-center justify-between gap-4 rounded-b-2xl px-4 py-3">
            {/* Jumlah Data & Info Halaman */}
            <div className="flex items-center gap-4">
              {/* Dropdown Jumlah Data */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center rounded-lg border border-[#17a3b8] px-4 py-1.5 text-sm text-[#17a3b8]"
                  onClick={() => setShowPageSizeDropdown(!showPageSizeDropdown)}
                >
                  {pagination.pageSize} Orang
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                {showPageSizeDropdown && (
                  <div className="absolute bottom-full left-0 z-50 mb-1 min-w-full overflow-visible rounded-lg border border-[#17a3b8] bg-white shadow-lg">
                    {pageSizeOptions.map((size) => (
                      <button
                        key={size}
                        className={`w-full px-4 py-2 text-left text-sm first:rounded-t-lg last:rounded-b-lg hover:bg-[#e0f7fb] ${
                          pagination.pageSize === size
                            ? "bg-[#17a3b8] text-white hover:bg-[#17a3b8]"
                            : "text-[#17a3b8]"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handlePageSizeChange(size);
                        }}
                      >
                        {size} Orang
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-sm text-[#17a3b8]">
                Halaman {pagination.pageIndex + 1} dari {table.getPageCount()}
              </span>
            </div>

            {/* Navigasi Halaman */}
            <div className="flex items-center overflow-hidden rounded-lg border border-[#17a3b8] text-sm text-[#17a3b8]">
              <button
                className="px-2 py-1.5 hover:bg-[#e0f7fb] disabled:opacity-50"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                Pertama
              </button>
              <button
                className="px-2 py-1.5 hover:bg-[#e0f7fb] disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Previous Page */}
              {pagination.pageIndex > 0 && (
                <button
                  className="px-3 py-1.5 hover:bg-[#e0f7fb]"
                  onClick={() => table.setPageIndex(pagination.pageIndex - 1)}
                >
                  {pagination.pageIndex}
                </button>
              )}

              {/* Current Page */}
              <span className="bg-[#17a3b8] px-3 py-1.5 font-bold text-white">
                {pagination.pageIndex + 1}
              </span>

              {/* Next Page */}
              {pagination.pageIndex + 1 < table.getPageCount() && (
                <button
                  className="px-3 py-1.5 hover:bg-[#e0f7fb]"
                  onClick={() => table.setPageIndex(pagination.pageIndex + 1)}
                >
                  {pagination.pageIndex + 2}
                </button>
              )}

              {/* Ellipsis and Last Page */}
              {pagination.pageIndex + 2 < table.getPageCount() && (
                <>
                  <span className="px-3 py-1.5">...</span>
                  <button
                    className="px-3 py-1.5 hover:bg-[#e0f7fb]"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  >
                    {table.getPageCount()}
                  </button>
                </>
              )}

              <button
                className="px-2 py-1.5 hover:bg-[#e0f7fb] disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                className="px-2 py-1.5 hover:bg-[#e0f7fb] disabled:opacity-50"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                Terakhir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
