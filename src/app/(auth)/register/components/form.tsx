import { Input } from "@/components/ui/input";
import Danger from "../../../../../public/assets/danger";
import { FormField } from "@/app/components/FormField";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import "./dob.css";
import { useRegistrationStepStore } from "@/store/use-registration-step-store";
import {
  IFormData,
  useRegistrationFormStore,
} from "@/store/use-registration-form";

const FormComponent = () => {
  const { isLoading, errors, formData, updateField, sendFormForCheck } =
    useRegistrationFormStore();
  const { step, setStep } = useRegistrationStepStore();
  const router = useRouter();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const res = await sendFormForCheck();
    if (res.success) {
      setStep(step + 1);
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
                id="name"
                value={formData.name}
                onChange={(e) => {
                  updateField(e.target.id as keyof IFormData, e.target.value);
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
                  updateField(e.target.id as keyof IFormData, e.target.value);
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
                  updateField(e.target.id as keyof IFormData, e.target.value);
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
                  updateField(e.target.id as keyof IFormData, e.target.value);
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
                  updateField(e.target.id as keyof IFormData, e.target.value);
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
                    updateField(e.target.id as keyof IFormData, e.target.value);
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
                    updateField(e.target.id as keyof IFormData, e.target.value);
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
                  id="religion"
                  value={formData.religion}
                  onChange={(e) => {
                    updateField(e.target.id as keyof IFormData, e.target.value);
                  }}
                  className={clsx(
                    "w-full appearance-none rounded-2xl bg-transparent py-[8px] pl-4 pr-8 text-[#17a3b8] focus:border-[#17a3b8] focus:outline-none",
                    formData.religion
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
                  className={`absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform ${formData.religion ? "text-[#17a3b8]" : "text-gray-400"}`}
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
                    updateField(e.target.id as keyof IFormData, e.target.value);
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
                  updateField(e.target.id as keyof IFormData, e.target.value);
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
                    updateField(e.target.id as keyof IFormData, e.target.value);
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
                    updateField(e.target.id as keyof IFormData, e.target.value);
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
              disabled={isLoading}
            >
              {isLoading ? "Melakukan validasi..." : "Selanjutnya"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormComponent;
