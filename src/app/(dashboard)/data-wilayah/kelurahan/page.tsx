"use client";

import { useEffect } from "react";
import { useWilayahStore } from "../store/wilayah-store";
import { WilayahScreen } from "../components/WilayahScreen";
import { DEFAULT_PARENT_CODES } from "../config/env";
import { kelurahanColumns } from "../table/kelurahanColumns";

export default function KelurahanPage() {
  const { setSelectedWilayah } = useWilayahStore();

  useEffect(() => {
    setSelectedWilayah("Desa/Kelurahan");
    return () => setSelectedWilayah(null);
  }, [setSelectedWilayah]);

  return (
    <WilayahScreen
      type="subdistricts"
      wilayahLabel="Desa/Kelurahan"
      parentCode={DEFAULT_PARENT_CODES.DISTRICT_FOR_SUBDISTRICTS}
      columns={kelurahanColumns}
      pageSize={10}
    />
  );
}
