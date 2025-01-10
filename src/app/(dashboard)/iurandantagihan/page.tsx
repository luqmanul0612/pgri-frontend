import React from 'react'
import HeaderIuranTagihan from "@/app/(dashboard)/iurandantagihan/components/HeaderIuranTagihan";
import TableIuranTagihan from "@/app/(dashboard)/iurandantagihan/components/TableIuranTagihan";

const IuranDanTagihan = () => {
  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <HeaderIuranTagihan />
        <TableIuranTagihan />
      </div>
    </>
  )
}

export default IuranDanTagihan;
