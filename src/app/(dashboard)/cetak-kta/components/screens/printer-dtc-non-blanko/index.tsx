"use client";
import { FC, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { PrinterDtcProps } from "./types";
import { createColumns } from "./columns";
import { Checkbox } from "../../icons/checkbox";
import { CardTypeDialog } from "../../CardTypeDialog";
import { ktaPrintService } from "@/services/kta-print";
import {
  getMembersV2,
  GetMembersParams,
  MemberItem,
} from "../../../../anggota/serverActions/member";
import { IMember } from "@/interfaces/IMemberResponse";
import { CetakKtaTableData } from "./types";
import { toast } from "sonner";
import useQuery from "@/utils/hooks/use-query";
import {
  getLocation,
  getServiceOptions,
} from "@/app/(auth)/register/serverActions/get-register-form-data";
import Select from "@/components/customs/select";
import Button from "@/components/customs/button";
import { DataTablePagination } from "@/components/ui/data-table-pagination";

const defaultParams: GetMembersParams = {
  q: "",
  page: 1,
  limit: 10,
  province_id: "",
  city_id: "",
  district_id: "",
  employment_status_id: "",
  membership_status_id: "1", // Filter only verified members
  gender: "",
  sort_by: "created_at",
  order: "desc",
};

const PrinterDtcNonBlanko: FC<PrinterDtcProps> = ({ onBack }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State management
  const [data, setData] = useState<CetakKtaTableData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChangingPage, setIsChangingPage] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [tempFilters, setTempFilters] =
    useState<GetMembersParams>(defaultParams);

  // URL sync - get current params from URL
  const currentParams: GetMembersParams = {
    q: searchParams.get("q") || "",
    page: parseInt(searchParams.get("page") || "1"),
    limit: parseInt(searchParams.get("limit") || "10"),
    province_id: searchParams.get("province_id") || "",
    city_id: searchParams.get("city_id") || "",
    district_id: searchParams.get("district_id") || "",
    employment_status_id: searchParams.get("employment_status_id") || "",
    membership_status_id: searchParams.get("membership_status_id") || "1",
    gender: searchParams.get("gender") || "",
    sort_by: searchParams.get("sort_by") || "created_at",
    order: searchParams.get("order") || "desc",
  };

  // Update URL with new params
  const updateURL = (newParams: Partial<GetMembersParams>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== defaultParams[key as keyof GetMembersParams]) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  // Transform IMember to CetakKtaTableData
  const transformMemberToKtaData = (member: MemberItem): CetakKtaTableData => ({
    id: Number(member.id),
    npa: member.npa || "",
    nik: member.nik || "",
    namaAnggota: member.name || "",
    tempatLahir: member.birth_place || "",
    tanggalLahir: member.birth_place || "",
    agama: "", // Field tidak ada di IMember, default empty
    foto: member.profile,
    qrCode: member.qr,
    cetakKtaBiasa: false,
    cetakKtaMultiPayment: false,
    status: member.membership_status === "Aktif" ? "active" : "inactive",
    selected: false,
  });

  // Fetch data
  const fetchData = async (isPageChange = false) => {
    // Only set loading to true if it's not already loading
    if (!isLoading) {
      setIsLoading(true);
      if (isPageChange) {
        setIsChangingPage(true);
      }
    }

    try {
      const result = await getMembersV2(currentParams);
      const transformedData = (result.data?.data || []).map(transformMemberToKtaData);
      setData(transformedData);

      // Extract total data and pagination info
      const pagination = result.data?.pagination;
      const totalPages =
        pagination?.total_page ||
        Math.ceil((result.data?.pagination?.total_items || 0) / currentParams.limit);
      const totalItems = result.data?.pagination?.total_items || pagination?.total_items || 0;

      setTotalData(totalItems);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Gagal memuat data");
      setData([]);
      setTotalData(0);
    } finally {
      setIsLoading(false);
      setIsChangingPage(false);
    }
  };

  // Data fetching
  useEffect(() => {
    fetchData();
  }, [searchParams]);

  // Location data for filters
  const provinces = useQuery({
    queryFn: () => getLocation({ type: "provinces" }),
  });

  const cities = useQuery({
    queryKey: [tempFilters.province_id],
    queryFn: () => getLocation({ type: "cities", id: tempFilters.province_id }),
    enabled: !!tempFilters.province_id,
  });

  const districts = useQuery({
    queryKey: [tempFilters.city_id],
    queryFn: () => getLocation({ type: "districts", id: tempFilters.city_id }),
    enabled: !!tempFilters.city_id,
  });

  const employmentStatuses = useQuery({
    queryFn: () => getServiceOptions("employment-statuses"),
  });

  // Table handlers
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

    if (selectedData.length === 0) {
      toast.error("Pilih minimal 1 KTA untuk dicetak");
      return;
    }

    const confirmMessage = `Anda akan mencetak ${selectedData.length} KTA Non-Blanko dengan tipe ${cardType}. Lanjutkan?`;
    if (!confirm(confirmMessage)) {
      return;
    }

    setIsLoading(true);

    try {
      // Transform data to format needed for KTAGeneratorOptions
      const ktaOptions = selectedData.map((item) => ({
        data: { ...item },
        cardType,
      }));

      await ktaPrintService.printMultipleKTANonBlanko(ktaOptions);

      setData((prev) =>
        prev.map((row) => (row.selected ? { ...row, selected: false } : row)),
      );

      toast.success("KTA Non-Blanko berhasil dicetak");
    } catch (error) {
      console.error("Failed to print multiple KTA Non-Blanko:", error);

      let errorMessage = "Gagal mencetak KTA Non-Blanko. ";
      if (error instanceof Error) {
        if (error.message.includes("popup")) {
          errorMessage += "Silakan aktifkan popup untuk browser ini.";
        } else if (error.message.includes("template")) {
          errorMessage += "Template kartu tidak dapat dimuat.";
        } else {
          errorMessage += "Silakan coba lagi.";
        }
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter handlers
  const onClickApply = () => {
    updateURL({
      province_id: tempFilters.province_id,
      city_id: tempFilters.city_id,
      district_id: tempFilters.district_id,
      employment_status_id: tempFilters.employment_status_id,
    });
  };

  const handleSearch = (query: string) => {
    // For search, add a small delay to avoid too many requests while typing
    const timeoutId = setTimeout(() => {
      updateURL({ q: query, page: 1 });
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const columnsWithSelection = createColumns(
    data,
    handleSelectAll,
    handleSelectRow,
    Checkbox,
  );

  // Calculate pagination values
  const currentPage = currentParams.page - 1;
  const pageSize = currentParams.limit;
  const totalPages = Math.ceil(totalData / pageSize) || 1;
  const startIndex = currentPage * pageSize + 1;
  const endIndex = Math.min((currentPage + 1) * pageSize, totalData);

  // Create table instance with manual pagination
  const table = useReactTable({
    data,
    columns: columnsWithSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // Use manual pagination
    pageCount: totalPages,
    state: {
      pagination: {
        pageSize,
        pageIndex: currentPage,
      },
    },
  });

  // Handle pagination changes
  const handlePageChange = (newPageIndex: number) => {
    // Set loading state immediately for better UX
    setIsChangingPage(true);
    setIsLoading(true);
    updateURL({ page: newPageIndex + 1 });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    // Set loading state immediately for better UX
    setIsChangingPage(true);
    setIsLoading(true);
    updateURL({ limit: newPageSize, page: 1 });
  };

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
          Data Tabel Cetak KTA Dengan Printer DTC Tanpa Blanko
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex w-full flex-wrap items-end gap-4 rounded-2xl bg-white p-4 outline outline-1 outline-offset-[-1px] outline-[#17a3b8]/20">
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          <Select
            getKey={(v) => v.id.toString()}
            getLabel={(v) => v.name}
            label="Provinsi"
            placeholder="Pilih Provinsi"
            options={provinces.data?.data || []}
            isLoading={provinces.isLoading}
            onChange={(v) => {
              setTempFilters({
                ...tempFilters,
                province_id: v,
                city_id: "",
                district_id: "",
              });
            }}
            value={tempFilters.province_id}
          />
          <Select
            getKey={(v) => v.id.toString()}
            getLabel={(v) => v.name}
            label="Kabupaten/Kota"
            placeholder="Pilih Kabupaten/Kota"
            options={cities.data?.data || []}
            isLoading={cities.isFetching}
            onChange={(v) => {
              setTempFilters({
                ...tempFilters,
                city_id: v,
                district_id: "",
              });
            }}
            value={tempFilters.city_id}
            disabled={!tempFilters.province_id}
          />
          <Select
            getKey={(v) => v.id.toString()}
            getLabel={(v) => v.name}
            label="Kecamatan"
            placeholder="Pilih Kecamatan"
            options={districts.data?.data || []}
            isLoading={districts.isFetching}
            onChange={(v) => {
              setTempFilters({
                ...tempFilters,
                district_id: v,
              });
            }}
            value={tempFilters.district_id}
            disabled={!tempFilters.city_id}
          />
          <Select
            getKey={(v) => v.id.toString()}
            getLabel={(v) => v.name}
            label="Status Kepegawaian"
            placeholder="Pilih Status Kepegawaian"
            options={employmentStatuses?.data?.data || []}
            isLoading={employmentStatuses.isLoading}
            onChange={(v) => {
              setTempFilters({
                ...tempFilters,
                employment_status_id: v,
              });
            }}
            value={tempFilters.employment_status_id}
          />
        </div>
        <Button className="!h-[44px]" onClick={onClickApply}>
          Cek Data
        </Button>
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
          <input
            type="text"
            placeholder="Ketik Nama, NPA"
            className="flex-1 bg-transparent text-xs font-normal outline-none"
            value={currentParams.q}
            onChange={(e) => handleSearch(e.target.value)}
          />
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

      {/* Table Container */}
      <div className="w-full max-w-7xl relative">
        {/* Loading Overlay */}
        {(isLoading || isChangingPage) && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl transition-opacity duration-200">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#17a3b8] border-t-transparent"></div>
              <span className="text-sm font-medium text-gray-700">
                Memuat Data...
              </span>
            </div>
          </div>
        )}
        <div className="overflow-x-scroll rounded-2xl bg-white outline outline-1 outline-offset-[-1px] outline-[#17a3b8]/20">
          <table className="w-full table-auto">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="bg-[#17a3b8] px-4 py-3 text-left text-sm font-semibold text-white"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {!isLoading && table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2 text-xs">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                !isLoading && (
                  <tr>
                    <td
                      colSpan={columnsWithSelection.length}
                      className="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      Tidak ada data yang tersedia
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Professional Pagination Component */}
        <DataTablePagination
          currentPage={currentPage + 1}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalData}
          onPageChange={(page) => handlePageChange(page - 1)}
          onPageSizeChange={handlePageSizeChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default PrinterDtcNonBlanko;
