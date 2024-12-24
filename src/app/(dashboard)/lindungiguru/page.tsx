import React from 'react'
import HeaderLindungiGuru from "@/app/(dashboard)/lindungiguru/components/HeaderLindungiGuru";
import TableLindungiGuru from "@/app/(dashboard)/lindungiguru/components/TableLindungiGuru";

const LindungiGuruPage = () => {
  return (
    <div>
      <HeaderLindungiGuru />


      <div className={'mt-4'}>
        <TableLindungiGuru />
      </div>

    </div>
  )
}

export default LindungiGuruPage
