/* eslint-disable @next/next/no-img-element */
"use client";
import BannerSlider from "@/app/components/molecules/banner-slider";
import CardDashboard from "@/app/components/CardDashboard";
import { FC } from "react";
import banner1 from "@/assets/images/banner-1.webp";
import useAuth from "@/store/useAuth";
import AdminSection from "./components/admin-section";
import UserSection from "./components/user-section";

interface pageProps {
  params: Promise<{}>;
}

const Page: FC<pageProps> = ({ params: {} }) => {
  const { auth } = useAuth();
  const banners = [
    {
      key: "banner-1",
      image: banner1,
    },
    {
      key: "banner-2",
      image: banner1,
    },
    {
      key: "banner-3",
      image: banner1,
    },
  ];

  return (
    <div>
      <div className="flex gap-6">
        <CardDashboard name="Data Anggota" total={1000} />
        <CardDashboard name="Karya Guru" total={200} />
        <CardDashboard name="Aspirasi Guru" total={230} />
        <CardDashboard name="Lindungi Guru" total={400} />
      </div>

      <div className="mt-5">
        <BannerSlider banners={banners} />
      </div>
      {auth.levelId === 1 && <AdminSection />}
      {auth.levelId === 2 && <UserSection />}
    </div>
  );
};

export default Page;
