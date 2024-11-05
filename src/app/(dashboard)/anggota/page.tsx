// components/MemberTable.tsx
import React from "react";
import Table from "./component/Table";
import { getMembers } from "./serverActions/member";
import { Filter } from "../components/Filter";
import { FilterByKeyword } from "../components/FilterByKeyword";
import { SearchInput } from "@/app/components/SearchInput";

// test

const MemberTable: React.FC = async () => {
  return (
    <div className="space-y-4">
      <p className="font-semibold text-primary">Data Tabel Anggota PGRI</p>
      <Filter />
      <div className="flex items-end justify-between">
        <p className="font-semibold text-primary">Semua Anggota</p>
        <div className="flex gap-4">
          <FilterByKeyword />
          <SearchInput className="border border-primary" />
        </div>
      </div>
      <Table />
    </div>
  );
};

export default MemberTable;
