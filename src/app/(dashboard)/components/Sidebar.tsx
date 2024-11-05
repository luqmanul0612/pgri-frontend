"use client";
import { FC } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboard } from "../../../../public/icon/sidebarIcon/dashboard";
import { Anggota } from "../../../../public/icon/sidebarIcon/anggota";
import { permohonan } from "../../../../public/icon/sidebarIcon/permohonan";
import { KaryaGuru } from "../../../../public/icon/sidebarIcon/karyaguru";
import { Statistik } from "../../../../public/icon/sidebarIcon/statistik";
import { Pelatihan } from "../../../../public/icon/sidebarIcon/Pelatihan";
import { PerlindunganGuru } from "../../../../public/icon/sidebarIcon/PerlindunganGuru";
import { IuranTagihan } from "../../../../public/icon/sidebarIcon/iuranTagihan";
import { AspirasiGuru } from "../../../../public/icon/sidebarIcon/AspirasiGuru";
import { MutasiAnggota } from "../../../../public/icon/sidebarIcon/MutasiAnggota";
import { Button } from "@/components/ui/button";
import { Setting } from "../../../../public/icon/sidebarIcon/Setting";
import { Bahasa } from "../../../../public/icon/sidebarIcon/Bahasa";
import { Logout } from "../../../../public/icon/sidebarIcon/Logout";

interface SidebarProps {
  isSidebarOpen: boolean;
  handleSidebarToggle: () => void;
}

const menus: {
  Icon: FC;
  title: string;
  href: string;
}[] = [
  {
    title: "Dashboard",
    href: "/admin",
    Icon: dashboard,
  },
  {
    title: "Anggota",
    href: "/anggota",
    Icon: Anggota,
  },
  {
    title: "Permohonan",
    href: "/permohonan",
    Icon: permohonan,
  },
  {
    title: "Karya Guru",
    href: "/karyaguru",
    Icon: KaryaGuru,
  },
  {
    title: "Statistik",
    href: "/statistik",
    Icon: Statistik,
  },
  {
    title: "Pelatihan",
    href: "/pelatihan",
    Icon: Pelatihan,
  },
  {
    title: "Lindungi Guru",
    href: "/lindungiguru",
    Icon: PerlindunganGuru,
  },
  {
    title: "Iuran dan Tagihan",
    href: "/iurandantagihan",
    Icon: IuranTagihan,
  },
  {
    title: "Aspirasi Guru",
    href: "/aspirasiguru",
    Icon: AspirasiGuru,
  },
  {
    title: "Mutasi Anggota",
    href: "/mutasianggota",
    Icon: MutasiAnggota,
  },
];

const utilityMenus: {
  Icon: FC;
  title: string;
}[] = [
  {
    Icon: Setting,
    title: "Setting",
  },
  {
    Icon: Bahasa,
    title: "Bahasa",
  },
  {
    Icon: Logout,
    title: "Keluar",
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  handleSidebarToggle,
}) => {
  return (
    <div
      className={`fixed h-screen bg-[#17191C] text-white transition-all duration-500 ${isSidebarOpen ? "w-[247px]" : "w-[63px]"}`}
    >
      <div className="flex h-[80px] items-center gap-4 pl-3 opacity-100 transition-all duration-300">
        <Image src={"/logo/logo.png"} alt="logo" width={40} height={40} />

        <span
          className={`overflow-hidden text-nowrap text-[16px] font-bold ${isSidebarOpen ? "" : "hidden"}`}
        >
          KTA DIGITAL PGRI
        </span>
        <IoIosArrowForward
          className={`cursor-pointer ${isSidebarOpen ? "" : "hidden"}`}
          onClick={handleSidebarToggle}
        />
      </div>

      <div className="scroll-hidden mt-5 flex h-[calc(100%-80px)] shrink-0 flex-col gap-6 overflow-auto pb-20">
        {/* Dashboard Menu */}
        {menus.map((item, i) => (
          <MenuItem
            key={i}
            title={item.title}
            Icon={item.Icon}
            href={item.href}
            isSidebarOpen={isSidebarOpen}
          />
        ))}
        {utilityMenus.map((item, i) => (
          <MenuItem
            key={i}
            title={item.title}
            Icon={item.Icon}
            isSidebarOpen={isSidebarOpen}
          />
        ))}
      </div>
    </div>
  );
};

// menu item component start
interface MenuProps {
  Icon: FC<{ on?: boolean }>;
  title: string;
  href?: string;
  isSidebarOpen: boolean;
}

export const MenuItem: FC<MenuProps> = ({
  Icon,
  title,
  href,
  isSidebarOpen,
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  return href ? (
    <Link href={href}>
      <div
        className={`flex items-center gap-4 pl-[20px] opacity-100 transition-all duration-300 ${isActive(href) ? "text-[#17A2B8]" : ""}`}
      >
        <Icon on={isActive(href)} />
        <span
          className={`ml-1 overflow-hidden text-nowrap text-[12px] font-[400] transition-all duration-300 ${isSidebarOpen ? "" : "hidden"}`}
        >
          {title}
        </span>
      </div>
    </Link>
  ) : (
    <div
      className={`flex items-center gap-4 pl-[20px] opacity-100 transition-all duration-300`}
    >
      <Icon />
      <span
        className={`ml-1 overflow-hidden text-nowrap text-[12px] font-[400] transition-all duration-300 ${isSidebarOpen ? "" : "hidden"} ${title == "Keluar" ? "text-[#CB2929]" : ""}`}
      >
        {title}
      </span>
    </div>
  );
};
