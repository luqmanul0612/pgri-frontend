"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IMemberByIdResponse } from "@/interfaces/IMemberById";
import { getMemberById } from "../serverActions/member";
import { FaArrowLeft } from "react-icons/fa6";

interface pageProps {
  params: {
    id: string;
  };
}

const AnggotaDetail: FC<pageProps> = ({ params: { id } }) => {
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
      <div className="flex items-center gap-2 mb-4 font-bold">
        <div><FaArrowLeft /></div>
        <span>Detail Data Anggota</span>
      </div>
      <div>
        Data Pribadi
        {memberData?.data?.user?.name}
      </div>

      <div>Data Pekerjaan</div>

      <div>Foto</div>
    </div>
  );
};

export default AnggotaDetail;
