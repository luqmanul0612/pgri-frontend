"use client";

// components/MemberTable.tsx
import React, { useEffect, useState } from "react";
import Table from "./component/Table";
import { getMembers } from "./serverActions/member";
import { Filter } from "../components/Filter";
import { FilterByKeyword } from "../components/FilterByKeyword";
import { SearchInput } from "@/app/components/SearchInput";
import * as sea from "node:sea";
import { IMember } from "@/interfaces/IMemberResponse";

// test

const MemberTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterRegion, setFilterRegion] = useState<any>();
  const [filterByStatus, setFilterByStatus] = useState<string>('');
  return (
    <div className="space-y-4">
      <p className="font-semibold text-primary">Data Tabel Anggota PGRI</p>
      <Filter filterRegions={setFilterRegion}/>
      <div className="flex items-end justify-between">
        <p className="font-semibold text-primary">Semua Anggota</p>
        <div className="flex gap-4 items-center justify-center">
          <FilterByKeyword filterByStatusProps={setFilterByStatus} />
          <SearchInput onSearch={setSearchQuery} className="border border-primary" />
        </div>
      </div>
      <Table searchQuery={searchQuery} filterRegions={filterRegion} filterByStatus={filterByStatus}/>
    </div>
  );
};

export default MemberTable;
