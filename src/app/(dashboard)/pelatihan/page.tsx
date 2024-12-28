"use client"

import React from 'react'
import CardPelatihan from "@/app/(dashboard)/pelatihan/components/CardPelatihan";
import SearchPelatihan from "@/app/(dashboard)/pelatihan/components/SearchPelatihan";
import { useRouter } from "next/navigation";

const PelatihanPage = () => {
  const router = useRouter();
  const dataPelatihan: any[] = [
    {
      judul: "Metode Pengajaran Dengan AI Untuk Guru"
    },
    {
      judul: "Metode Pengajaran Dengan AI Untuk Guru"
    },
    {
      judul: "Metode Pengajaran Dengan AI Untuk Guru"
    },
    {
      judul: "Metode Pengajaran Dengan AI Untuk Guru"
    },
    {
      judul: "Metode Pengajaran Dengan AI Untuk Guru"
    },
    {
      judul: "Metode Pengajaran Dengan AI Untuk Guru"
    }
  ]

  const handleView = (index: number) => {
    router.push(`/pelatihan/view/${index}`);
  }
  return (
    <>
      <SearchPelatihan />
      <div className={'grid grid-cols-4 gap-6'}>
        { dataPelatihan.map((pelatihan, index : number) => (
          <CardPelatihan onClick={() => handleView(index)} key={index} />
        )) }
      </div>
    </>
  )
}

export default PelatihanPage
