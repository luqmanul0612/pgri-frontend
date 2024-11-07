"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IMemberByIdResponse } from "@/interfaces/IMemberById";
import { getMemberById } from "../serverActions/member";
import { FaArrowLeft } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";


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

    {/* tab header */}
    <div className=" flex justify-between border-b border-black/50">
      <div className="text-xs">
        <span className="text-gray-500">Dashboard / Anggota / </span><span className="text-primary">Detail Data Anggota</span>
      </div>
    <div>
      Tab
    </div>
    </div>

{/* info profile header */}
    <div className="bg-primary rounded-xl flex justify-between mt-4 p-3">
      <div className="flex items-center">
        <div className="flex justify-center items-center h-[80px] w-[80px] mr-4 bg-white rounded-xl">
        <FiUser size={50} className="text-primary" />
        </div>
        <div className="text-white gap-1 flex flex-col">
          <div>{memberData?.data?.user?.name} ({memberData?.data?.user?.npa_number}) </div>
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



    </div>
  );
};

export default AnggotaDetail;
