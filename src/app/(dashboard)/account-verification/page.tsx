/* eslint-disable @next/next/no-img-element */
"use client";
import { FC, useEffect } from "react";
import Auth from "./assets/auth.svg";
import Button from "@/components/customs/button";
import { useRouter } from "next/navigation";

interface pageProps {
  params: Promise<{}>;
}

const Page: FC<pageProps> = ({ params: {} }) => {
  const router = useRouter();


  return (
    <div className="flex h-[calc(100vh_-_150px)] flex-col items-center justify-center">
      <div className="flex max-w-[700px] flex-col items-center">
        <p className="text-2xl font-bold text-black">Verifikasi Pendaftaran</p>
        <p className="mt-4 text-lg font-bold text-primary-500">
          Mohon Untuk Menyelesaikan Verifikasi Pendaftaran
        </p>
        <Auth className="mt-6" />
        <p className="text-center text-sm font-normal text-black">
          Kamu dapat melakukan penyelesaian Verifikasi Pendaftaran Anggota
          langsung dari web ataupun lewat Aplikasi PGRIKU, setelah verifikasi
          dilakukan kamu dapat menikmati layanan aplikasi web dan mobile PGRIKU
        </p>
        <div className="mt-9 flex gap-6">
          <Button>Verifikasi Sekarang</Button>
          <Button variant="secondary" onClick={() => router.push("/dashboard")}>
            Verifikasi di Aplikasi PGRIKU
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
