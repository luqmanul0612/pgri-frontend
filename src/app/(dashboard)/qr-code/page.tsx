"use client";

import Image from "next/image";
import { useState } from "react";
import qrIllustration from "./assets/qrIllustration.png";
import { Scan } from "./screens/scan";
import { Combobox } from "@/components/ui/combobox";

export default function Page() {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const activities = [
    { value: "pengecekan-kta-anggota", label: "Pengecekan KTA Anggota" },
    {
      value: "webinar-pgri-pentingnya-pemahaman-teknologi-untuk-guru-vol-1",
      label: "Webinar PGRI “Pentingnya Pemahaman Teknologi Untuk Guru Vol.1”",
    },
    {
      value: "pelatihan-khusus-tenaga-it-pgri-banyumas",
      label: "Pelatihan khusus tenaga IT PGRI Banyumas",
    },
    {
      value: "rapimnas-rapat-pimpinan-nasional-pgri",
      label: "RAPIMNAS (Rapat Pimpinan Nasional) PGRI",
    },
    { value: "kegiatan-pgri-pusat", label: "Kegiatan PGRI Pusat" },
    { value: "kegiatan-pgri-provinsi", label: "Kegiatan PGRI Provinsi" },
    {
      value: "kegiatan-pgri-daerah-kecamatan",
      label: "Kegiatan PGRI Daerah/Kecamatan",
    },
    {
      value: "rapat-kordinasi-pgri-jawa-tengah",
      label: "Rapat Kordinasi PGRI Jawa Tengah",
    },
  ];

  function handleSubmit() {
    setIsScanning(true);
  }

  function handleBackToMain() {
    setIsScanning(false);
  }

  if (isScanning) return <Scan onBackToMain={handleBackToMain} selectedActivity={selectedActivity} activities={activities} />;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-9">
        <Image
          src={qrIllustration}
          width={128}
          height={128}
          alt="qrIllustration"
        />

        <div className="w-full max-w-2xl space-y-3 text-center sm:space-y-4">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
            Scan QR Code KTA
          </h1>
          <p className="text-sm leading-relaxed text-gray-700 sm:text-base lg:text-lg">
            Halaman ini dapat digunakan oleh admin untuk Pengecekan KTA Anggota
            dan Absensi Kegiatan yang dilakukan baik oleh PGRI Pusat, Provinsi
            ataupun Daerah.
          </p>
        </div>

        <div className="w-full space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="activity-select"
              className="block text-sm font-medium text-gray-900"
            >
              Jenis Kegiatan
            </label>

            <Combobox
              options={activities}
              value={selectedActivity}
              onValueChange={setSelectedActivity}
              placeholder="Pilih Kegiatan"
              searchPlaceholder="Pencarian"
            />
          </div>

          <button
            onClick={() => {
              handleSubmit();
            }}
            disabled={!selectedActivity}
            className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              selectedActivity
                ? "bg-primary text-white hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            OK, Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
