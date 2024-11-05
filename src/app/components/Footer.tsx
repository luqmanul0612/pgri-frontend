import { FC } from "react";
import Fb from "../../../public/assets/fb";
import Ig from "../../../public/assets/ig";
import X from "../../../public/assets/X";
import Yt from "../../../public/assets/Yt";

interface FooterProps {}

export const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="flex h-[6vh] w-full items-center justify-between bg-[#17A2B8] px-[4vw] py-[1.5rem] text-[14px] text-white">
      <p>Copyright@2024. Pengurus Besar Persatuan Guru Republik Indonesia</p>
      <div className="flex items-center gap-[1rem]">
        <Fb />
        <Ig />
        <X />
        <div className="pt-[6px]">
          <Yt />
        </div>

        <p>Akun media sosial kami</p>
      </div>
    </footer>
  );
};
