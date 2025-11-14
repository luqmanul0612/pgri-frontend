"use client";

import { Provinsi } from "../screens/provinsi";
import { useEffect } from "react";
import { useWilayahStore } from "../store/wilayah-store";

export default function ProvinsiPage() {
  const { setSelectedWilayah } = useWilayahStore();

  useEffect(() => {
    setSelectedWilayah("Provinsi");
    return () => setSelectedWilayah(null);
  }, [setSelectedWilayah]);

  return <Provinsi />;
}