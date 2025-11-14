export interface ProvinsiData {
  id: number;
  code: string;
  name: string;
}

export interface KabupatenData {
  id: number;
  code: string;
  name: string;
}

export interface KecamatanData {
  id: number;
  code: string;
  name: string;
}

export interface KelurahanData {
  id: number;
  code: string;
  name: string;
}

export type WilayahData = ProvinsiData | KabupatenData | KecamatanData | KelurahanData;