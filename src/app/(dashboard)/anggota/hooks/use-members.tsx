/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import {
  getInstitution,
  GetMembersParams,
  getMembersV2,
  MemberItem,
} from "../serverActions/member";
import useQuery from "@/utils/hooks/use-query";
import {
  getLocation,
  getServiceOptions,
} from "@/app/(auth)/register/serverActions/get-register-form-data";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import {
  User,
  EllipsisVertical,
  Hand,
  PenLine,
  Eye,
  Check,
  X,
} from "lucide-react";
import dayjs from "dayjs";
import Whatsapp from "../../../../..//public/assets/whatsapp.svg";
import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { removeEmptyFields } from "@/utils/remove-empty-fields";
import useAuth from "@/store/useAuth";

export interface MemberFilters {
  province_id: string;
  city_id: string;
  district_id: string;
  employment_status_id: string;
}

const defaultValuesFilters: MemberFilters = {
  province_id: "",
  city_id: "",
  district_id: "",
  employment_status_id: "",
};

const initialPagination: PaginationState = {
  pageIndex: 0,
  pageSize: 10,
};

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

const defaultValuesParams = {
  q: "",
  province_id: "",
  city_id: "",
  district_id: "",
  employment_status_id: "",
  membership_status_id: "",
  gender: "",
  sort_by: "created_at",
  order: "desc",
};

const useMembers = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterByStatus, setFilterByStatus] = useState<string>("");
  const [filters, setFilters] = useState(defaultValuesFilters);
  const [pagination, setPagination] =
    useState<PaginationState>(initialPagination);
  const [params, setParams] = useState(defaultValuesParams);

  const institution = useQuery({
    queryKey: [user.level_id],
    queryFn: () => getInstitution(),
    onSuccess: (res) => {
      if ([4, 5, 6].includes(user.level_id)) {
        const province_id = res.data.province_id?.toString();
        const city_id = res.data.city_id?.toString();
        const district_id = res.data.district_id?.toString();
        setFilters((prev) => ({
          ...prev,
          province_id: [4, 5, 6].includes(user.level_id) ? province_id : "",
          city_id: [5, 6].includes(user.level_id) ? city_id : "",
          district_id: [6].includes(user.level_id) ? district_id : "",
        }));
        setParams((prev) => ({
          ...prev,
          province_id: [4, 5, 6].includes(user.level_id) ? province_id : "",
          city_id: [5, 6].includes(user.level_id) ? city_id : "",
          district_id: [6].includes(user.level_id) ? district_id : "",
        }));
      }
    },
  });

  const provinces = useQuery({
    queryFn: () => getLocation({ type: "provinces" }),
  });

  const cities = useQuery({
    queryKey: [filters.province_id],
    queryFn: () => getLocation({ type: "cities", id: filters.province_id }),
    enabled: !!filters.province_id,
  });

  const districts = useQuery({
    queryKey: [filters.city_id],
    queryFn: () => getLocation({ type: "districts", id: filters.city_id }),
    enabled: !!filters.city_id,
  });

  const employmentStatuses = useQuery({
    queryFn: () => getServiceOptions("employment-statuses"),
  });

  const members = useQuery({
    queryKey: [params, pagination],
    queryFn: () => {
      const newParams = {
        ...params,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      };
      return getMembersV2(removeEmptyFields(newParams));
    },
    enabled: !!institution.data?.ok,
  });

  const onClickApplyFilters = () => {
    setParams({
      ...params,
      province_id: filters.province_id,
      city_id: filters.city_id,
      district_id: filters.district_id,
      employment_status_id: filters.employment_status_id,
    });
    setPagination({ ...pagination, pageIndex: 0 });
  };

  const onChangeGender = (value: string) => {
    let gender = params.gender;
    if (!!gender && gender !== value) gender = value;
    else if (!!gender && gender === value) gender = "";
    else if (!gender) gender = value;
    setParams({ ...params, gender });
    setPagination({ ...pagination, pageIndex: 0 });
  };

  const onChangeSearch = (value: string) => {
    setParams({ ...params, q: value });
    setPagination({ ...pagination, pageIndex: 0 });
  };

  const columnHelper = createColumnHelper<MemberItem>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "no",
        header: "No",
        cell: (v) => {
          const { pageIndex, pageSize } = v.table.getState().pagination;
          const rowIndex = v.row.index;
          return pageIndex * pageSize + rowIndex + 1;
        },
      }),
      columnHelper.accessor("npa", {
        header: "NPA",
        meta: {
          style: { whiteSpace: "nowrap" },
        },
      }),
      columnHelper.accessor("nik", {
        header: "NIK",
        meta: {
          style: { whiteSpace: "nowrap" },
        },
      }),
      columnHelper.accessor("name", {
        header: "Nama Anggota",
        meta: {
          style: { minWidth: "200px" },
        },
      }),
      columnHelper.accessor("birth_place", {
        header: "Tempat Lahir",
        cell: (v) => v.getValue() || "-",
        meta: {
          style: { minWidth: "130px" },
        },
      }),
      columnHelper.accessor("birth_date", {
        header: "Tanggal Lahir",
        cell: (v) =>
          v.getValue() ? dayjs(v.getValue()).format("DD/MM/YYYY") : "-",
        meta: {
          style: { whiteSpace: "nowrap", minWidth: "130px" },
        },
      }),
      columnHelper.accessor("province", {
        header: "Provinsi",
        cell: (v) => v.getValue() || "-",
        meta: {
          style: { minWidth: "130px" },
        },
      }),
      columnHelper.accessor("member_photo", {
        header: "Foto",
        cell: (v) => {
          const validUrl = isValidUrl(v.getValue());
          return v.getValue() && validUrl ? (
            <div className="w-fit overflow-hidden rounded-[5px] border border-primary-500">
              <Image width={23} height={23} src={v.getValue()} alt="qr" />
            </div>
          ) : (
            <div className="flex h-[26px] w-[26px] items-center justify-center overflow-hidden rounded-[5px] border border-primary-500 bg-slate-300">
              <User className="h-[20px] w-[20px] text-white" />
            </div>
          );
        },
      }),
      columnHelper.accessor("qr", {
        header: "QR Code",
        cell: (v) =>
          v.getValue() ? (
            <div className="w-fit overflow-hidden rounded-[5px] border border-primary-500 p-[2px]">
              <Image width={20} height={20} src={v.getValue()} alt="qr" />
            </div>
          ) : (
            "-"
          ),
        meta: {
          style: { minWidth: "100px" },
        },
      }),
      columnHelper.accessor("phone_number", {
        header: "Whatsapp",
        cell: (v) => (
          <div className="flex justify-center">
            <a href={`https://wa.me/${v.getValue()}`} target="_blank">
              {v.getValue() ? <Whatsapp /> : "-"}
            </a>
          </div>
        ),
      }),
      columnHelper.accessor("membership_status", {
        header: "Status",
        cell: (v) => <StatusCell status={v.getValue()} />,
      }),
      columnHelper.accessor("id", {
        header: "Opsi",
        cell: (v) => <PopoverAction id={v.getValue().toString()} />,
      }),
    ],
    [],
  );

  const data = useMemo(() => members.data?.data?.data || [], [members.data]);

  const tableInstance = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    pageCount: members.data?.data?.pagination?.total_page || 1,
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return {
    onClickApplyFilters,
    searchQuery,
    setSearchQuery,
    filterByStatus,
    setFilterByStatus,
    filters,
    setFilters,
    params,
    setParams,
    provinces,
    cities,
    districts,
    onChangeGender,
    employmentStatuses,
    tableInstance,
    members,
    onChangeSearch,
    user,
  };
};

export default useMembers;

const PopoverAction = ({ id }: { id: string }) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="rounded-[5px] px-[3px] py-[2px] hover:bg-slate-200">
          <EllipsisVertical />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={5}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-lg animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
          side="bottom"
          align="end"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-[14px] font-semibold text-slate-800">Opsi</p>
            <Link href={`/anggota/${id}`} passHref>
              <button className="flex h-[42px] w-[100px] items-center justify-between gap-2 rounded-[8px] bg-green-500 p-[10px] text-[12px] font-normal text-white transition-all hover:bg-green-600 active:bg-green-500">
                Lihat <Eye className="h-[18px] w-[18px]" />
              </button>
            </Link>
            <Link href={`/anggota/edit/${id}`} passHref>
              <button className="flex h-[42px] w-[100px] items-center justify-between gap-2 rounded-[8px] bg-blue-500 p-[10px] text-[12px] font-normal text-white transition-all hover:bg-blue-600 active:bg-blue-500">
                Ubah <PenLine className="h-[18px] w-[18px]" />
              </button>
            </Link>
            <button className="flex h-[42px] w-[100px] items-center justify-between gap-2 rounded-[8px] bg-red-500 p-[10px] text-[12px] font-normal text-white transition-all hover:bg-red-600 active:bg-red-500">
              Tindakan <Hand className="h-[18px] w-[18px]" />
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const StatusCell = ({ status }: { status: string }) => {
  return (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="flex justify-center">
            {status === "Aktif" ? (
              <div className="color-white w-fit rounded-full bg-primary-500 p-[2px]">
                <Check className="h-[15px] w-[15px] text-white" />
              </div>
            ) : (
              <div className="color-white w-fit rounded-full bg-red-500 p-[2px]">
                <X className="h-[15px] w-[15px] text-white" />
              </div>
            )}
          </div>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            className={cn(
              "rounded-md bg-white px-3 py-1 text-sm shadow-lg data-[state=closed]:duration-150 data-[state=open]:duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
              {
                "text-primary-500": status === "Aktif",
                "text-red-500": status !== "Aktif",
              },
            )}
          >
            {status === "Aktif"
              ? "Sudah Diververifikasi"
              : "Belum Diververifikasi"}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
