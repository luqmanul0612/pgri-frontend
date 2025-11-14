"use client";

import { useEffect } from "react";
import { useWilayahStore } from "../store/wilayah-store";
import { WilayahScreen } from "../components/WilayahScreen";
import { DEFAULT_PARENT_CODES } from "../config/env";
import { kecamatanColumns } from "../table/kecamatanColumns";

export default function KecamatanPage() {
  const { setSelectedWilayah } = useWilayahStore();

  useEffect(() => {
    setSelectedWilayah("Kecamatan");
    return () => setSelectedWilayah(null);
  }, [setSelectedWilayah]);

  return (
    <WilayahScreen
      type="districts"
      wilayahLabel="Kecamatan"
      parentCode={DEFAULT_PARENT_CODES.CITY_FOR_DISTRICTS}
      columns={kecamatanColumns}
      pageSize={10}
    />
  );
}
