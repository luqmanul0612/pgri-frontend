import { FC } from "react";
import { AddAndFilterWilayah } from "../components/addAndFilter";
import { DataTable } from "@/components/table/DataTable";
import { kabupatenColumns } from "../table/kabupatenColumns";
import { kabupatenDummyData } from "../dummyData/kabupaten";

interface kabupatenProps {}

export const Kabupaten: FC<kabupatenProps> = ({}) => {
  return (
    <div className="flex flex-col gap-4">
      <AddAndFilterWilayah wilayah="Kabupaten/Kota" />
      <DataTable 
        data={kabupatenDummyData}
        columns={kabupatenColumns}
        pageSize={10}
        paginationLabel="Kabupaten/Kota"
      />
    </div>
  );
};
