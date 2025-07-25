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

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  pageSize?: number;
  pageSizeOptions?: number[];
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
  paginationLabel?: string;
}

export function DataTable<TData>({
  data,
  columns,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50, 100],
  className = "",
  headerClassName = "",
  cellClassName = "",
  paginationLabel = "Orang",
}: DataTableProps<TData>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize,
  });
  const [showPageSizeDropdown, setShowPageSizeDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newPageSize,
      pageIndex: 0,
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
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const totalDefinedWidth = columns.reduce((sum, col) => {
    return sum + (col.size || 0);
  }, 0);

  const columnsWithoutSize = columns.filter((col) => !col.size).length;

  const getColumnWidth = (column: any) => {
    const columnDef = columns.find((col) => col.id === column.id);

    if (columnDef?.size) {
      return `${columnDef.size}px`;
    }

    if (columnsWithoutSize > 0) {
      return `calc((100% - ${totalDefinedWidth}px) / ${columnsWithoutSize})`;
    }

    return "auto";
  };

  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto rounded-2xl bg-white outline outline-1 outline-offset-[-1px] outline-[#17a3b8]/20">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, columnIndex) => (
                  <th
                    key={header.id}
                    style={{
                      width: getColumnWidth(header.column),
                      minWidth: header.column.columnDef.size || "auto",
                    }}
                    className={`bg-[#17a3b8] px-2.5 py-4 text-left ${
                      columnIndex === 0 ? "rounded-tl-2xl" : ""
                    } ${
                      columnIndex === headerGroup.headers.length - 1
                        ? "rounded-tr-2xl"
                        : ""
                    } ${headerClassName}`}
                  >
                    <div className="text-sm font-semibold text-[#f5f7fb]">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`h-[58px] p-2.5 ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-[#f5f7fb]"
                    } ${cellClassName}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td
                colSpan={table.getHeaderGroups()[0].headers.length}
                className="p-0"
              >
                <div className="relative flex w-full flex-wrap items-center justify-between gap-4 rounded-b-2xl px-4 py-3">
                  <div className="flex items-center gap-4">
                    <div className="relative" ref={dropdownRef}>
                      <button
                        className="flex items-center rounded-lg border border-[#17a3b8] px-4 py-1.5 text-sm text-[#17a3b8]"
                        onClick={() =>
                          setShowPageSizeDropdown(!showPageSizeDropdown)
                        }
                      >
                        {pagination.pageSize} {paginationLabel}
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
                              {size} {paginationLabel}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-[#17a3b8]">
                      Halaman {pagination.pageIndex + 1} dari{" "}
                      {table.getPageCount()}
                    </span>
                  </div>

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

                    {pagination.pageIndex > 0 && (
                      <button
                        className="px-3 py-1.5 hover:bg-[#e0f7fb]"
                        onClick={() =>
                          table.setPageIndex(pagination.pageIndex - 1)
                        }
                      >
                        {pagination.pageIndex}
                      </button>
                    )}

                    <span className="bg-[#17a3b8] px-3 py-1.5 font-bold text-white">
                      {pagination.pageIndex + 1}
                    </span>

                    {pagination.pageIndex + 1 < table.getPageCount() && (
                      <button
                        className="px-3 py-1.5 hover:bg-[#e0f7fb]"
                        onClick={() =>
                          table.setPageIndex(pagination.pageIndex + 1)
                        }
                      >
                        {pagination.pageIndex + 2}
                      </button>
                    )}

                    {pagination.pageIndex + 2 < table.getPageCount() && (
                      <>
                        <span className="px-3 py-1.5">...</span>
                        <button
                          className="px-3 py-1.5 hover:bg-[#e0f7fb]"
                          onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                          }
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
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                      disabled={!table.getCanNextPage()}
                    >
                      Terakhir
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}