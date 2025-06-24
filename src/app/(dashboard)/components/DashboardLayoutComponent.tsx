"use client";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import InvalidVerificationModal from "../anggota/component/InvalidVerificationModal";
import useModalNotVerified from "@/store/use-modal-not-verified";

export default function DashboardLayoutComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { showModalNotVerified, setShowModalNotVerified } =
    useModalNotVerified();

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div>
        {/* Top Navbar */}
        <Header
          isSidebarOpen={isSidebarOpen}
          handleSidebarToggle={handleSidebarToggle}
        />

        {/* Page Layout */}
        <div className="flex flex-row bg-[#F5F7fb]">
          {/* Sidebar */}
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            handleSidebarToggle={handleSidebarToggle}
          />

          {/* Main Content */}
          <div
            className={`min-h-screen bg-[#F5F7FB] pb-10 pt-[100px] transition-all duration-500 ${isSidebarOpen ? "ml-[20%] pl-2 pr-6" : "ml-[5%] px-5"} ${isSidebarOpen ? "w-[80%]" : "w-[95%]"}`}
          >
            <div>{children}</div>
          </div>
        </div>
      </div>
      <InvalidVerificationModal
        isOpen={showModalNotVerified}
        onClose={() => setShowModalNotVerified(false)}
      />
    </>
  );
}
