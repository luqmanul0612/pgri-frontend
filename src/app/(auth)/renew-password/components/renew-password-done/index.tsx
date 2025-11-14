import Button from "@/components/customs/button";
import StepDoneImage from "../../assets/step-done.svg";
import { useRouter } from "next/navigation";

const RenewPasswordDone = () => {
  const router = useRouter();

  const onClickConfirm = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-200">
      <div className="flex max-w-[600px] flex-col items-center rounded-[16px] border border-primary-50 bg-white p-[26px]">
        <StepDoneImage />
        <p className="mt-[26px] text-[24px] font-bold text-black">
          Terimakasih
        </p>
        <p className="mt-2 text-center text-[14px] font-normal text-black">
          Kamu sudah melakukan pembaruan kata sandi mohon untuk mengingat,
          mencatat sandi baru anda dan jangan disebarkan ke siapapun.
        </p>
        <Button fullWidth onClick={onClickConfirm} className="mt-[26px]">
          OK
        </Button>
      </div>
    </div>
  );
};

export default RenewPasswordDone;
