import { FC } from "react";
import { AddAndFilterWilayah } from "../components/addAndFilter";
import { DataTable } from "@/components/table/DataTable";
import { kecamatanColumns } from "../table/kecamatanColumns";
import { kecamatanDummyData } from "../dummyData/kecamatan";

interface kecamatanProps {}

export const Kecamatan: FC<kecamatanProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4">
      <AddAndFilterWilayah wilayah="Kecamatan" />
      <DataTable 
        data={kecamatanDummyData}
        columns={kecamatanColumns}
        pageSize={10}
        paginationLabel="Kecamatan"
      />
    </div>
  );
};
