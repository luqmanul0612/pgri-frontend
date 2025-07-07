import React, { FC, useState } from "react";
import { TableKta } from "../table/table";
import { columnsNonDtc as baseColumnsNonDtc } from "../table/columnsNonDtc";
import { CetakKtaTableData } from "../table/types";
import { sampleData } from "../table/sampleData";
import { Checkbox } from "../icons/checkbox";

interface PrinterDtcProps {
  onBack?: () => void;
}

const PrinterNonDtc: FC<PrinterDtcProps> = ({ onBack }) => {
  // State untuk data dan selected
  const [data, setData] = useState<CetakKtaTableData[]>(sampleData);

  // Handler select all
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setData((prev) => prev.map((row) => ({ ...row, selected: checked })));
  };

  // Handler select per baris
  const handleSelectRow =
    (rowId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setData((prev) =>
        prev.map((row) =>
          row.id === rowId ? { ...row, selected: checked } : row,
        ),
      );
    };

  // Handler tombol cetak
  const handleCetak = () => {
    const selectedIds = data.filter((row) => row.selected).map((row) => row.id);
    console.log("ID yang dicentang:", selectedIds);
  };

  // Inject handler ke kolom
  const columnsNonDtc = baseColumnsNonDtc.map((col: any) => {
    if (col.accessorKey === "selected") {
      return {
        ...col,
        id: col.id ?? String(col.accessorKey ?? Math.random()),
        header: () => {
          return (
            <Checkbox
              strokeColor="#F5F7FB" // putih untuk header
              className="mx-auto"
              onChange={handleSelectAll}
              checked={data.length > 0 && data.every((row) => row.selected)}
              indeterminate={
                data.some((row) => row.selected) &&
                !data.every((row) => row.selected)
              }
            />
          );
        },
        cell: ({ row }: { row: { original: CetakKtaTableData } }) => (
          <Checkbox
            className="mx-auto"
            strokeColor="#17191c"
            checked={!!row.original.selected}
            onChange={handleSelectRow(row.original.id)}
          />
        ),
      };
    }
    return { ...col, id: col.id ?? String(col.accessorKey ?? Math.random()) };
  });

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Header */}
      <div
        className="flex cursor-pointer items-center gap-2.5"
        onClick={onBack}
      >
        {/* Tombol back, klik akan trigger onBack jika ada */}
        <div className="relative cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
              fill="#17191C"
            />
          </svg>
        </div>
        <div className="text-base font-semibold text-[#17191c]">
          Data Tabel Cetak KTA Dengan Printer Non-DTC
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex w-full flex-wrap items-end gap-4 rounded-2xl bg-white p-4 outline outline-1 outline-offset-[-1px] outline-primary/20">
        {[
          { label: "Provinsi", placeholder: "Pilih Provinsi" },
          { label: "Kab/Kota", placeholder: "Pilih Kabupaten/Kota" },
          { label: "Kecamatan", placeholder: "Pilih Kecamatan" },
          { label: "Status Pegawai", placeholder: "Pilih Status Pegawai" },
        ].map(({ label, placeholder }) => (
          <div key={label} className="flex min-w-[180px] flex-1 flex-col gap-2">
            <div className="text-xs font-normal text-[#17191c]">{label}</div>
            <div className="flex items-center gap-2.5 rounded-[10px] px-4 py-2 outline outline-1 outline-offset-[-1px] outline-[#d3d3d3]">
              <div className="flex-1 text-xs font-normal text-[#919191]">
                {placeholder}
              </div>
              <div className="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 16L6 10H18L12 16Z" fill="#919191" />
                </svg>
              </div>
            </div>
          </div>
        ))}

        <div className="flex w-[180px] items-center justify-center rounded-[10px] bg-primary px-2.5 py-3">
          <div className="text-sm font-normal text-[#f5f7fb]">Cek Data</div>
        </div>
      </div>

      {/* Legend and Search */}
      <div className="flex w-full flex-wrap justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-[10px] p-3 outline outline-1 -outline-offset-1 outline-primary">
            <div className="text-xs text-primary">Cetak</div>
            <div data-svg-wrapper className="relative">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.75 1.5C13.1642 1.5 13.5 1.83579 13.5 2.25V5.25H15.75C16.1642 5.25 16.5 5.58579 16.5 6V13.5C16.5 13.9142 16.1642 14.25 15.75 14.25H13.5V15.75C13.5 16.1642 13.1642 16.5 12.75 16.5H5.25C4.83579 16.5 4.5 16.1642 4.5 15.75V14.25H2.25C1.83579 14.25 1.5 13.9142 1.5 13.5V6C1.5 5.58579 1.83579 5.25 2.25 5.25H4.5V2.25C4.5 1.83579 4.83579 1.5 5.25 1.5H12.75ZM12 12.75H6V15H12V12.75ZM15 6.75H3V12.75H4.5V12C4.5 11.5858 4.83579 11.25 5.25 11.25H12.75C13.1642 11.25 13.5 11.5858 13.5 12V12.75H15V6.75ZM6 7.5V9H3.75V7.5H6ZM12 3H6V5.25H12V3Z"
                  fill="#17A3B8"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center rounded-[10px] bg-[#ffc107]/10 px-4 py-3 outline outline-1 outline-offset-[-1px] outline-[#ffc107]/20">
            <span className="text-xs font-normal text-[#ffc107]">
              Sudah Cetak
            </span>
          </div>
          <div className="flex items-center rounded-[10px] bg-[#dc3545]/10 px-4 py-3 outline outline-1 outline-offset-[-1px] outline-[#dc3545]/20">
            <span className="text-xs font-normal text-[#dc3545]">
              Belum Cetak
            </span>
          </div>
        </div>
        <div className="flex w-full items-center gap-2 rounded-[10px] p-3 outline outline-1 outline-offset-[-1px] outline-primary sm:w-[300px]">
          <div className="flex-1 text-xs font-normal text-[#a7a7a7]">
            Ketik Nama, NPA
          </div>
          <div className="relative">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M13.5232 12.4626L16.7353 15.6746L15.6746 16.7353L12.4626 13.5232C11.3077 14.4472 9.843 15 8.25 15C4.524 15 1.5 11.976 1.5 8.25C1.5 4.524 4.524 1.5 8.25 1.5C11.976 1.5 15 4.524 15 8.25C15 9.843 14.4472 11.3077 13.5232 12.4626ZM12.0185 11.9061C12.9356 10.9609 13.5 9.6717 13.5 8.25C13.5 5.34937 11.1506 3 8.25 3C5.34937 3 3 5.34937 3 8.25C3 11.1506 5.34937 13.5 8.25 13.5C9.6717 13.5 10.9609 12.9356 11.9061 12.0185L12.0185 11.9061Z"
                fill="#A7A7A7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl overflow-x-scroll">
        <TableKta columns={columnsNonDtc} data={data} />
      </div>
      <div className="flex justify-end">
        <button
          className="mt-2 rounded bg-primary px-4 py-2 text-white"
          onClick={handleCetak}
        >
          Cetak
        </button>
      </div>
    </div>
  );
};

export default PrinterNonDtc;
