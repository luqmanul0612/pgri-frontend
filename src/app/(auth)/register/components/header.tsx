import React from "react";
import { navigate } from "@/utils/redirrect-client-side";

const Header: React.FC = () => {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between bg-[#17a3b8] px-[4vw] py-10">
      <div className="flex flex-col items-start justify-start gap-1">
        <div className="flex items-center justify-center gap-2.5">
          <h1 className="text-2xl font-bold text-[#f5f7fb]">
            Pendaftaran Anggota
          </h1>
        </div>
        <div className="flex items-center justify-center gap-2.5">
          <p className="text-xs font-normal text-[#f5f7fb]">
            Kartu Tanda Anggota Persatuan Guru Republik Indonesia
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate("/login")}
        className="flex h-12 items-center justify-center gap-2.5 rounded-2xl border border-[#f5f7fb] bg-[#f5f7fb] px-6 transition-colors duration-300 hover:bg-[#e0e0e0]"
      >
        <span className="text-sm font-normal text-[#17a3b8]">
          Sudah punya akun? Masuk
        </span>
      </button>
    </div>
  );
};

export default Header;
