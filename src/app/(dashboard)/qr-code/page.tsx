"use client";

import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import qrIllustration from "./assets/qrIllustration.png";

export default function Page() {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activities = [
    "Pengecekan KTA Anggota",
    "Kegiatan PGRI Pusat",
    "Kegiatan PGRI Provinsi",
    "Kegiatan PGRI Daerah",
    "Rapat Koordinasi",
    "Pelatihan Guru",
  ];

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

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <span
                  className={`text-sm ${selectedActivity ? "text-gray-900" : "text-gray-500"}`}
                >
                  {selectedActivity || "Pilih Kegiatan"}
                </span>
                <ChevronDownIcon
                  className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                  {activities.map((activity) => (
                    <button
                      key={activity}
                      onClick={() => {
                        setSelectedActivity(activity);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-gray-900 transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
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
