// Konfigurasi tipe wilayah yang tersedia
export const wilayah = [
  "Provinsi",
  "Kabupaten",
  "Kecamatan",
  "Kelurahan",
] as const;

export type Wilayah = (typeof wilayah)[number];
