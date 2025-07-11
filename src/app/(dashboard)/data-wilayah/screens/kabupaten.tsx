import { FC } from "react";
import { AddAndFilterWilayah } from "../components/addAndFilter";

interface kabupatenProps {}

export const Kabupaten: FC<kabupatenProps> = ({}) => {
  return (
    <div>
      <AddAndFilterWilayah wilayah="Kabupaten/Kota" />
    </div>
  );
};
