import React, { Fragment } from "react";
import HeaderAspirasiGuru from "@/app/(dashboard)/aspirasiguru/components/HeaderAspirasiGuru";
import TableAspirasiGuru from "@/app/(dashboard)/aspirasiguru/components/TableAspirasiGuru";

const AspirasiGuruPage = () => {
  return (
    <Fragment>
      <HeaderAspirasiGuru />
      <div className={'mt-4'}>
        <TableAspirasiGuru />
      </div>
    </Fragment>
  )
}

export default AspirasiGuruPage;
