import React, { Fragment } from "react";
import TableMutasiAnggota from "@/app/(dashboard)/mutasianggota/component/TableMutasiAnggota";
import { Filter } from "@/app/(dashboard)/components/Filter";

const MutasiAnggota = () => {
  return (
    <Fragment>
      <div>
        <p className="font-semibold text-primary mb-2">Data Tabel Anggota PGRI</p>
        <div className={'mb-5'}>
          <Filter />
        </div>
        <TableMutasiAnggota />
      </div>
    </Fragment>
  )
}

export default MutasiAnggota
