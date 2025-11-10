import React, { FC, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { PrinterDtcProps } from "./types";
import { createColumns } from "./columns";
import { sampleData } from "./data";
import { Checkbox } from "../../icons/checkbox";
import { CardTypeDialog } from "../../CardTypeDialog";
import { ktaPrintService } from "@/services/kta-print";

const PrinterDtc: FC<PrinterDtcProps> = ({ onBack }) => {
  const [data, setData] = useState(sampleData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setData((prev) => prev.map((row) => ({ ...row, selected: checked })));
  };

  const handleSelectRow =
    (rowId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setData((prev) =>
        prev.map((row) =>
          row.id === rowId ? { ...row, selected: checked } : row,
        ),
      );
    };

  const handleCardTypeSelect = async (cardType: "CR80" | "CR79") => {
    const selectedData = data.filter((row) => row.selected);

    // Validasi minimal 1 KTA dipilih
    if (selectedData.length === 0) {
      alert("Pilih minimal 1 KTA untuk dicetak");
      return;
    }

    // Konfirmasi sebelum cetak multiple
    const confirmMessage = `Anda akan mencetak ${selectedData.length} KTA dengan tipe ${cardType}. Lanjutkan?`;
    if (!confirm(confirmMessage)) {
      return;
    }

    setIsLoading(true);

    try {
      // Transform data ke format yang dibutuhkan KTAGeneratorOptions
      const ktaOptions = selectedData.map((item) => ({ data: item, cardType }));

      await ktaPrintService.printMultipleKTA(ktaOptions);

      // Update status cetak setelah berhasil
      setData((prev) =>
        prev.map((row) =>
          row.selected
            ? { ...row, selected: false, status: "active" as const }
            : row,
        ),
      );
    } catch (error) {
      console.error("Failed to print multiple KTA:", error);

      let errorMessage = "Gagal mencetak KTA. ";
      if (error instanceof Error) {
        if (error.message.includes("popup")) {
          errorMessage += "Silakan aktifkan popup untuk browser ini.";
        } else if (error.message.includes("template")) {
          errorMessage += "Template kartu tidak dapat dimuat.";
        } else {
          errorMessage += "Silakan coba lagi.";
        }
      }
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const columnsWithSelection = createColumns(
    data,
    handleSelectAll,
    handleSelectRow,
    Checkbox,
  );
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Header */}
      <div
        className="flex cursor-pointer items-center gap-2.5"
        onClick={onBack}
      >
        <div className="relative cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
              fill="#17191C"
            />
          </svg>
        </div>
        <div className="text-base font-semibold text-[#17191c]">
          Data Tabel Cetak KTA Dengan Printer DTC
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex w-full flex-wrap items-end gap-4 rounded-2xl bg-white p-4 outline outline-1 outline-offset-[-1px] outline-[#17a3b8]/20">
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

        <div className="flex w-[180px] items-center justify-center rounded-[10px] bg-[#17a3b8] px-2.5 py-3">
          <div className="text-sm font-normal text-[#f5f7fb]">Cek Data</div>
        </div>
      </div>

      {/* Legend and Search */}
      <div className="flex w-full flex-wrap justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <CardTypeDialog
            onCardTypeSelect={handleCardTypeSelect}
            disabled={isLoading}
          >
            <button
              disabled={isLoading}
              className={`inline-flex items-center gap-2 rounded-[10px] p-3 outline outline-1 -outline-offset-1 transition-colors ${
                data.filter((row) => row.selected).length > 0 && !isLoading
                  ? "cursor-pointer bg-[#17a3b8] text-white outline-[#17a3b8] hover:bg-[#17a3b8]/90"
                  : "cursor-not-allowed bg-transparent text-[#17a3b8] opacity-50 outline-[#17a3b8]"
              }`}
            >
              <div className="text-xs font-medium">
                {isLoading
                  ? "Mencetak..."
                  : `Cetak ${data.filter((row) => row.selected).length > 0 ? `(${data.filter((row) => row.selected).length})` : ""}`}
              </div>
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
                    fill="currentColor"
                  />
                </svg>
              </div>
            </button>
          </CardTypeDialog>

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
        <div className="flex w-full items-center gap-2 rounded-[10px] p-3 outline outline-1 outline-offset-[-1px] outline-[#17a3b8] sm:w-[300px]">
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

      {/* Table */}
      <div className="w-full max-w-7xl overflow-x-scroll">
        <DataTable
          data={data}
          columns={columnsWithSelection}
          pageSize={10}
          paginationLabel="Orang"
        />
      </div>
    </div>
  );
};

export default PrinterDtc;
