"use client";

import Select from "@/components/customs/select";
import Button from "@/components/customs/button";
import useMembers from "./hooks/use-members";
import { FC } from "react";
import TextField from "@/components/customs/textfield";
import { Search, Printer } from "lucide-react";
import GenderButton from "./component/gender-button";
import Table from "@/components/customs/table";
import TablePagination from "@/components/customs/table-pagination";

const MemberTable: FC = () => {
  const {
    provinces,
    cities,
    districts,
    employmentStatuses,
    filters,
    setFilters,
    onClickApplyFilters,
    onChangeGender,
    tableInstance,
    params,
    onChangeSearch,
    members,
    user,
  } = useMembers();

  return (
    <div className="flex flex-col gap-5">
      <p className="text-base font-semibold text-primary">
        Data Tabel Anggota PGRI
      </p>
      <div className="flex w-full items-end gap-4 rounded-[16px] border border-primary-100 bg-white p-4">
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          <Select
            getKey={(v) => v.id.toString()}
            getLabel={(v) => v.name}
            label="Provinsi"
            placeholder="Pilih Provinsi"
            options={provinces.data?.data || []}
            isLoading={provinces.isLoading}
            onChange={(v) => {
              setFilters({
                ...filters,
                province_id: v,
                city_id: "",
                district_id: "",
              });
            }}
            value={filters.province_id}
            disabled={[4, 5, 6].includes(user.level_id)}
          />
          <Select
            getKey={(v) => v.id.toString()}
            getLabel={(v) => v.name}
            label="Kabupaten/Kota"
            placeholder="Pilih Kabupaten/Kota"
            options={cities.data?.data || []}
            isLoading={cities.isFetching}
            onChange={(v) => {
              setFilters({ ...filters, city_id: v, district_id: "" });
            }}
            value={filters.city_id}
            disabled={!filters.province_id || [5, 6].includes(user.level_id)}
          />
          <Select
            getKey={(v) => v.id.toString()}
            getLabel={(v) => v.name}
            label="Kecamatan"
            placeholder="Pilih Kecamatan"
            options={districts.data?.data || []}
            isLoading={districts.isFetching}
            onChange={(v) => {
              setFilters({ ...filters, district_id: v });
            }}
            value={filters.district_id}
            disabled={!filters.city_id || [6].includes(user.level_id)}
          />
          <Select
            getKey={(v) => v.id.toString()}
            getLabel={(v) => v.name}
            label="Status Kepegawaian"
            placeholder="Pilih Status Kepegawaian"
            options={employmentStatuses?.data?.data || []}
            isLoading={employmentStatuses.isLoading}
            onChange={(v) => {
              setFilters({ ...filters, employment_status_id: v });
            }}
            value={filters.employment_status_id}
          />
        </div>
        <Button type="button" onClick={onClickApplyFilters}>
          Cek Data
        </Button>
      </div>
      <p className="text-base font-semibold text-primary">Semua Anggota</p>
      <div className="flex w-full flex-col items-end gap-4 rounded-[16px] border border-primary-100 bg-white">
        <div className="flex w-full flex-wrap justify-between gap-4 p-4">
          <div className="flex gap-4">
            <Button variant="secondary">Tambah Anggota</Button>
            <Button
              variant="secondary"
              endIcon={<Printer className="w-[20px]" />}
            >
              Cetak
            </Button>
          </div>
          <div className="flex gap-4">
            <GenderButton
              variant="M"
              checked={["M", "ALL"].includes(params.gender)}
              onClick={() => onChangeGender("M")}
            >
              Laki-Laki: {members.data?.data?.counter?.M || 0}
            </GenderButton>
            <GenderButton
              variant="F"
              checked={["F", "ALL"].includes(params.gender)}
              onClick={() => onChangeGender("F")}
            >
              Perempuan: {members.data?.data?.counter?.F || 0}
            </GenderButton>
            <TextField
              placeholder="Ketik Nama, NPA"
              endIcon={<Search className="w-[20px] text-slate-400" />}
              className="w-[300px]"
              onChange={(e) => {
                onChangeSearch(e.target.value);
              }}
              value={params.q}
            />
          </div>
        </div>
        <div className="flex w-full flex-col">
          <Table
            tableInstance={tableInstance}
            isLoading={members.isLoading || members.isFetching}
          />
          <div className="px-4 py-3">
            <TablePagination tableInstance={tableInstance} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberTable;
