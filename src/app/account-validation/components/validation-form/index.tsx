import Button from "@/components/customs/button";
import { useValidationForm } from "../../utils/use-validation-form";
import { useRouter } from "next/navigation";
import Datepicker from "@/components/customs/datepicker";
import TextField from "@/components/customs/textfield";
import Select from "@/components/customs/select";
import Required from "@/components/customs/required";

const genderOptions = [
  { key: "laki-laki", label: "Laki-Laki" },
  { key: "perempuan", label: "Perempuan" },
];

const religionOptions = [
  { key: "islam", label: "Islam" },
  { key: "Kristen Protestan", label: "Kristen Protestan" },
  { key: "Kristen Katolik", label: "Kristen Katolik" },
  { key: "Hindu", label: "Hindu" },
  { key: "Buddha", label: "Buddha" },
  { key: "Konghucu", label: "Konghucu" },
];

const educationOptions = [
  { key: "SMA/SMK", label: "SMA/SMK" },
  { key: "D3", label: "D3" },
  { key: "S1", label: "S1" },
  { key: "S2", label: "S2" },
  { key: "S3", label: "S3" },
];

const bloodTypeOptions = [
  { key: "A", label: "A" },
  { key: "B", label: "B" },
  { key: "AB", label: "AB" },
  { key: "O", label: "O" },
];

const jobOptions = [
  { key: "Guru", label: "Guru" },
  { key: "Tenaga Administrasi", label: "Tenaga Administrasi" },
  { key: "Dosen", label: "Dosen" },
  { key: "Kepala Sekolah", label: "Kepala Sekolah" },
  { key: "Pengawas", label: "Pengawas" },
  { key: "Lainnya", label: "Lainnya.." },
];

const employmentStatusOptions = [
  { key: "ASN PNS", label: "ASN PNS" },
  { key: "ASN PPPK", label: "ASN PPPK" },
  { key: "Honorer", label: "Honorer" },
  { key: "GTY", label: "GTY" },
  { key: "GTTY", label: "GTTY" },
  { key: "Dosen ASN", label: "Dosen ASN" },
  { key: "Dosen Tetap Yayasan", label: "Dosen Tetap Yayasan" },
  { key: "Dosen Tidak Tetap Yayasan", label: "Dosen Tidak Tetap Yayasan" },
];

const educatorCertificateOptions = [
  { key: "true", label: "SUDAH" },
  { key: "false", label: "BELUM" },
];

const teachingLevelOptions = [
  { key: "PAUD", label: "PAUD" },
  { key: "TK", label: "TK" },
  { key: "SD/MI", label: "SD/MI" },
  { key: "SMP/MTS", label: "SMP/MTS" },
  { key: "SMA/MA", label: "SMA/MA" },
  { key: "SMK", label: "SMK" },
  { key: "PT", label: "PT" },
  { key: "Sekolah Luar Biasa (SLB)", label: "Sekolah Luar Biasa (SLB)" },
  { key: "Lainnya", label: "Lainnya" },
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
              <TextField
                label={<Required>NIK (Nomor Induk Kependudukan)</Required>}
                placeholder="Masukkan NIK"
              />
              <TextField
                label={<Required>Email</Required>}
                placeholder="Masukkan Email"
              />
              <TextField
                label={<Required>Tempat Lahir</Required>}
                placeholder="Masukkan Tempat Lahir"
              />
              <Datepicker
                label={<Required>Tanggal Lahir</Required>}
                placeholder="Masukkan Tanggal Lahir"
              />
              <TextField
                label={<Required>Nomor Handphone</Required>}
                placeholder="Masukkan Nomor Handphone"
              />
            </div>
            <div className="flex w-full flex-col gap-4">
              <Select
                label="Jenis Kelamin"
                placeholder="Pilih Jenis Kelamin"
                options={genderOptions}
              />
              <Select
                label="Pendidikan/Ijazah Terakhir"
                placeholder="Pilih Pendidikan/Ijazah Terakhir"
                options={educationOptions}
              />
              <Select
                label="Agama"
                placeholder="Pilih Agama"
                options={religionOptions}
              />
              <Select
                label="Golongan Darah"
                placeholder="Pilih Golongan Darah"
                options={bloodTypeOptions}
              />
              <TextField
                label="Alamat KTP"
                placeholder="Masukkan Alamat Sesuai KTP"
              />
              <TextField
                label={<Required>Kode Pos</Required>}
                placeholder="Masukkan Kode Pos"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="rounded-[8px] bg-primary-500 px-4 py-3 text-[16px] font-bold text-white">
            Validasi Data Pekerjaan
          </div>
          <div className="flex gap-[26px] py-4">
            <div className="flex w-full flex-col gap-4">
              <TextField
                label={<Required>Nama Instansi Tempat Tugas</Required>}
                placeholder="Masukkan Nama dan Gelar"
              />
              <Select
                label={<Required>Provinsi Tempat Tugas</Required>}
                placeholder="Pilih Provinsi"
                options={[]}
              />
              <Select
                label={
                  <Required>
                    Provinsi Kabupatan/Kota/Kota Administrasi Tempat Tugas
                  </Required>
                }
                placeholder="Pilih Kabupaten/Kota/Kota Administrasi Tempat Tugas"
                options={religionOptions}
              />
              <Select
                label={
                  <Required>Kecamatan/Cabang/Distrik Tempat Tugas</Required>
                }
                placeholder="Pilih Kecamatan/Cabang/Distrik Tempat Tugas"
                options={religionOptions}
              />
              <Select
                label={<Required>Desa/Kelurahan Tempat Tugas</Required>}
                placeholder="Pilih Desa/Kelurahan Tempat Tugas"
                options={religionOptions}
              />
              <TextField
                label={<Required>Alamat Tempat Tugas</Required>}
                placeholder="Masukkan Alamat Tempat Tugas"
              />
            </div>
            <div className="flex w-full flex-col gap-4">
              <Select
                label="Pekerjaan"
                placeholder="Pilih Pekerjaan"
                options={jobOptions}
              />
              <Select
                label="Status Kepegawaian"
                placeholder="Pilih Status Kepegawaian"
                options={employmentStatusOptions}
              />
              <Select
                label="Pangkat/Golongan"
                placeholder="Pilih Pangkat/Golongan"
                options={religionOptions}
              />
              <Select
                label="Sertifikat Pendidik"
                placeholder="Pilih Sertifikat Pendidik"
                options={educatorCertificateOptions}
              />
              <Select
                label="Jenjang Mengajar"
                placeholder="Pilih Jenjang Mengajar"
                options={teachingLevelOptions}
              />
              <Select
                label="Mata Pelajaran"
                placeholder="Pilih Mata Pelajaran"
                options={religionOptions}
              />
            </div>
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
