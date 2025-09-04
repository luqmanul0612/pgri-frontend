"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { BrowserMultiFormatReader } from "@zxing/browser";

interface ScanProps {
  onBackToMain: () => void;
  selectedActivity: string;
  activities: Array<{ value: string; label: string }>;
}

export const Scan = ({ onBackToMain, selectedActivity, activities }: ScanProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string>("");
  const [cameraError, setCameraError] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [manualNPA, setManualNPA] = useState<string>("");
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  // Get available camera devices
  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput",
        );
        setCameraDevices(videoDevices);
        if (videoDevices.length > 0 && !selectedDeviceId) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        setCameraError("Tidak dapat mengakses perangkat kamera");
      }
    };
    getDevices();
  }, [selectedDeviceId]);

  // Initialize QR reader
  useEffect(() => {
    readerRef.current = new BrowserMultiFormatReader();
    return () => {
      // Cleanup handled by component unmount
    };
  }, []);

  // Start scanning
  const startScanning = useCallback(() => {
    if (!webcamRef.current || !readerRef.current) return;

    setIsScanning(true);
    const videoElement = webcamRef.current.video;

    if (videoElement) {
      const scanInterval = setInterval(() => {
        if (videoElement.readyState === 4 && readerRef.current) {
          try {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            if (context) {
              canvas.width = videoElement.videoWidth;
              canvas.height = videoElement.videoHeight;
              context.drawImage(videoElement, 0, 0);

              try {
                const result = readerRef.current.decode(videoElement);
                if (result) {
                  setScanResult(result.getText());
                  setIsScanning(false);
                  clearInterval(scanInterval);
                }
              } catch (decodeError) {
                // Continue scanning - no QR code found
              }
            }
          } catch (error) {
            // Continue scanning
          }
        }
      }, 500); // Reduced frequency to improve performance

      return () => clearInterval(scanInterval);
    }
  }, []);

  // Stop scanning
  const stopScanning = useCallback(() => {
    setIsScanning(false);
  }, []);

  // Handle manual check
  const handleManualCheck = () => {
    if (manualNPA.trim()) {
      setScanResult(manualNPA.trim());
    }
  };
  return (
    <main className="-mx-4 inline-flex w-[1200px] flex-col items-center justify-start gap-5">
      <section className="flex w-[1160px] flex-col items-start justify-start gap-4">
        <header className="flex h-[19px] flex-col items-start justify-start gap-2 self-stretch">
          <div
            className="inline-flex w-[990px] cursor-pointer items-center justify-start gap-4"
            onClick={onBackToMain}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative cursor-pointer"
            >
              <path
                d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"
                fill="#17191C"
              />
            </svg>
            <span className="flex-1 justify-end text-base font-semibold text-[#17191c]">
              Scan QR Code KTA Digital
            </span>
          </div>
        </header>
        <div className="flex flex-col items-center justify-start gap-4 self-stretch px-[200px]">
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <div className="inline-flex h-[50px] items-center justify-start gap-4 self-stretch rounded-lg bg-[#17a3b8] px-4">
              <div className="flex flex-1 items-center justify-start gap-4">
                <span className="flex-1 justify-end text-base font-bold text-[#f5f7fb]">
                  Tipe Aktifitas
                </span>
              </div>
              <div className="flex items-center justify-start gap-4">
                <span className="justify-end text-base font-normal text-[#f5f7fb]">
                  {activities.find(activity => activity.value === selectedActivity)?.label || "Pengecekan KTA Anggota"}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2 self-stretch">
              <label className="inline-flex items-center justify-start gap-2.5 self-stretch">
                <span className="justify-start text-sm font-normal text-[#17191c]">
                  Kamera Perangkat
                </span>
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="inline-flex h-11 w-full items-center justify-start gap-2.5 self-stretch rounded-lg px-4 py-2.5 outline outline-1 outline-offset-[-1px] outline-[#17a3b8]"
                >
                  <span className="flex-1 justify-start text-left text-sm font-normal text-[#17191c]">
                    {cameraDevices.find(
                      (device) => device.deviceId === selectedDeviceId,
                    )?.label || "Pilih Kamera"}
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative"
                  >
                    <path
                      d="M19.9181 8.9502L13.3981 15.4702C12.6281 16.2402 11.3681 16.2402 10.5981 15.4702L4.07812 8.9502"
                      stroke="#17A3B8"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {showDropdown && cameraDevices.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                    {cameraDevices.map((device) => (
                      <button
                        key={device.deviceId}
                        onClick={() => {
                          setSelectedDeviceId(device.deviceId);
                          setShowDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-gray-900 transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                      >
                        {device.label ||
                          `Kamera ${device.deviceId.slice(0, 8)}`}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start self-stretch">
            <div className="relative h-[400px] w-[760px] overflow-hidden rounded-2xl bg-[#17191c]/50">
              {cameraError ? (
                <div className="flex h-full items-center justify-center text-white">
                  <p>{cameraError}</p>
                </div>
              ) : (
                <>
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    videoConstraints={{
                      deviceId: selectedDeviceId,
                      width: 760,
                      height: 400,
                      facingMode: "environment",
                    }}
                    className="h-full w-full object-cover"
                    onUserMedia={startScanning}
                    onUserMediaError={(error) => {
                      const errorMessage =
                        typeof error === "string"
                          ? error
                          : (error as DOMException).message || "Unknown error";
                      setCameraError("Gagal mengakses kamera: " + errorMessage);
                    }}
                  />
                  {scanResult && (
                    <div className="absolute left-4 right-4 top-4 rounded-lg bg-green-500 p-3 text-white">
                      <p className="font-semibold">QR Code Terdeteksi:</p>
                      <p className="text-sm">{scanResult}</p>
                    </div>
                  )}
                  {isScanning && (
                    <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-blue-500 p-2 text-center text-white">
                      <p className="text-sm">Scanning...</p>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="inline-flex items-center justify-start gap-2.5 rounded-[100px] bg-white/25 p-2.5">
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative"
              >
                <path
                  d="M12.3923 40.3337H31.6057C36.6657 40.3337 38.6823 37.2353 38.9207 33.4587L39.874 18.3153C40.1307 14.3553 36.9773 11.0003 32.999 11.0003C31.8807 11.0003 30.854 10.3587 30.3407 9.36866L29.0207 6.71033C28.1773 5.04199 25.9773 3.66699 24.1073 3.66699H19.909C18.0207 3.66699 15.8207 5.04199 14.9773 6.71033L13.6573 9.36866C13.144 10.3587 12.1173 11.0003 10.999 11.0003C7.02067 11.0003 3.86734 14.3553 4.12401 18.3153L5.07734 33.4587C5.29734 37.2353 7.33234 40.3337 12.3923 40.3337Z"
                  stroke="#F5F7FB"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.25 14.667H24.75"
                  stroke="#F5F7FB"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.0013 32.9997C25.283 32.9997 27.9596 30.323 27.9596 27.0413C27.9596 23.7597 25.283 21.083 22.0013 21.083C18.7196 21.083 16.043 23.7597 16.043 27.0413C16.043 30.323 18.7196 32.9997 22.0013 32.9997Z"
                  stroke="#F5F7FB"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="inline-flex items-center justify-start self-stretch text-xs font-normal text-[#ff0000]">
              Jika QR Code pada KTA tidak terdeteksi oleh alat scanner silahkan
              tambahkan NPA secara manual!
            </p>
          </div>
          <div className="inline-flex items-start justify-center gap-4 self-stretch">
            <div className="inline-flex flex-1 flex-col items-start justify-start gap-2">
              <input
                type="text"
                value={manualNPA}
                onChange={(e) => setManualNPA(e.target.value)}
                placeholder="Masukkan NPA"
                className="inline-flex h-11 items-center justify-start gap-2.5 self-stretch rounded-lg bg-white px-4 py-2.5 text-sm font-normal text-[#17191c] outline outline-1 outline-offset-[-1px] outline-[#919191]"
              />
            </div>
            <button
              onClick={handleManualCheck}
              disabled={!manualNPA.trim()}
              className={`flex h-11 items-center justify-center gap-2.5 rounded-lg p-4 transition-colors ${
                manualNPA.trim()
                  ? "bg-[#17a3b8] text-white hover:bg-[#17a3b8]/80"
                  : "cursor-not-allowed bg-[#d3d3d3] text-[#919191]"
              }`}
            >
              <span className="justify-start text-center text-sm font-normal">
                Cek Sekarang
              </span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
