import { FC } from "react";
import { AddAndFilterWilayah } from "../components/addAndFilter";
import { DataTable } from "@/components/table/DataTable";
import { kelurahanColumns } from "../table/kelurahanColumns";
import { kelurahanDummyData } from "../dummyData/kelurahan";

interface kelurahanProps {}

export const Kelurahan: FC<kelurahanProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4">
      <AddAndFilterWilayah wilayah="Kelurahan" />
      <DataTable 
        data={kelurahanDummyData}
        columns={kelurahanColumns}
        pageSize={10}
        paginationLabel="Kelurahan"
      />
    </div>
  );
};
