"use client";

import { WilayahScreen } from "../components/WilayahScreen";
import { provinsiColumns } from "../table/columns";

export default function ProvinsiPage() {
  return (
    <WilayahScreen
      type="provinces"
      wilayahLabel="Provinsi"
      columns={provinsiColumns}
      pageSize={10}
    />
  );
}
