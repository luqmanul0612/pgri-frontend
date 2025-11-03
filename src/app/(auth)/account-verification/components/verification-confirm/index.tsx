import Button from "@/components/customs/button";
import VerificationImage from "../../assets/verification-image.svg";
import { useVerificationForm } from "../../utils/use-verification-form";
import { useRouter } from "next/navigation";
import VerificationHeader from "../verificattion-header";

const VerificationConfirm = () => {
  const router = useRouter();
  const { setStep } = useVerificationForm();
  return (
    <div className="flex h-dvh flex-col">
      <VerificationHeader />
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex max-w-[700px] flex-col items-center">
          <p className="text-2xl font-bold text-black">
            Verifikasi Pendaftaran
          </p>
          <p className="mt-4 text-lg font-bold text-primary-500">
            Mohon Untuk Menyelesaikan Verifikasi Pendaftaran
          </p>
          <VerificationImage className="mt-6" />
          <p className="text-center text-sm font-normal text-black">
            Kamu dapat melakukan penyelesaian Verifikasi Pendaftaran Anggota
            langsung dari web ataupun lewat Aplikasi PGRIKU, setelah verifikasi
            dilakukan kamu dapat menikmati layanan aplikasi web dan mobile
            PGRIKU
          </p>
          <div className="mt-9 flex w-full gap-6">
            <Button
              variant="secondary"
              onClick={() => router.push("/dashboard")}
              fullWidth
            >
              Verifikasi di Aplikasi PGRIKU
            </Button>
            <Button fullWidth onClick={() => setStep("FORM")}>
              Verifikasi Sekarang
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationConfirm;
