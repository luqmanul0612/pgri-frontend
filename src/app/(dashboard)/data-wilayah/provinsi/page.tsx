"use client";

import { useEffect } from "react";
import { useWilayahStore } from "../store/wilayah-store";
import { WilayahScreen } from "../components/WilayahScreen";
import { provinsiColumns } from "../table/columns";

export default function ProvinsiPage() {
  const { setSelectedWilayah } = useWilayahStore();

  useEffect(() => {
    setSelectedWilayah("Provinsi");
    return () => setSelectedWilayah(null);
  }, [setSelectedWilayah]);

  return (
    <WilayahScreen
      type="provinces"
      wilayahLabel="Provinsi"
      columns={provinsiColumns}
      pageSize={10}
    />
  );
}
