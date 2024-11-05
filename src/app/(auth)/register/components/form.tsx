import { Input } from "@/components/ui/input";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Danger from "../../../../../public/assets/danger";
import { FormField } from "@/app/components/FormField";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import "./dob.css";
import { checkRegistrationData } from "../serverActions/checkData";
import { IFormData } from "../page";
import { toast } from "@/components/ui/use-toast";

interface FormComponentProps {
  formData: IFormData;
  setStep: Dispatch<SetStateAction<number>>;
  setFormData: Dispatch<SetStateAction<IFormData>>;
}

const FormComponent: FC<FormComponentProps> = ({
  formData,
  setStep,
  setFormData,
}) => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function validateForm(data: IFormData): boolean {
    const newErrors: { [key: string]: string } = {};

    if (!/^\d{16}$/.test(data.nik)) {
      newErrors.nik = "NIK harus 16 digit angka.";
    }

    if (!/^\d{10,15}$/.test(data.phone_number)) {
      newErrors.phone_number =
        "Nomor telepon harus antara 10 hingga 15 digit angka.";
    }

    if (!/^\d{5}$/.test(data.postal_code)) {
      newErrors.postal_code = "Kode pos harus 5 digit angka.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const updatedFormData: IFormData = {
      name: event.currentTarget.nama.value,
      nik: event.currentTarget.nik.value,
      email: event.currentTarget.email.value,
      birth_place: event.currentTarget.birth_place.value,
      dob: event.currentTarget.dob.value,
      gender: event.currentTarget.gender.value,
      relegion: event.currentTarget.relegion.value, // Keeping relegion as requested
      blood_type: event.currentTarget.blood_type.value,
      phone_number: event.currentTarget.phone_number.value,
      address: event.currentTarget.address.value,
      postal_code: event.currentTarget.postal_code.value,
      latest_education: event.currentTarget.latest_education.value,
    };

    if (validateForm(updatedFormData)) {
      setFormData((prev) => ({ ...prev, ...updatedFormData }));
      const result = await checkRegistrationData(updatedFormData);
      if (result?.errors) {
        toast({
          title: result.errors ?? result.errors[0],
          variant: "destructive",
        });
        return;
      }
      setStep((prevStep) => prevStep + 1);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex max-w-5xl flex-col items-start justify-center gap-6 rounded-2xl border border-[#17a3b8]/20 p-4">
        <div className="flex w-full flex-wrap gap-6">
          <div className="flex flex-1 flex-col gap-6">
            {/* Nama & Gelar */}
            <FormField label="Nama & Gelar" required>
              <Input
                required
                id="nama"
                value={formData.name}
                onChange={(e) => {
                  setFormData((v) => {
                    return { ...v, name: e.target.value };
                  });
                }}
                className={clsx(
                  "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                  formData.name
                    ? "border-[#17a3b8]/20" // Regular border color
                    : "border-gray-300", // Empty state border color
                )}
                placeholder="Masukkan nama"
                autoComplete="off"
              />
            </FormField>

            {/* NIK */}
            <FormField label="NIK" required error={errors.nik}>
              <Input
                required
                id="nik"
                value={formData.nik}
                onChange={(e) => {
                  setFormData((v) => {
                    return { ...v, nik: e.target.value };
                  });
                }}
                type="number"
                className={clsx(
                  "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                  formData.nik
                    ? "border-[#17a3b8]/20" // Regular border color
                    : "border-gray-300", // Empty state border color
                )}
                placeholder="contoh: 32475858858588"
                autoComplete="off"
              />
            </FormField>

            {/* Email */}
            <FormField label="Email" required>
              <Input
                required
                id="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData((v) => {
                    return { ...v, email: e.target.value };
                  });
                }}
                type="email"
                className={clsx(
                  "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                  formData.email
                    ? "border-[#17a3b8]/20" // Regular border color
                    : "border-gray-300", // Empty state border color
                )}
                placeholder="Masukkan Email"
                autoComplete="off"
              />
            </FormField>

            {/* Tempat Lahir */}
            <FormField label="Tempat Lahir" required>
              <Input
                required
                id="birth_place"
                value={formData.birth_place}
                onChange={(e) => {
                  setFormData((v) => {
                    return { ...v, birth_place: e.target.value };
                  });
                }}
                className={clsx(
                  "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                  formData.birth_place
                    ? "border-[#17a3b8]/20"
                    : "border-gray-300",
                )}
                placeholder="Tempat lahir"
                autoComplete="off"
              />
            </FormField>

            {/* Tanggal Lahir */}
            <FormField label="Tanggal Lahir" required>
              <Input
                required
                id="dob"
                value={formData.dob}
                onChange={(e) => {
                  setFormData((v) => {
                    return { ...v, dob: e.target.value };
                  });
                }}
                type="date"
                className={clsx(
                  "flex w-full items-center justify-between gap-2.5 rounded-2xl py-3 pl-4 pr-12", // Adjusted padding to make space for the icon
                  formData.dob
                    ? "border-[#17a3b8]/20 text-[#17a3b8]"
                    : "border-gray-300 text-gray-400",
                )}
              />
            </FormField>
            {/* Pendidikan/Ijazah Terakhir */}
            <FormField label="Pendidikan/Ijazah Terakhir" required>
              <div className="relative">
                <select
                  required
                  id="latest_education"
                  value={formData.latest_education}
                  onChange={(e) => {
                    setFormData((v) => {
                      return { ...v, latest_education: e.target.value };
                    });
                  }}
                  className={clsx(
                    "w-full appearance-none rounded-2xl border-gray-300 bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                    formData.latest_education
                      ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                      : "border border-gray-300 text-gray-400",
                  )}
                >
                  <option value="" disabled>
                    Pilih...
                  </option>
                  <option value="SMA/SMK">SMA/SMK</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>
                <svg
                  className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.latest_education ? "text-[#17a3b8]" : "text-gray-400"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </FormField>
          </div>

          <div className="flex flex-1 flex-col gap-6">
            {/* Jenis Kelamin */}
            <FormField label="Jenis Kelamin" required>
              <div className="relative">
                <select
                  required
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => {
                    setFormData((v) => {
                      return { ...v, gender: e.target.value };
                    });
                  }}
                  className={clsx(
                    "w-full appearance-none rounded-2xl bg-transparent py-[8px] pl-4 pr-8 focus:border-[#17a3b8] focus:outline-none",
                    formData.gender
                      ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                      : "border border-gray-300 text-gray-400",
                  )}
                >
                  <option value="" disabled>
                    Pilih...
                  </option>
                  <option value="laki-laki">Laki-Laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
                <svg
                  className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.gender ? "text-[#17a3b8]" : "text-gray-400"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </FormField>

            {/* Agama */}
            <FormField label="Agama" required>
              <div className="relative">
                <select
                  required
                  id="relegion"
                  value={formData.relegion}
                  onChange={(e) => {
                    setFormData((v) => {
                      return { ...v, relegion: e.target.value };
                    });
                  }}
                  className={clsx(
                    "w-full appearance-none rounded-2xl bg-transparent py-[8px] pl-4 pr-8 text-[#17a3b8] focus:border-[#17a3b8] focus:outline-none",
                    formData.relegion
                      ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                      : "border border-gray-300 text-gray-400",
                  )}
                >
                  <option value="" disabled>
                    Pilih...
                  </option>
                  <option value="islam">Islam</option>
                  <option value="Kristen Protestan">Kristen Protestan</option>
                  <option value="Kristen Katolik">Kristen Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Konghucu">Konghucu</option>
                </select>
                <svg
                  className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.relegion ? "text-[#17a3b8]" : "text-gray-400"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </FormField>

            {/* Golongan Darah */}
            <FormField label="Golongan Darah" required>
              <div className="relative">
                <select
                  required
                  id="blood_type"
                  value={formData.blood_type}
                  onChange={(e) => {
                    setFormData((v) => {
                      return { ...v, blood_type: e.target.value };
                    });
                  }}
                  className={clsx(
                    "relative z-10 w-full appearance-none rounded-2xl bg-transparent py-[8px] pl-4 pr-8 text-[#17a3b8] focus:border-[#17a3b8] focus:outline-none",
                    formData.blood_type
                      ? "border border-[#17a3b8]/20 text-[#17a3b8]"
                      : "border border-gray-300 text-gray-400",
                  )}
                >
                  <option value="" disabled>
                    Pilih...
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
                <svg
                  className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.blood_type ? "text-[#17a3b8]" : "text-gray-400"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </FormField>

            {/* Alamat KTP */}
            <FormField label="Alamat KTP" required>
              <Input
                required
                id="address"
                value={formData.address}
                onChange={(e) => {
                  setFormData((v) => {
                    return { ...v, address: e.target.value };
                  });
                }}
                className={clsx(
                  "flex items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                  formData.address ? "border-[#17a3b8]/20" : "border-gray-300",
                )}
                placeholder="Pancasan RT 001/ RW 002 Desa Banteng Kec. Ajibarang"
                autoComplete="off"
              />
            </FormField>

            {/* Kode POS & Nomor Handphone */}
            <div className="flex flex-col gap-6">
              <FormField label="Kode POS" required error={errors.postal_code}>
                <Input
                  required
                  id="postal_code"
                  value={formData.postal_code}
                  onChange={(e) => {
                    setFormData((v) => {
                      return { ...v, postal_code: e.target.value };
                    });
                  }}
                  type="number"
                  className={clsx(
                    "flex w-full items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                    formData.postal_code
                      ? "border border-[#17a3b8]/20"
                      : "border border-gray-300",
                  )}
                  placeholder="Contoh: 53163"
                  autoComplete="off"
                />
              </FormField>

              <FormField
                label="Nomor Handphone"
                required
                error={errors.phone_number}
              >
                <Input
                  required
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={(e) => {
                    setFormData((v) => {
                      return { ...v, phone_number: e.target.value };
                    });
                  }}
                  type="tel"
                  className={clsx(
                    "flex w-full items-center gap-2.5 rounded-2xl py-3 pl-4 pr-3 text-[#17a3b8]",
                    formData.phone_number
                      ? "border border-[#17a3b8]/20"
                      : "border border-gray-300",
                  )}
                  placeholder="085xxxxxxxxx"
                  autoComplete="off"
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Error & Navigation */}
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-1 flex-col gap-2.5">
            <div className="flex max-w-[80%] items-center rounded-lg bg-[#ff0000]/10 p-2.5">
              <Danger />
              <p className="ml-2.5 text-xs font-normal text-[#ff0000]">
                Pastikan anda mengisi semua form, jika terdapat form isian
                pendaftaran yang terlewatkan maka anda tidak dapat menekan
                tombol Selanjutnya!
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              className="w-[200px] rounded-2xl bg-[#ff0000]"
              onClick={() => {
                router.back();
              }}
            >
              Kembali
            </Button>

            <Button
              className="w-[200px] rounded-2xl bg-[#17a3b8]"
              type="submit"
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormComponent;
