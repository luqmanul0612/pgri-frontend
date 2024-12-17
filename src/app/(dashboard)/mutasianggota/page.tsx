import React, { Fragment } from "react";
import TableMutasiAnggota from "@/app/(dashboard)/mutasianggota/component/TableMutasiAnggota";
import { Filter } from "@/app/(dashboard)/components/Filter";

const MutasiAnggota = () => {
  return (
    <Fragment>
      <div>
        <p className="font-semibold text-primary">Data Tabel Anggota PGRI</p>
        <Filter />
        <TableMutasiAnggota />
      </div>
    </Fragment>
  )
}

export default MutasiAnggota
