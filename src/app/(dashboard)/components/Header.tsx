"use client";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import useAuth from "@/store/useAuth";

interface TopNavbarProps {
  isSidebarOpen: boolean;
  handleSidebarToggle: () => void;
}

export const Header: React.FC<TopNavbarProps> = ({
  isSidebarOpen,
  handleSidebarToggle,
}) => {
  const { auth } = useAuth();

  return (
    <div
      className={`fixed flex h-[70px] justify-between bg-[#17A2B8] px-5 transition-all duration-500 ${isSidebarOpen ? "w-[calc(100%-247px)]" : "w-[calc(100%-63px)]"} right-0 z-50`}
    >
      <div className="flex items-center text-[16px] font-bold text-white">
        <IoIosArrowBack
          className={`cursor-pointer transition-all duration-300 ${isSidebarOpen ? "opacity-0" : "opacity-100"}`}
          onClick={handleSidebarToggle}
        />
        <h1
          className={`ml-2 transition-all duration-300 ${isSidebarOpen ? "opacity-0" : "opacity-100"}`}
        >
          KTA DIGITAL PGRI
        </h1>
      </div>

      <div className="flex flex-row items-center gap-4">
        {/* Search
        <SearchInput /> */}

        {/* Notification */}
        <div>
          <Image
            src={"/assets/notification.svg"}
            alt="notification"
            width={24}
            height={24}
          />
        </div>

        {/* User Profile */}
        <Link href="/my-profile">
          <button className="flex items-center rounded-[8px] px-3 py-1 transition-all hover:bg-primary-600">
            <div>
              <h1 className="text-[12px] font-semibold text-white">
                {auth?.name}
              </h1>
              <h5 className="text-right text-[10px] text-[#FFC107]">Online</h5>
            </div>
            <div className="ml-2 h-[40px] w-[40px] rounded-full bg-pink-200">
              <Image
                src={"/assets/profileNew.png"}
                alt="user"
                height={40}
                width={40}
                className="rounded-full"
              />
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};
