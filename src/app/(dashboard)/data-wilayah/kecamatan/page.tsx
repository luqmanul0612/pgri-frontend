"use client";

import { Kecamatan } from "../screens/kecamatan";
import { useEffect } from "react";
import { useWilayahStore } from "../store/wilayah-store";

export default function KecamatanPage() {
  const { setSelectedWilayah } = useWilayahStore();

  useEffect(() => {
    setSelectedWilayah("Kecamatan");
    return () => setSelectedWilayah(null);
  }, [setSelectedWilayah]);

  return <Kecamatan />;
}