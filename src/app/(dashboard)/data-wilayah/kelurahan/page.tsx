"use client";

import { Kelurahan } from "../screens/kelurahan";
import { useEffect } from "react";
import { useWilayahStore } from "../store/wilayah-store";

export default function KelurahanPage() {
  const { setSelectedWilayah } = useWilayahStore();

  useEffect(() => {
    setSelectedWilayah("Desa/Kelurahan");
    return () => setSelectedWilayah(null);
  }, [setSelectedWilayah]);

  return <Kelurahan />;
}