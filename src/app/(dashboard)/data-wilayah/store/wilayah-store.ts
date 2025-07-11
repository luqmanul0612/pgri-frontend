import { create } from "zustand";

export const wilayah = [
  "Provinsi",
  "Kabupaten/Kota",
  "Kecamatan",
  "Desa/Kelurahan",
] as const;

export type Wilayah = (typeof wilayah)[number];

export type WilayahStore = {
  selectedWilayah: Wilayah | null;
  setSelectedWilayah: (wilayah: Wilayah | null) => void;
  deleteSelectedWilayah: VoidFunction;
};

export const useWilayahStore = create<WilayahStore>((set) => ({
  selectedWilayah: null,
  setSelectedWilayah: (wilayah) => set({ selectedWilayah: wilayah }),
  deleteSelectedWilayah: () => set({ selectedWilayah: null }),
}));
