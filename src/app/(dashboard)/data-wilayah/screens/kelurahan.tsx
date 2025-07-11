import { FC } from "react";
import { AddAndFilterWilayah } from "../components/addAndFilter";

interface kabupatenProps {}

export const Kelurahan: FC<kabupatenProps> = ({}) => {
  return (
    <div>
      <AddAndFilterWilayah wilayah="Kelurahan" />
    </div>
  );
};
