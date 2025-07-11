export interface ProvinsiData {
  id: number;
  kodeProvinsi: string;
  namaProvinsi: string;
}

export interface KabupatenData {
  id: number;
  kodeKabupaten: string;
  namaKabupaten: string;
}

export interface KecamatanData {
  id: number;
  kodeKecamatan: string;
  namaKecamatan: string;
}

export interface KelurahanData {
  id: number;
  kodeKelurahan: string;
  namaKelurahan: string;
}

export type WilayahData = ProvinsiData | KabupatenData | KecamatanData | KelurahanData;