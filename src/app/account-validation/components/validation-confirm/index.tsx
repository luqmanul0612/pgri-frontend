import Button from "@/components/customs/button";
import ValidationImage from "../../assets/validation-image.svg";
import { useValidationForm } from "../../utils/use-validation-form";
import { useRouter } from "next/navigation";

const ValidationConfirm = () => {
  const router = useRouter();
  const { setStep } = useValidationForm();
  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-200">
      <div className="flex max-w-[600px] flex-col items-center rounded-[16px] border border-primary-50 bg-white p-[26px]">
        <ValidationImage />
        <p className="mt-[26px] text-[24px] font-bold text-black">
          Validasi Data Kamu Sekarang!
        </p>
        <p className="mt-2 text-center text-[14px] font-normal text-black">
          Aplikasi PGRI telah mengalami Peningkatan Pembaharuan fitur dari
          aplikasi sebelumnya, kami mengharapkan setiap anggota dapat melakukan
          validasi data diri masing-masing
        </p>
        <div className="mt-[26px] flex w-full gap-4">
          <Button
            fullWidth
            variant="secondary"
            onClick={() => router.push("/dashboard")}
          >
            Mungkin Nanti
          </Button>
          <Button fullWidth onClick={() => setStep("FORM")}>
            Validasi Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ValidationConfirm;
