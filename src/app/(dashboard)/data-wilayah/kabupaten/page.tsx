"use client";

import { useEffect } from "react";
import { useWilayahStore } from "../store/wilayah-store";
import { WilayahScreen } from "../components/WilayahScreen";
import { DEFAULT_PARENT_CODES } from "../config/env";
import { kabupatenColumns } from "../table/kabupatenColumns";

export default function KabupatenPage() {
  const { setSelectedWilayah } = useWilayahStore();

  useEffect(() => {
    setSelectedWilayah("Kabupaten/Kota");
    return () => setSelectedWilayah(null);
  }, [setSelectedWilayah]);

  return (
    <WilayahScreen
      type="cities"
      wilayahLabel="Kabupaten/Kota"
      parentCode={DEFAULT_PARENT_CODES.PROVINCE_FOR_CITIES}
      columns={kabupatenColumns}
      pageSize={10}
    />
  );
}
