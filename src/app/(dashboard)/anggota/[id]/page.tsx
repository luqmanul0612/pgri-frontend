"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IMemberByIdResponse } from "@/interfaces/IMemberById";
import { getMemberById } from "../serverActions/member";
import { FaArrowLeft } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

interface pageProps {
  params: {
    id: string;
  };
}

const AnggotaDetail: FC<pageProps> = ({ params: { id } }) => {
  const router = useRouter();
  const [memberData, setMemberData] = useState<IMemberByIdResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!id) return;

      try {
        const data = await getMemberById(id as string);
        console.log("data response-->", data);
        setMemberData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch member data:", err);
        setError("Gagal mengambil data anggota.");
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [id]);
  return (
    <div>
      {/* header back */}
      <div className="mb-4 flex items-center gap-2 font-bold">
        <button className="cursor-pointer" onClick={() => router.back()}>
          <FaArrowLeft />
        </button>
        <span>Detail Data Anggota</span>
      </div>

      <TabGroup>
        <TabList className="flex justify-between border-b border-black/50">
          <div className="flex items-center justify-center">
            <div className="text-xs">
              <span className="text-gray-500">Dashboard / Anggota / </span>
              <span className="text-primary">Detail Data Anggota</span>
            </div>
          </div>
          <div>
            <Tab
              className={({ selected }) =>
                selected
                  ? "border-b-2 font-bold border-primary p-2 text-primary focus:outline-none text-sm"
                  : "rounded border-b-2 font-bold border-transparent p-2 text-gray-600 focus:outline-none text-sm"
              }
            >
              Data Pribadi
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "border-b-2 border-primary font-bold text-sm p-2 text-primary focus:outline-none"
                  : "rounded border-b-2 border-transparent p-2 text-gray-600 focus:outline-none font-bold text-sm"
              }
            >
              Data Pekerjaan
            </Tab>
            <Tab
              className={({ selected }) =>
                selected
                  ? "border-b-2 font-bold text-sm border-primary p-2 text-primary focus:outline-none"
                  : "rounded border-b-2 border-transparent p-2 text-gray-600 focus:outline-none font-bold text-sm"
              }
            >
              Foto
            </Tab>
          </div>
        </TabList>

        {/* info profile header */}
        <div className="mt-5 flex justify-between rounded-xl bg-primary p-3">
          <div className="flex items-center">
            <div className="mr-4 flex h-[80px] w-[80px] items-center justify-center rounded-xl bg-white">
              <FiUser size={50} className="text-primary" />
            </div>
            <div className="flex flex-col gap-1 text-white">
              <div>
                {memberData?.data?.user?.name}{" "}
                {memberData?.data?.user?.npa_number
                  ? "(" + memberData?.data?.user.npa_number + ")"
                  : ""}{" "}
              </div>
              <div className="text-xs">{memberData?.data?.user?.email}</div>
              <div className="text-xs">
                {memberData?.data?.institution?.city},{" "}
                {memberData?.data?.institution?.province}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex max-h-20 items-center justify-center gap-1 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-red-500">
              <IoIosCloseCircle className="" size={18} />
              Belum diverivikasi
            </button>
            <button className="flex max-h-20 flex-row items-center justify-center gap-1 rounded-xl border border-primary bg-white px-3 py-3 text-sm text-primary">
              <span>Cetak</span> <MdOutlineLocalPrintshop size={18} />
            </button>
          </div>
        </div>

        <TabPanels className="mt-2">
          {/* Data pribadi */}
          <TabPanel className="mt-5 rounded-xl border border-primary p-4">
            <div className="">
              <div className="mb-5 font-bold text-primary">Data Pribadi</div>
              <div className="flex">
                <div className="w-1/3">
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">Nama & Gelar</span>
                    <span className="text-sm">
                      {memberData?.data?.user?.name || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">NIK</span>
                    <span className="text-sm">
                      {memberData?.data?.user?.nik || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      NPA (Nomor Pokok Anggota)
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.user?.npa_number || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">Email</span>
                    <span className="text-sm">
                      {memberData?.data?.user?.email || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">Tempat Lahir</span>
                    <span className="text-sm">
                      {memberData?.data?.user?.birth_place || "-"}
                    </span>
                  </div>
                </div>

                <div className="w-1/3">
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">Tanggal Lahir</span>
                    <span className="text-sm">
                      {memberData?.data?.user?.dob || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Pendidikan/Ijazah Terakhir
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.user?.latest_education || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">Jenis Kelamin</span>
                    <span className="text-sm">
                      {memberData?.data?.user?.gender || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">Agama</span>
                    <span className="text-sm">
                      {memberData?.data?.user?.religion || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Golongan Darat
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.user?.blood_type || "-"}
                    </span>
                  </div>
                </div>

                <div className="w-1/3">
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">Alamat KTP</span>
                    <span className="text-sm">
                      {memberData?.data?.user?.address || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">Kode Pos</span>
                    <span className="text-sm">
                      {memberData?.data?.user?.postal_code || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Nomor Handphone
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.user?.phone_number || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* Data pekerjaan */}
          <TabPanel className="mt-5 rounded-xl border border-primary p-4">
            <div className="">
              <div className="mb-5 font-bold text-primary">Data Pekerjaan</div>
              <div className="flex">
                <div className="w-1/3">
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Provinsi Tempat Tugas
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.institution?.province || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Kabupaten/Kota/Kota Adm Tempat Tugas
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.institution?.city || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Kecamatan/Cabang/Distrik Tempat Tugas
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.institution?.district || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Desa/Kelurahan
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.institution?.sub_district || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Nama Instansi Tempat Tugas
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.institution?.name || "-"}
                    </span>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Alamat Tempat Tugas
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.institution?.address || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">Pekerjaan</span>
                    <span className="text-sm">
                      {memberData?.data?.institution?.job_title || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Status Kepegawaian
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.institution?.employee_status || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Pangkat/Golongan
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.institution?.grade || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Sertifikasi Pendidik
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.institution?.educator_certificate ??
                        "-"}
                    </span>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Jenjang Mengajar
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.institution?.stage || "-"}
                    </span>
                  </div>
                  <div className="mb-3 flex flex-col">
                    <span className="text-xs text-gray-500">
                      Mata Pelajaran
                    </span>
                    <span className="text-sm">
                      {memberData?.data?.institution?.study_subjects || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* Foto */}
          <TabPanel className="mt-5 rounded-xl border border-primary p-4">
            <div className="">
              <div className="mb-5 font-bold text-primary">Foto & E-KTP</div>
              <div className="flex gap-4">
                <div className="h-[220px] w-[200px] rounded-xl bg-gray-300">
                  <img
                    src={
                      Array.isArray(memberData?.data?.photo?.profile)
                        ? memberData.data.photo.profile[0]
                        : memberData?.data?.photo?.profile
                    }
                    alt="foto"
                  />
                </div>
                <div className="h-[220px] w-[300px] rounded-xl bg-gray-300">
                  <img
                    src={
                      Array.isArray(memberData?.data?.photo?.ktp)
                        ? memberData.data.photo.ktp[0]
                        : memberData?.data?.photo?.ktp
                    }
                    alt="foto"
                  />
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {/* button verify */}
      <div className="mt-5 flex space-x-4">
        <button className="w-[250px] rounded-xl border border-primary px-4 py-3 text-sm text-primary">
          Verifikasi
        </button>
        <button className="w-[250px] rounded-xl bg-red-500 px-4 py-3 text-sm text-white">
          Tolak
        </button>
      </div>
    </div>
  );
};

export default AnggotaDetail;
