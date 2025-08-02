/* eslint-disable @next/next/no-img-element */
"use client";
import { FC, useEffect, useState } from "react";
import useAuth from "@/store/useAuth";
import ProfileBgLeft from "./assets/profile-bg-left.svg";
import ProfileBgRight from "./assets/profile-bg-right.svg";
import Image from "next/image";
import ExampleProfile from "./assets/example-profile.webp";
import ExamplePhoto from "./assets/user-example-photo.svg?url";
import VerifyIcon from "./assets/verify.svg";
import UserEditIcon from "./assets/user-edit.svg";
import PrinterIcon from "./assets/printer.svg";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import Button from "@/components/customs/button";
import { useRouter } from "next/navigation";
import { getInstitution } from "./action/getInstitution";

interface pageProps {
  params: Promise<{}>;
}

interface InstitutionData {
  stage: string;
  province: string;
  province_code: string;
  city: string;
  city_code: string;
  district: string;
  district_code: string;
  sub_district: string;
  sub_district_code: string;
  name: string;
  job_title: string;
  address: string;
  grade: string;
  employee_status: string;
  educator_certificate: boolean;
  study_subjects: string;
  created_at: string;
  updated_at: string;
}

const Page: FC<pageProps> = ({ params: {} }) => {
  const { auth } = useAuth();
  const [institution, setInstitution] = useState<InstitutionData | null>(null);
  const router = useRouter();
  const joinYear = dayjs(auth.createdAt).year();

  const userData = [
    { label: "Nama & Gelar", value: auth.name || "-" },
    { label: "NIK", value: auth.nik || "-" },
    {
      label: "NPA (Nomor Pokok Anggota)",
      value: auth.isVerified ? (
        auth.npaNumber
      ) : (
        <div className="text-red-500">Belum Tersedia</div>
      ),
    },
    { label: "Email", value: auth.email || "-" },
    { label: "Tempat Lahir", value: auth.birthPlace || "-" },
    {
      label: "Tanggal Lahir",
      value: auth.dob ? dayjs(auth.dob).format("DD/MM/YYYY") : "-",
    },
    { label: "Pendidikan/Ijazah Terakhir", value: auth.latestEducation || "-" },
    { label: "Jenis Kelamin", value: auth.gender || "-" },
    { label: "Agama", value: auth.religion || "-" },
    { label: "Golongan Darah", value: auth.bloodType || "-" },
    { label: "Alamat KTP", value: auth.address || "-" },
    { label: "Kode Pos", value: auth.postalCode || "-" },
    { label: "No Handphone", value: auth.phoneNumber || "-" },
  ];

  const jobData = [
    { label: "Provinsi Tempat Tugas", value: institution?.province || "-" },
    {
      label: "Kabupaten/Kota/Kota Administrasi Tempat Tugas",
      value: institution?.city || "-",
    },
    { label: "Kecamatan/Cabang/Distrik Tempat Tugas", value: institution?.district || "-" },
    { label: "Desa/Kelurahan", value: institution?.sub_district || "-" },
    { label: "Nama Instansi Tempat Tugas", value: institution?.name || "-" },
    {
      label: "Alamat Tempat Tugas",
      value: institution?.address || "-",
    },
    { label: "Pekerjaan", value: institution?.job_title || "-" },
    { label: "Status Kepegawaian", value: institution?.employee_status || "-" },
    { label: "Pangkat Golongan", value: institution?.grade || "-" },
    { label: "Sertifikasi Pendidik", value: institution?.educator_certificate ? "Sudah" : "Belum" },
    { label: "Jenjang Mengajar", value: institution?.stage || "-" },
    { label: "Mata Pelajaran", value: institution?.study_subjects || "-" },
  ];

  const handlePrint = () => {
    if (!auth.isVerified) {
      router.push("/account-verification");
      return;
    }
  };

  const handleEditProfile = () => {
    if (!auth.isVerified) {
      router.push("/account-verification");
      return;
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getInstitution();
      setInstitution(data.data);
    })();
  }, []);

  return (
    <div>
      <h3 className="text-base font-semibold text-black">Profilku</h3>
      <div className="relative mt-6 box-border flex h-[200px] items-center justify-between overflow-hidden rounded-[16px] bg-white px-16 py-4">
        <ProfileBgLeft className="absolute left-0 top-[50%] translate-y-[-50%]" />
        <ProfileBgRight className="absolute right-0 top-[50%] translate-y-[-50%]" />

        <div className="flex items-center gap-4">
          <Image
            src={ExampleProfile}
            alt="profile"
            className="z-10 aspect-square h-[120px] min-h-[120px] w-[120px] min-w-[120px] rounded-full object-cover"
          />
          <div className="z-10 flex flex-col">
            <div
              className={cn(
                "flex items-center gap-1 rounded-[26px] px-2 py-1 text-white",
                {
                  "bg-red-500": !auth.isVerified,
                  "bg-primary-500": auth.isVerified,
                },
              )}
            >
              <VerifyIcon width={18} height={18} />
              <p className="text-xs font-bold">
                {auth.isVerified ? "Terverifikasi" : "Belum Diverifikasi"}
              </p>
            </div>
            <p className="mt-3 text-base font-bold text-black">{auth.name}</p>
            <p className="mt-2 text-sm font-normal text-black">{auth.email}</p>
            <p className="mt-1 text-[10px] font-normal text-primary-500">
              Anggota Sejak {joinYear}
            </p>
          </div>
        </div>
        <div className="flex h-full items-end gap-4">
          <Button
            variant="secondary"
            endIcon={<PrinterIcon width={18} height={18} />}
            onClick={handlePrint}
          >
            Cetak Data Profil
          </Button>
          <Button
            variant="secondary"
            endIcon={<UserEditIcon width={18} height={18} />}
            onClick={handleEditProfile}
          >
            Edit Profil
          </Button>
        </div>
      </div>
      <div className="mt-7 flex flex-col">
        <h3 className="text-lg font-bold text-primary-500">Foto</h3>
        <div className="mt-4 flex gap-5">
          <Image
            src={ExamplePhoto}
            alt="photo"
            className="h-[233px] min-h-[233px] w-[200px] min-w-[200px] rounded-[16px] object-cover"
          />
          <Image
            src={ExamplePhoto}
            alt="photo"
            className="h-[233px] min-h-[233px] w-[336px] min-w-[336px] rounded-[16px] object-cover"
          />
        </div>
      </div>
      <div className="mt-7 flex flex-col">
        <h3 className="text-lg font-bold text-primary-500">Data Pribadi</h3>
        <table className="mt-4">
          <tbody>
            {userData.map((data, index) => (
              <tr key={index}>
                <td className="w-[300px] py-[10px] text-xs font-normal text-black">
                  {data.label}
                </td>
                <td className="py-[10px] text-sm font-normal text-black">
                  {data.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-7 flex flex-col">
        <h3 className="text-lg font-bold text-primary-500">Data Pekerjaan</h3>
        <table className="mt-4">
          <tbody>
            {jobData.map((data, index) => (
              <tr key={index}>
                <td className="w-[300px] py-[10px] text-xs font-normal text-black">
                  {data.label}
                </td>
                <td className="py-[10px] text-sm font-normal text-black">
                  {data.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
