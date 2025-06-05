// store/useWilayahStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Province {
  code: string;
  name: string;
}

interface WilayahState {
  provinces: Province[];
  kabupatenKota: Province[];
  kecamatan: Province[];
  kelurahan: Province[];
  selectedProvince: string;
  selectedKabupatenKota: string;
  selectedKecamatan: string;
  selectedKelurahan: string;
  error: string | null;
  setError: (msg: string | null) => void;
  fetchProvinces: () => Promise<void>;
  fetchKabupatenKota: () => Promise<void>;
  fetchKecamatan: () => Promise<void>;
  fetchKelurahan: () => Promise<void>;
  setSelectedProvince: (code: string) => void;
  setSelectedKabupatenKota: (code: string) => void;
  setSelectedKecamatan: (code: string) => void;
  setSelectedKelurahan: (code: string) => void;
}

export const useGetRegionStore = create<WilayahState>()(
  persist(
    (set, get) => ({
      provinces: [],
      kabupatenKota: [],
      kecamatan: [],
      kelurahan: [],
      selectedProvince: "",
      selectedKabupatenKota: "",
      selectedKecamatan: "",
      selectedKelurahan: "",
      error: null,
      setError: (msg) => set({ error: msg }),
      setSelectedProvince: (code) => set({ selectedProvince: code }),
      setSelectedKabupatenKota: (code) => set({ selectedKabupatenKota: code }),
      setSelectedKecamatan: (code) => set({ selectedKecamatan: code }),
      setSelectedKelurahan: (code) => set({ selectedKelurahan: code }),

      fetchProvinces: async () => {
        try {
          const res = await fetch("/api/provinces");
          if (!res.ok) throw new Error("Failed to fetch provinces");
          const data = await res.json();
          set({ provinces: data.data });
        } catch (e: any) {
          set({ error: e.message });
        }
      },

      fetchKabupatenKota: async () => {
        try {
          const res = await fetch(`/api/city/${get().selectedProvince}`);
          if (!res.ok) throw new Error("Failed to fetch city");
          const data = await res.json();
          set({ kabupatenKota: data.data });
        } catch (e: any) {
          set({ error: e.message });
        }
      },

      fetchKecamatan: async () => {
        try {
          const res = await fetch(
            `/api/district/${get().selectedKabupatenKota}`,
          );
          if (!res.ok) throw new Error("Failed to fetch district");
          const data = await res.json();
          set({ kecamatan: data.data });
        } catch (e: any) {
          set({ error: e.message });
        }
      },

      fetchKelurahan: async () => {
        try {
          const res = await fetch(
            `/api/subdistrict/${get().selectedKecamatan}`,
          );
          if (!res.ok) throw new Error("Failed to fetch subdistrict");
          const data = await res.json();
          set({ kelurahan: data.data });
        } catch (e: any) {
          set({ error: e.message });
        }
      },
    }),
    {
      name: "wilayah-storage",
      partialize: (state) => ({
        selectedProvince: state.selectedProvince,
        selectedKabupatenKota: state.selectedKabupatenKota,
        selectedKecamatan: state.selectedKecamatan,
        selectedKelurahan: state.selectedKelurahan,
      }),
    },
  ),
);
