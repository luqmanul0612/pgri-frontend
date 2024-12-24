import React from 'react'
import CardPelatihan from "@/app/(dashboard)/pelatihan/add/components/CardPelatihan";
import SearchPelatihan from "@/app/(dashboard)/pelatihan/add/components/SearchPelatihan";

const PelatihanPage = () => {
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
  return (
    <>
      <SearchPelatihan />
      <div className={'grid grid-cols-4 gap-6'}>
        { dataPelatihan.map((pelatihan, index : number) => (
          <CardPelatihan key={index} />
        )) }
      </div>
    </>
  )
}

export default PelatihanPage
