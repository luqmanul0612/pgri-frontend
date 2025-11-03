/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@/components/customs/button";
import { useRouter } from "next/navigation";

const VerificationHeader = () => {
  const router = useRouter();
  
  return (
    <div className="flex w-full justify-between bg-primary-500 px-[60px] py-[16px]">
      <div className="flex flex-col">
        <p className="text-[24px] font-bold text-white">
          Verifikasi Pendaftaran Anggota
        </p>
        <p className="text-[12px] font-normal text-white">
          Kartu Tanda Anggota Persatuan Guru Republik Indonesia
        </p>
      </div>
      <div>
        <Button
          variant="neutral"
          className="!font-bold"
          onClick={() => router.push("/dashboard")}
        >
          Kembali ke Home
        </Button>
      </div>
    </div>
  );
};

export default VerificationHeader;
