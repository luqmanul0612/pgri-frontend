import React from 'react'
import CardSVG from '../../../../public/icon/card'
import CardBlackSVG from '../../../../public/icon/cardBlack'
import BookWhiteSVG from '../../../../public/icon/BookWhite'
import BookSVG from '../../../../public/icon/Book'

const HeaderKaryaGuru = () => {
  return (
    <div className='p-4 flex items-center rounded-xl border border-custom-aqua bg-white gap-3'>
    <div className='flex-1'>
      <div className='text-primary text-[16px] font-semibold'>Total Karya Guru</div>
      <div className='text-[42px] text-primary font-bold'>2.344.046</div>
    </div>

    <div className='bg-primary rounded-xl w-[200px] p-4'>
      <div className='flex justify-between'>
        <div className='text-white text-lg  font-semibold'>2</div>
        <div><BookWhiteSVG/></div>
      </div>

      <div>
        <div className='font-bold text-[16px] text-white'>Karya Guru</div>
        <div className='text-xs text-white'>Diterima</div>
      </div>
    </div>

    <div className='bg-white border border-custom-aqua rounded-xl w-[200px] p-4'>
      <div className='flex justify-between'>
        <div className=' text-lg  font-semibold'>2</div>
        <div><BookSVG/></div>
      </div>

      <div>
        <div className='font-semibold text-[16px] '>Karya Guru</div>
        <div className='text-xs text-[#919191] '>Ditolak</div>
      </div>
    </div>

  </div>
  )
}

export default HeaderKaryaGuru