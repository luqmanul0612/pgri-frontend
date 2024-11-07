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
      <div className="flex items-center gap-2 mb-4 font-bold">
        <button className="cursor-pointer" onClick={() => router.back()}><FaArrowLeft /></button>
        <span>Detail Data Anggota</span>
      </div>

      <TabGroup>
      <TabList className=" flex justify-between border-b border-black/50">
      <div className="flex justify-center items-center">      
        <div className="text-xs">
        <span className="text-gray-500">Dashboard / Anggota / </span><span className="text-primary">Detail Data Anggota</span>
      </div>
      </div>
      <div>
      <Tab className={({ selected }) =>
          selected ? " text-primary p-2 border-b-2 border-primary focus:outline-none" : " text-gray-600 p-2 rounded border-b-2 border-transparent focus:outline-none"
        }>
          Data Pribadi
        </Tab>
        <Tab className={({ selected }) =>
          selected ? " text-primary p-2 border-b-2 border-primary focus:outline-none" : " text-gray-600 p-2 rounded border-b-2 border-transparent  focus:outline-none"
        }>
          Data Pekerjaan
        </Tab>
        <Tab className={({ selected }) =>
          selected ? " text-primary p-2 border-b-2 border-primary focus:outline-none" : " text-gray-600 p-2 rounded focus:outline-none border-b-2 border-transparent "
        }>
          Foto
        </Tab>
      </div>

      </TabList>

{/* info profile header */}
<div className="bg-primary rounded-xl flex justify-between mt-5 p-3">
      <div className="flex items-center">
        <div className="flex justify-center items-center h-[80px] w-[80px] mr-4 bg-white rounded-xl">
        <FiUser size={50} className="text-primary" />
        </div>
        <div className="text-white gap-1 flex flex-col">
          <div>{memberData?.data?.user?.name} {memberData?.data?.user?.npa_number ? "("+memberData?.data?.user.npa_number+")" : ""} </div>
          <div className="text-xs">{memberData?.data?.user?.email}</div>
          <div className="text-xs">{memberData?.data?.institution?.city}, {memberData?.data?.institution?.province}</div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <button className="bg-white rounded-xl text-red-500 text-xs font-semibold flex gap-1 px-4 py-3 justify-center items-center max-h-20">
        <IoIosCloseCircle className="" size={18}/>
        Belum diverivikasi
        </button>
        <button className="max-h-20 flex flex-row items-center bg-white justify-center gap-1 rounded-xl border border-primary px-3 py-3 text-sm text-primary">
              <span>Cetak</span> <MdOutlineLocalPrintshop size={18} />
            </button>
      </div>
    </div>

      <TabPanels className="mt-2">
        {/* Data pribadi */}
        <TabPanel className="border border-primary rounded-xl mt-5 p-4">
        <div className="">
      <div className="text-primary font-bold mb-5">Data Pribadi</div>
      <div className="flex">
        <div className="w-1/3">
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Nama & Gelar</span>
          <span className="text-sm">{memberData?.data?.user?.name || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">NIK</span>
          <span className="text-sm">{memberData?.data?.user?.nik || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">NPA (Nomor Pokok Anggota)</span>
          <span className="text-sm">{memberData?.data?.user?.npa_number || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Email</span>
          <span className="text-sm">{memberData?.data?.user?.email || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Tempat Lahir</span>
          <span className="text-sm">{memberData?.data?.user?.birth_place || "-"}</span>
        </div>
        </div>

        <div className="w-1/3">
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Tanggal Lahir</span>
          <span className="text-sm">{memberData?.data?.user?.dob || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Pendidikan/Ijazah Terakhir</span>
          <span className="text-sm">{memberData?.data?.user?.latest_education || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Jenis Kelamin</span>
          <span className="text-sm">{memberData?.data?.user?.gender || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Agama</span>
          <span className="text-sm">{memberData?.data?.user?.religion || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Golongan Darat</span>
          <span className="text-sm">{memberData?.data?.user?.blood_type || "-"}</span>
        </div>
        </div>

        <div className="w-1/3">
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Alamat KTP</span>
          <span className="text-sm">{memberData?.data?.user?.address || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Kode Pos</span>
          <span className="text-sm">{memberData?.data?.user?.postal_code || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Nomor Handphone</span>
          <span className="text-sm">{memberData?.data?.user?.phone_number || "-"}</span>
        </div>
        </div>

      </div>

    </div>
        </TabPanel>
        {/* Data pekerjaan */}
        <TabPanel className="border border-primary rounded-xl mt-5 p-4">
        <div className="">
        <div className="text-primary font-bold mb-5">Data Pekerjaan</div>
        <div className="flex">
        <div className="w-1/3">
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Provinsi Tempat Tugas</span>
          <span className="text-sm">{memberData?.data?.institution?.province || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Kabupaten/Kota/Kota Adm Tempat Tugas</span>
          <span className="text-sm">{memberData?.data?.institution?.city || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Kecamatan/Cabang/Distrik Tempat Tugas</span>
          <span className="text-sm">{memberData?.data?.institution?.district || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Desa/Kelurahan</span>
          <span className="text-sm">{memberData?.data?.institution?.sub_district || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Nama Instansi Tempat Tugas</span>
          <span className="text-sm">{memberData?.data?.institution?.name || "-"}</span>
        </div>
        </div>
        <div className="w-1/3">
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Alamat Tempat Tugas</span>
          <span className="text-sm">{memberData?.data?.institution?.address || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Pekerjaan</span>
          <span className="text-sm">{memberData?.data?.institution?.job_title || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Status Kepegawaian</span>
          <span className="text-sm">{memberData?.data?.institution?.employee_status || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Pangkat/Golongan</span>
          <span className="text-sm">{memberData?.data?.institution?.grade || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Sertifikasi Pendidik</span>
          <span className="text-sm">{memberData?.data?.institution?.educator_certificate??"-"}</span>
        </div>
        </div>
        <div className="w-1/3">
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Jenjang Mengajar</span>
          <span className="text-sm">{memberData?.data?.institution?.stage || "-"}</span>
        </div>
        <div className="flex flex-col mb-3">
          <span className="text-gray-500 text-xs">Mata Pelajaran</span>
          <span className="text-sm">{memberData?.data?.institution?.study_subjects || "-"}</span>
        </div>
        </div>
        </div>
        </div>
          </TabPanel>
          {/* Foto */}
        <TabPanel className="border border-primary rounded-xl mt-5 p-4">
        <div className="">
        <div className="text-primary font-bold mb-5">Foto & E-KTP</div>
        <div className="flex gap-4">
        <div className="bg-gray-300 rounded-xl w-[200px] h-[220px]">
  <img src={Array.isArray(memberData?.data?.photo?.profile) ? memberData.data.photo.profile[0] : memberData?.data?.photo?.profile} alt="foto" />
</div>
<div className="bg-gray-300 rounded-xl w-[300px] h-[220px]">
  <img src={Array.isArray(memberData?.data?.photo?.ktp) ? memberData.data.photo.ktp[0] : memberData?.data?.photo?.ktp} alt="foto" />
</div>
        </div>
        </div>
          </TabPanel>
      </TabPanels>
    </TabGroup>

          {/* button verify */}
          <div className="mt-5 space-x-4 flex">
        <button className="border border-primary rounded-xl text-sm text-primary px-4 py-3 w-[250px]">
          Verifikasi
        </button>
        <button className=" bg-red-500 rounded-xl text-sm text-white px-4 py-3 w-[250px]">
          Tolak
        </button>
      </div>

    </div>
  );
};

export default AnggotaDetail;
