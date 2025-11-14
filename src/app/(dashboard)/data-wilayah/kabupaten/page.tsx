"use client";

import { Kabupaten } from "../screens/kabupaten";
import { useEffect } from "react";
import { useWilayahStore } from "../store/wilayah-store";

export default function KabupatenPage() {
  const { setSelectedWilayah } = useWilayahStore();

  useEffect(() => {
    setSelectedWilayah("Kabupaten/Kota");
    return () => setSelectedWilayah(null);
  }, [setSelectedWilayah]);

  return <Kabupaten />;
}