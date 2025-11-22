"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getMemberByNpa } from "@/app/(dashboard)/anggota/serverActions/member";
import VerificationBadgeIcon from "@/components/icons/VerificationBadgeIcon";
import { IMemberByIdResponse } from "@/interfaces/IMemberById";
import {
  IMinimalVerificationData,
  IMinimalVerificationState,
} from "@/interfaces/IMemberVerification";

export default function QRVerificationPage() {
  const params = useParams();
  const router = useRouter();
  const npa = params.npa as string;

  const [verificationState, setVerificationState] =
    useState<IMinimalVerificationState>({
      status: "loading",
      memberData: null,
      error: null,
      isLoading: true,
    });

  const selectedActivity =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("activity") ||
        "pengecekan-kta-anggota"
      : "pengecekan-kta-anggota";

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setVerificationState((prev) => ({
          ...prev,
          status: "loading",
          isLoading: true,
          error: null,
        }));

        const result: IMemberByIdResponse = await getMemberByNpa(npa);

        if (result.status === 200 && result.data) {
          const verificationData: IMinimalVerificationData = {
            member: {
              name: result.data.user.name,
              npa: result.data.user.npa,
              photo: result.data.photo?.profile?.[0] || null,
              createdAt: result.data.user.created_at,
            },
            verification: {
              verificationTime: new Date().toISOString(),
              verificationMethod: "qr",
              activityType: selectedActivity,
            },
          };

          setVerificationState({
            status: "success",
            memberData: verificationData,
            error: null,
            isLoading: false,
          });
        } else {
          throw new Error("Data anggota tidak ditemukan");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Gagal memuat data anggota";
        setVerificationState({
          status:
            err instanceof Error && err.message.includes("not found")
              ? "not_found"
              : "error",
          memberData: null,
          error: errorMessage,
          isLoading: false,
        });
      }
    };

    if (npa) {
      fetchMemberData();
    }
  }, [npa, selectedActivity]);

  const handleBack = () => {
    router.back();
  };

  if (!npa) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4">
        <div className="w-full max-w-sm rounded-2xl border-2 border-amber-200 bg-white p-8 text-center shadow-2xl">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <svg
                className="h-8 w-8 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          <h1 className="mb-4 text-lg font-bold text-gray-900">
            Verifikasi Tidak Valid
          </h1>
          <p className="mb-6 text-sm text-gray-600">
            Nomor Pokok Anggota (NPA) tidak ditemukan
          </p>
          <button
            onClick={handleBack}
            className="w-full rounded-lg bg-amber-600 px-6 py-3 font-bold text-white transition-colors hover:bg-amber-700"
          >
            Kembali ke Scan
          </button>
        </div>
      </div>
    );
  }

  if (verificationState.isLoading) {
    return <LoadingState />;
  }

  if (
    verificationState.status === "error" ||
    verificationState.status === "not_found"
  ) {
    return (
      <ErrorState
        error={verificationState.error!}
        npa={npa}
        onBack={handleBack}
      />
    );
  }

  if (verificationState.status === "success" && verificationState.memberData) {
    return (
      <SuccessState data={verificationState.memberData} onBack={handleBack} />
    );
  }

  return null;
}

const LoadingState = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br">
    <div className="w-full max-w-sm rounded-2xl border-2 border-teal-200 bg-white p-12 shadow-2xl">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
        </div>
        <p className="text-lg font-bold text-gray-900">
          Memverifikasi Data Anggota...
        </p>
        <p className="mt-2 text-sm text-teal-600">Mohon tunggu sebentar</p>
      </div>
    </div>
  </div>
);

const ErrorState = ({
  error,
  npa,
  onBack,
}: {
  error: string;
  npa: string;
  onBack: () => void;
}) => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-4">
    <div className="w-full max-w-sm rounded-2xl border-2 border-red-200 bg-white p-8 text-center shadow-2xl">
      <div className="mb-4 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <h3 className="mb-2 text-lg font-bold text-red-800">Verifikasi Gagal</h3>
      <p className="mb-4 text-sm text-red-600">{error}</p>
      <div className="mb-6 rounded-lg bg-red-50 p-4">
        <p className="text-xs text-red-600">NPA yang dicari:</p>
        <p className="font-mono text-sm font-semibold text-red-800">{npa}</p>
      </div>
      <div className="space-y-3">
        <button
          onClick={onBack}
          className="w-full rounded-lg bg-red-600 px-6 py-3 font-bold text-white transition-colors hover:bg-red-700"
        >
          Kembali ke Scan
        </button>
        <button
          onClick={() => window.location.reload()}
          className="w-full rounded-lg bg-gray-200 px-6 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-300"
        >
          Refresh Halaman
        </button>
      </div>
    </div>
  </div>
);

const SuccessState = ({
  data,
  onBack,
}: {
  data: IMinimalVerificationData;
  onBack: () => void;
}) => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
    <div
      className="relative flex flex-col items-center justify-center gap-4 rounded-[16px] border border-solid border-[#17a3b8] bg-white p-[50px] shadow-2xl"
      style={{ width: "384px" }}
    >
      {/* TOP TEXT - BERLAKU SELAMA MENJADI ANGGOTA */}
      <div className="w-full">
        <p
          className="text-right text-[14px] font-bold leading-normal"
          style={{
            fontFamily: '"Roboto:Bold", sans-serif',
            color: "#17a3b8",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          BERLAKU SELAMA MENJADI ANGGOTA
        </p>
      </div>

      {/* Profile Image - Using Figma dimensions */}
      <div className="flex justify-center">
        <div
          className="h-[177px] w-[150px] rounded-[16px] bg-gray-100 bg-cover bg-center"
          style={{
            backgroundImage: data.member.photo
              ? `url(${data.member.photo})`
              : "url(/assets/qr-verification/profile-image.png)",
          }}
        />
      </div>

      {/* Verification Section - Matching Figma exactly */}
      <div className="flex flex-col items-center justify-center gap-1">
        {/* Verification Badge - Matching Figma Design */}
        <div className="flex items-center justify-center gap-1 px-2 py-1">
          <VerificationBadgeIcon className="h-[18px] w-[18px] shrink-0" />
          <span
            className="relative shrink-0 text-[12px] font-bold leading-normal"
            style={{
              fontFamily: '"Roboto:Bold", sans-serif',
              color: "#17a3b8",
              fontVariationSettings: "'wdth' 100",
            }}
          >
            Terverifikasi
          </span>
        </div>

        {/* Member Info */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-2.5">
            <h3
              className="text-center text-[12px] font-bold leading-normal"
              style={{
                fontFamily: '"Roboto:Bold", sans-serif',
                color: "#17191c",
                fontVariationSettings: "'wdth' 100",
              }}
            >
              {data.member.name}
            </h3>
          </div>

          {/* Member Since */}
          <div className="flex items-center justify-center">
            <p
              className="text-[10px] font-normal leading-normal"
              style={{
                fontFamily: '"Roboto:Regular", sans-serif',
                color: "#17a3b8",
                fontVariationSettings: "'wdth' 100",
              }}
            >
              Anggota Sejak{" "}
              {data.member.createdAt
                ? new Date(data.member.createdAt).getFullYear()
                : "2018"}
            </p>
          </div>
        </div>
      </div>

      {/* QR Code/NPA Badge - Matching Figma exactly */}
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="relative flex h-[50px] w-[50px] items-center justify-center rounded-[8px] border border-solid border-[#17191c] bg-white">
          <img
            src="/assets/qr-verification/qr-code.png"
            alt="QR Code"
            className="absolute"
            style={{
              height: "37.5px",
              width: "37.5px",
              left: "6px",
              top: "6px",
            }}
          />
        </div>
        <p
          className="text-center text-[12px] font-bold leading-normal"
          style={{
            fontFamily: '"Roboto:Bold", sans-serif',
            color: "#17191c",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          NPA {data.member.npa}
        </p>
      </div>

      {/* OK Button - Matching Figma exactly */}
      <button
        onClick={onBack}
        className="flex items-center justify-center gap-2.5 rounded-[8px] px-4 py-2.5"
        style={{
          width: "300px",
          height: "48px",
          backgroundColor: "#17a3b8",
        }}
      >
        <span
          className="flex-1 text-center text-[14px] font-bold leading-normal"
          style={{
            fontFamily: '"Roboto:Bold", sans-serif',
            color: "#ffffff",
            fontVariationSettings: "'wdth' 100",
          }}
        >
          OK
        </span>
      </button>
    </div>
  </div>
);
