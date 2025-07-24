"use client";
import { FC, MouseEvent, MouseEventHandler } from "react";
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
import { cookies } from "next/headers";
import { logout } from "./action";
import useModalNotVerified from "@/store/use-modal-not-verified";
import { CetakKta } from "../../../../public/icon/sidebarIcon/CetakKta";
import { DataWilayah } from "../../../../public/icon/sidebarIcon/dataWilayah";
import useAuth from "@/store/useAuth";
import { QrCode } from "../../../../public/icon/sidebarIcon/qr-code";

interface SidebarProps {
  isSidebarOpen: boolean;
  handleSidebarToggle: () => void;
}

const menus: {
  Icon: FC;
  title: string;
  href: string;
  verify?: boolean;
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
    verify: true,
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
  {
    title: "Role",
    href: "/role",
    Icon: MutasiAnggota,
  },
  {
    title: "Cetak KTA",
    href: "/cetak-kta",
    Icon: CetakKta,
  },
  {
    title: "Data Wilayah",
    href: "/data-wilayah",
    Icon: DataWilayah,
  },
  {
    title: "Scan QR Code KTA",
    href: "/qr-code",
    Icon: QrCode,
  },
];

const utilityMenus: {
  Icon: FC;
  title: string;
  onClick?: () => void;
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
    onClick: async () => {
      await logout();
    },
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  handleSidebarToggle,
}) => {
  return (
    <div
      className={`fixed z-10 h-screen bg-[#17191C] text-white transition-all duration-500 ${isSidebarOpen ? "w-[247px]" : "w-[63px]"}`}
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
            verify={item.verify}
          />
        ))}
        {utilityMenus.map((item, i) => (
          <MenuItem
            key={i}
            title={item.title}
            Icon={item.Icon}
            isSidebarOpen={isSidebarOpen}
            onClick={item.onClick}
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
  onClick?: () => void;
  verify?: boolean;
}

export const MenuItem: FC<MenuProps> = ({
  Icon,
  title,
  href,
  isSidebarOpen,
  onClick,
  verify,
}) => {
  const { auth } = useAuth();
  const pathname = usePathname();
  const { setShowModalNotVerified } = useModalNotVerified();

  const isActive = (href: string) => pathname === href;
  const onClickLink: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (verify) {
      if (!auth.isVerified) {
        e.preventDefault();
        setShowModalNotVerified(true);
        return;
      }
    }
  };
  return href ? (
    <Link href={href} onClick={onClickLink}>
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
      className={`flex cursor-pointer items-center gap-4 pl-[20px] opacity-100 transition-all duration-300`}
      onClick={onClick}
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
