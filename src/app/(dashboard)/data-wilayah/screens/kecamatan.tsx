import { FC } from "react";
import { AddAndFilterWilayah } from "../components/addAndFilter";

interface kabupatenProps {}

export const Kecamatan: FC<kabupatenProps> = ({}) => {
  return (
    <div>
      <AddAndFilterWilayah wilayah="Kecamatan" />
    </div>
  );
};
