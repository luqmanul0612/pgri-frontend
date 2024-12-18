"use client";

import React, { Fragment, useState } from "react";
import ChartStatistic from "@/app/(dashboard)/statistik/component/ChartStatistic";
import clsx from "clsx";

interface ICategory {
  label: string,
  value: string,
}

const StatistikPage = () => {
  const categoryStatistic: ICategory[] = [
    {
      label: "Jenis Kelamin & Umur",
      value: 'C01'
    },
    {
      label: "Kualifikasi Pendidikan",
      value: 'C02'
    },
    {
      label: "Tempat Mengajar",
      value: 'C03'
    },
    {
      label: "Provinsi",
      value: 'C04'
    },
    {
      label: "Sertifikat Pendidik",
      value: 'C05'
    }
  ]

  const [selectCategoryStatistic, setSelectCategoryStatistic] = useState<string>('C01');

  const handleClickCategory = (category: ICategory) => {
    setSelectCategoryStatistic(category.value)
  }
  return (
    <Fragment>
      <div className={'flex justify-between mb-8'}>
        <h2 className={'text-primary font-semibold'}>Statistik Data Anggota | 0-100K</h2>
        <div className={'flex gap-3.5'}>
          { categoryStatistic.map((category: ICategory, index: number) => (
            <button
              onClick={() => handleClickCategory(category)}
              key={index}
              className={clsx(
                'text-xs  py-2.5 px-2.5 rounded-[10px]',
                { 'bg-primary text-white border border-primary': selectCategoryStatistic === category.value },
                { 'bg-white text-primary border border-primary': selectCategoryStatistic !== category.value }
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      <ChartStatistic categoryChart={selectCategoryStatistic}/>
    </Fragment>
  )
}

export default StatistikPage
