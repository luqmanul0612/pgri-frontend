import { FC } from "react";
import Image from "next/image";
import warning from "@/../public/icon/warning.png";
import userIcon from "@/../public/icon/userIcon.png";
import messageIcon from "@/../public/icon/email-icon.png";
import phoneIcon from "@/../public/icon/phone-icon.png";

// ANCHOR: Entry point
// #region Entry point

const page: FC = async () => {
  return (
    <div className="relative mx-auto h-screen min-h-[660px] w-full space-y-4 overflow-hidden bg-[#f5f7fb] p-4">
      {/* Main Content - simplified structure */}
      <div>
        <h2 className="text-sm font-bold text-primary">
          Pembayaran Uang Pangkal
        </h2>

        <UserProfile />

        <p className="mt-2 text-xs text-[#17191c]">
          Merupakan uang komitmen untuk seluruh anggota baru PGRI dan wajib
          dibayarkan diawal pendaftaran. Sebagai anggota baru kamu dapat
          melakukan Pembayaran Bank, Alfamart, Indomaret dan lainnya!
        </p>

        <div className="mt-4 flex flex-col items-center gap-2 rounded-[10px] bg-primary/20 p-5 outline outline-1 outline-primary">
          <span className="text-sm text-primary">Uang Pangkal</span>
          <span className="text-2xl font-bold text-primary">Rp25.000</span>
        </div>

        <div className="mt-4 flex items-start gap-1 rounded-lg bg-[#ff0000]/5 p-1.5">
          <Image src={warning} alt="warning icon" className="mt-0.5" />
          <p className="text-[10px] text-[#ff0000]">
            Kamu boleh melewati Pembayaran pada pendaftaran ini, namun pada
            aplikasi Mobile kamu wajib melakukan verifikasi pembayaran agar
            aplikasi dapat digunakan dengan semestinya!
          </p>
        </div>
      </div>

      {/* Button - positioned absolutely at the bottom */}
      <button className="absolute bottom-6 left-4 right-4 rounded-lg bg-primary p-4 text-sm text-white">
        Bayar
      </button>
    </div>
  );
};

export default page;
// #endregion

// ANCHOR: Internal components
// #region Internal components

const UserProfile = () => {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <h2 className="text-sm font-bold text-[#17191c]">Informasi Anggota</h2>
      {/* Input Field - Nama Anggota */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-normal text-[#17191c]">
          Nama Anggota
        </label>
        <div className="flex h-10 items-center gap-2.5 rounded-lg px-4 py-2.5 outline outline-1 outline-[#17a3b8]/20">
          <UserIcon />
          <span className="flex-1 text-xs text-[#17191c]">
            Mohammad Alfath, MM, S.Kom
          </span>
        </div>
      </div>

      {/* Input Field - Email */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-normal text-[#17191c]">Email</label>
        <div className="flex h-10 items-center gap-2.5 rounded-lg px-4 py-2.5 outline outline-1 outline-[#17a3b8]/20">
          <EmailIcon />
          <span className="flex-1 text-xs text-[#17191c]">
            alfath.ui.ux@gmail.com
          </span>
        </div>
      </div>

      {/* Input Field - Nomor Handphone */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-normal text-[#17191c]">
          Nomor Handphone
        </label>
        <div className="flex h-10 items-center gap-2.5 rounded-lg px-4 py-2.5 outline outline-1 outline-[#17a3b8]/20">
          <PhoneIcon />
          <span className="flex-1 text-xs text-[#17191c]">+6285726293030</span>
        </div>
      </div>
    </div>
  );
};

// ANCHOR: Icon components
// #region Icon components

function UserIcon() {
  return <Image src={userIcon} alt="user icon" width={18} height={18} />;
}

function EmailIcon() {
  return <Image src={messageIcon} alt="user icon" width={18} height={18} />;
}

function PhoneIcon() {
  return <Image src={phoneIcon} alt="user icon" width={18} height={18} />;
}
// #endregion

// #endregion
