import Button from "@/components/customs/button";
import { useValidationForm } from "../../utils/use-validation-form";
import { useRouter } from "next/navigation";
import Datepicker from "@/components/customs/datepicker";
import TextField from "@/components/customs/textfield";
import Select from "@/components/customs/select";
import Required from "@/components/customs/required";

const genderOptions = [
  { label: "Laki-Laki", key: "laki-laki" },
  { label: "Perempuan", key: "perempuan" },
];

const ValidationForm = () => {
  const router = useRouter();
  const { setStep } = useValidationForm();
  return (
    <div className="flex min-h-dvh flex-col items-center bg-slate-200">
      <div className="flex w-full flex-col items-center gap-2 bg-primary-500 p-[10px]">
        <p className="text-[24px] font-bold text-white">
          Validasi Data Diri dan Pekerjaan
        </p>
        <p className="text-[12px] font-normal text-white">
          Lakukan validasi sekarang untuk membuka akses terbatasmu di aplikasi
          dan untuk mendukung perkembangan aplikasi PGRI
        </p>
      </div>
      <div className="mt-[20px] flex w-full max-w-[1080px] flex-col items-center gap-4 rounded-[16px] border border-primary-50 bg-white p-4">
        <div className="flex w-full flex-col">
          <div className="rounded-[8px] bg-primary-500 px-4 py-3 text-[16px] font-bold text-white">
            Validasi Data Diri
          </div>
          <div className="flex gap-[26px] py-4">
            <div className="flex w-full flex-col gap-4">
              <TextField
                label={<Required>Nama & Gelar</Required>}
                placeholder="Masukkan Nama dan Gelar"
              />
              <Datepicker

                label={<Required>Tanggal Lahir</Required>}
                placeholder="Masukkan Tanggal Lahir"
              />
            </div>
            <div className="flex w-full flex-col gap-4">
              <Select
                label="Jenis Kelamin"
                placeholder="Pilih Jenis Kelamin"
                options={genderOptions}
              />
              <TextField
                label="Alamat KTP"
                placeholder="Masukkan Alamat Sesuai KTP"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="rounded-[8px] bg-primary-500 px-4 py-3 text-[16px] font-bold text-white">
            Validasi Data Pekerjaan
          </div>
        </div>
        <div className="flex w-full justify-end gap-4">
          <Button variant="secondary" onClick={() => setStep("CONFIRM")}>
            Kembali
          </Button>
          <Button onClick={() => setStep("DONE")}>Validasi Sekarang</Button>
        </div>
      </div>
    </div>
  );
};

export default ValidationForm;
