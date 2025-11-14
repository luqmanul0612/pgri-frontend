import Button from "@/components/customs/button";
import ValidationImage from "../../assets/validation-done.svg";
import { useRouter } from "next/navigation";
import useAuth from "@/store/useAuth";

const ValidationDone = () => {
  const { setUser } = useAuth();
  const router = useRouter();

  const onClickConfirm = () => {
    setUser({ is_verified: true });
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-200">
      <div className="flex max-w-[600px] flex-col items-center rounded-[16px] border border-primary-50 bg-white p-[26px]">
        <ValidationImage />
        <p className="mt-[26px] text-[24px] font-bold text-black">
          Terimakasih
        </p>
        <p className="mt-2 text-center text-[14px] font-normal text-black">
          Kamu sudah melakukan validasi data secara keseluruhan PGRI sangat
          mengapresiasi tindakan kamu.
        </p>
        <Button fullWidth onClick={onClickConfirm} className="mt-[26px]">
          OK
        </Button>
      </div>
    </div>
  );
};

export default ValidationDone;
