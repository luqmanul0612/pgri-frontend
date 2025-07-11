import { FC } from "react";
import { AddAndFilterWilayah } from "../components/addAndFilter";
import { DataTable } from "@/components/table/DataTable";
import { provinsiColumns } from "../table/columns";
import { provinsiDummyData } from "../dummyData/provinsi";

interface provinsiProps {}

export const Provinsi: FC<provinsiProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4">
      <AddAndFilterWilayah wilayah="Provinsi" />
      <DataTable 
        data={provinsiDummyData}
        columns={provinsiColumns}
        pageSize={10}
        paginationLabel="Provinsi"
      />
    </div>
  );
};
