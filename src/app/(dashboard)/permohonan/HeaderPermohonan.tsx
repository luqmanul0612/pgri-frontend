import React from 'react'
import CardSVG from '../../../../public/icon/card'
import CardBlackSVG from '../../../../public/icon/cardBlack'

const HeaderPermohonan = () => {
  return (
    <div className='p-4 flex items-center rounded-xl border border-custom-aqua bg-white gap-3'>
    <div className='flex-1'>
      <div className='text-primary text-[16px] font-semibold'>Permohonan Anggota PGRI</div>
      <div className='text-[42px] text-primary font-bold'>4</div>
    </div>

    <div className='bg-primary rounded-xl w-[200px] p-4'>
      <div className='flex justify-between'>
        <div className='text-white text-lg  font-semibold'>2</div>
        <div><CardSVG/></div>
      </div>

      <div>
        <div className='font-bold text-[16px] text-white'>Permohonan</div>
        <div className='text-xs text-white'>Cetak KTA Biasa</div>
      </div>
    </div>

    <div className='bg-white border border-custom-aqua rounded-xl w-[200px] p-4'>
      <div className='flex justify-between'>
        <div className=' text-lg  font-semibold'>2</div>
        <div><CardBlackSVG/></div>
      </div>

      <div>
        <div className='font-semibold text-[16px] '>Permohonan</div>
        <div className='text-xs text-[#919191] '>Cetak KTA Smart Card</div>
      </div>
    </div>

  </div>
  )
}

export default HeaderPermohonan