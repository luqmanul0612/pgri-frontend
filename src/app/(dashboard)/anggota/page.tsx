"use client";

import React, { useState } from "react";
import Table from "./component/Table";
import { GetMembersParams } from "./serverActions/member";
import { Filter } from "../components/Filter";
import { FilterByKeyword } from "../components/FilterByKeyword";
import { SearchInput } from "@/app/components/SearchInput";
import useQuery from "@/utils/hooks/use-query";
import {
  getLocation,
  getServiceOptions,
} from "@/app/(auth)/register/serverActions/get-register-form-data";
import Select from "@/components/customs/select";
import Button from "@/components/customs/button";

const defaultValuesFilters: GetMembersParams = {
  q: "",
  page: 1,
  limit: 20,
  province_id: "",
  city_id: "",
  district_id: "",
  employment_status_id: "",
  membership_status_id: "",
  gender: "",
  sort_by: "",
  order: "",
};

const MemberTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterByStatus, setFilterByStatus] = useState<string>("");
  const [tempFilters, setTempFilters] =
    useState<GetMembersParams>(defaultValuesFilters);
  const [filters, setFilters] =
    useState<GetMembersParams>(defaultValuesFilters);

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

  const onClickApply = () => {
    setFilters({
      ...filters,
      province_id: tempFilters.province_id,
      city_id: tempFilters.city_id,
      district_id: tempFilters.district_id,
      employment_status_id: tempFilters.employment_status_id,
    });
  };

  return (
    <div className="space-y-4">
      <p className="font-semibold text-primary">Data Tabel Anggota PGRI</p>
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
        <Button className="!h-[44px]" onClick={onClickApply}>Cek Data</Button>
      </div>
      <div className="flex items-end justify-between">
        <p className="font-semibold text-primary">Semua Anggota</p>
        <div className="flex items-center justify-center gap-4">
          <FilterByKeyword filterByStatusProps={setFilterByStatus} />
          <SearchInput
            onSearch={setSearchQuery}
            className="border border-primary"
          />
        </div>
      </div>
      <Table
        searchQuery={searchQuery}
        filterByStatus={filterByStatus}
        filters={filters}
      />
    </div>
  );
};

export default MemberTable;
