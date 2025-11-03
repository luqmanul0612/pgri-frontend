"use client";
import { FC, MouseEventHandler, SVGProps } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import PgriLogo from "../../../../public/pgri-logo.svg";
import DashboardIcon from "@/assets/icons/sidebar-icons/dashboard.svg";
import MemberIcon from "@/assets/icons/sidebar-icons/member.svg";
import ApplicationIcon from "@/assets/icons/sidebar-icons/application.svg";
import TeacherWorksIcon from "@/assets/icons/sidebar-icons/teacher-works.svg";
import Statistics from "@/assets/icons/sidebar-icons/statistics.svg";
import TrainingIcon from "@/assets/icons/sidebar-icons/training.svg";
import SecurityUserIcon from "@/assets/icons/sidebar-icons/security-user.svg";
import EmptyWalletTickIcon from "@/assets/icons/sidebar-icons/empty-wallet-tick.svg";
import ReceiptItemIcon from "@/assets/icons/sidebar-icons/receipt-item.svg";
import WalletMoneyIcon from "@/assets/icons/sidebar-icons/wallet-money.svg";
import ReceiptEditIcon from "@/assets/icons/sidebar-icons/receipt-edit.svg";
import DirectboxNotifIcon from "@/assets/icons/sidebar-icons/directbox-notif.svg";
import ScanBarcodeIcon from "@/assets/icons/sidebar-icons/scan-barcode.svg";
import PeopleIcon from "@/assets/icons/sidebar-icons/people.svg";
import MemberTransferIcon from "@/assets/icons/sidebar-icons/member-transfer.svg";
import PrinterIcon from "@/assets/icons/sidebar-icons/printer.svg";
import MapIcon from "@/assets/icons/sidebar-icons/map.svg";
import AdminRoleIcon from "@/assets/icons/sidebar-icons/admin-role.svg";
import LogoutIcon from "@/assets/icons/sidebar-icons/logout.svg";
import useAuth from "@/store/useAuth";
import clsx from "clsx";
import { logout } from "./action";

interface SidebarProps {
  isOpen: boolean;
  handleSidebarToggle: () => void;
}

export interface SidebarMenu {
  label: string;
  Icon: FC<SVGProps<SVGElement>>;
  pathname?: string;
  onClick?: () => void;
  verify: boolean;
  access: number[];
}

const menu: SidebarMenu[] = [
  {
    label: "Dashboard",
    pathname: "/dashboard",
    Icon: DashboardIcon,
    verify: false,
    access: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    label: "Anggota",
    pathname: "/anggota",
    Icon: MemberIcon,
    verify: true,
    access: [1,2],
  },
  {
    label: "Permohonan",
    pathname: "/permohonan",
    Icon: ApplicationIcon,
    verify: true,
    access: [1, 3],
  },
  {
    label: "Karya Guru",
    pathname: "/karyaguru",
    Icon: TeacherWorksIcon,
    verify: true,
    access: [1, 3],
  },
  {
    label: "Statistik",
    pathname: "/statistik",
    Icon: Statistics,
    verify: true,
    access: [1, 3],
  },
  {
    label: "Pelatihan",
    pathname: "/pelatihan",
    Icon: TrainingIcon,
    verify: true,
    access: [1, 3],
  },
  {
    label: "Lindungi Guru",
    pathname: "/lindungiguru",
    Icon: SecurityUserIcon,
    verify: true,
    access: [1, 3],
  },
  {
    label: "Aspirasi Guru",
    pathname: "/aspirasiguru",
    Icon: DirectboxNotifIcon,
    verify: true,
    access: [1, 3],
  },
  {
    label: "Mutasi Anggota",
    pathname: "/mutasianggota",
    Icon: MemberTransferIcon,
    verify: true,
    access: [1],
  },
  {
    label: "Cetak KTA",
    pathname: "/cetak-kta",
    Icon: PrinterIcon,
    verify: true,
    access: [1],
  },
  {
    label: "Data Wilayah",
    pathname: "/data-wilayah",
    Icon: MapIcon,
    verify: true,
    access: [1],
  },
  {
    label: "Scan KTA",
    pathname: "/qr-code",
    Icon: ScanBarcodeIcon,
    verify: true,
    access: [1, 3],
  },
  {
    label: "Role Admin",
    pathname: "/role",
    Icon: AdminRoleIcon,
    verify: true,
    access: [1],
  },
  {
    label: "Uang Iuran & Tagihan",
    pathname: "/iurandantagihan",
    Icon: EmptyWalletTickIcon,
    verify: false,
    access: [2, 3],
  },
  {
    label: "Uang Pelatihan",
    pathname: "/training-funds",
    Icon: ReceiptItemIcon,
    verify: true,
    access: [2],
  },
  {
    label: "Uang Cetak KTA",
    pathname: "/idcard-printing-fee",
    Icon: WalletMoneyIcon,
    verify: true,
    access: [2],
  },
  {
    label: "Laporan Keuangan",
    pathname: "/financial-report",
    Icon: ReceiptEditIcon,
    verify: true,
    access: [2],
  },
  {
    label: "Pengurus",
    pathname: "/management",
    Icon: PeopleIcon,
    verify: true,
    access: [3],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  handleSidebarToggle,
}) => {
  const { auth } = useAuth();
  const filteredMenu = menu.filter((item) => {
    if (!auth.levelId) return false;
    return item.access.includes(auth.levelId);
  });

  return (
    <div
      className={`fixed z-10 h-dvh bg-[#17191C] text-white transition-all duration-500 ${isOpen ? "w-[247px]" : "w-[63px]"}`}
    >
      <div className="flex h-[80px] items-center gap-4 pl-3 opacity-100 transition-all duration-300">
        <PgriLogo className="h-[40px] min-h-[40px] w-[40px] min-w-[40px]" />
        <span
          className={`overflow-hidden text-nowrap text-[16px] font-bold ${isOpen ? "" : "hidden"}`}
        >
          KTA DIGITAL PGRI
        </span>
        <IoIosArrowForward
          className={`cursor-pointer ${isOpen ? "" : "hidden"}`}
          onClick={handleSidebarToggle}
        />
      </div>
      <div className="scroll-hidden mt-5 box-border flex h-[calc(100vh-80px)] shrink-0 flex-col overflow-y-auto pb-20">
        {filteredMenu.map((item, i) => (
          <MenuItem
            key={i}
            label={item.label}
            Icon={item.Icon}
            pathname={item.pathname}
            isOpen={isOpen}
            verify={item.verify}
          />
        ))}
      </div>
      <MenuItem
        Icon={LogoutIcon}
        label="Keluar"
        onClick={() => logout()}
        isOpen={isOpen}
        className="!hover:!bg-red-400 !absolute bottom-0 left-0 w-full !bg-red-600 text-white hover:!bg-red-700"
      />
    </div>
  );
};

// menu item component start
interface MenuItemProps {
  Icon: FC<SVGProps<SVGElement>>;
  label: string;
  pathname?: string;
  isOpen: boolean;
  onClick?: () => void;
  verify?: boolean;
  className?: string;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  const {
    Icon,
    label,
    pathname: menuPathname,
    isOpen,
    onClick,
    verify,
    className,
  } = props;
  const { auth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname.startsWith(menuPathname || "");
  const onClickLink: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (verify) {
      if (!auth.isVerified) {
        e.preventDefault();
        router.push("/account-verification");
        return;
      }
    }
  };

  const classNameItem = clsx(
    "relative flex h-[44px] min-h-[44px] items-center gap-4 pl-[20px] opacity-100 transition-all duration-300 hover:bg-[#25292e]",
    className,
    {
      "text-primary-500": isActive,
      "text-white": !isActive,
    },
  );

  return menuPathname ? (
    <Link href={menuPathname} onClick={onClickLink}>
      <div className={classNameItem}>
        <Icon className="min-h-[24px] min-w-[24px]" />
        <span
          className={`ml-1 overflow-hidden text-nowrap text-[12px] font-normal transition-all duration-300 ${isOpen ? "" : "hidden"}`}
        >
          {label}
        </span>
        <div
          className={clsx(
            "min-[18px] absolute right-[-10px] top-[50%] flex h-[18px] min-w-[20px] -translate-y-1/2 items-center rounded-[16px_0_0_16px] bg-white pl-1 opacity-0 transition-all",
            { "opacity-100": isActive },
          )}
        >
          <div className="min-[8px] h-[8px] min-w-[15px] rounded-[10px_0_0_10px] bg-primary-500" />
        </div>
      </div>
    </Link>
  ) : (
    <div className={clsx(classNameItem, "cursor-pointer")} onClick={onClick}>
      <Icon className="min-h-[24px] min-w-[24px]" />
      <span
        className={`ml-1 overflow-hidden text-nowrap text-[12px] font-[400] transition-all duration-300 ${isOpen ? "" : "hidden"}`}
      >
        {label}
      </span>
    </div>
  );
};
