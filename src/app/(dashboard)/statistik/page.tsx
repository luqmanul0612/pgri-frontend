import React, { Fragment } from "react";
import ChartStatistic from "@/app/(dashboard)/statistik/component/ChartStatistic";

const StatistikPage = () => {
  return (
    <Fragment>
      <div className={'flex justify-between mb-8'}>
        <h2 className={'text-primary font-semibold'}>Statistik Data Anggota | 0-100K</h2>
        <div className={'flex gap-3.5'}>
          <button className={'text-xs bg-primary py-2.5 px-2.5 text-white rounded-[10px]'}>
            Jenis Kelamin & Umur
          </button>
          <button className={'text-xs bg-primary py-2.5 px-2.5 text-white rounded-[10px]'}>
            Jenis Kelamin & Umur
          </button>
          <button className={'text-xs bg-primary py-2.5 px-2.5 text-white rounded-[10px]'}>
            Jenis Kelamin & Umur
          </button>
        </div>
      </div>
      <ChartStatistic />
    </Fragment>
  )
}

export default StatistikPage
