"use client"
import React, { useState } from 'react'
import { FaBookBookmark } from "react-icons/fa6";


const HeaderKaryaGuru = () => {
  const [activeButton, setActiveButton] = useState('diterima');

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
  };
  return (
    <div className='p-4 flex items-center rounded-xl border border-custom-aqua bg-white gap-3'>
    <div className='flex-1'>
      <div className='text-primary text-[16px] font-semibold'>Total Karya Guru</div>
      <div className='text-[42px] text-primary font-bold'>2.344.046</div>
    </div>

    <button
        onClick={() => handleButtonClick('diterima')}
        className={`diterima ${
          activeButton === 'diterima' ? 'bg-primary text-white' : 'bg-white text-[#919191]'
        } rounded-xl w-[200px] p-4 border transition-all ${
          activeButton === 'diterima' ? '' : 'border-custom-aqua'
        }`}
      >
        <div className="flex justify-between">
          <div className="text-lg font-semibold">2</div>
          <div>
            <FaBookBookmark size={20} />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="font-bold text-[16px] text-left">Karya Guru</div>
          <div className="text-xs text-left">Diterima</div>
        </div>
      </button>

      <button
        onClick={() => handleButtonClick('ditolak')}
        className={`ditolak ${
          activeButton === 'ditolak' ? 'bg-primary text-white' : 'bg-white text-[#919191]'
        } rounded-xl w-[200px] p-4 border ${
          activeButton === 'ditolak' ? '' : 'border-custom-aqua'
        }`}
      >
        <div className="flex justify-between">
          <div className="text-lg font-semibold">2</div>
          <div>
            <FaBookBookmark size={20}/>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="font-semibold text-[16px] text-left">Karya Guru</div>
          <div className="text-xs text-left">Ditolak</div>
        </div>
      </button>

  </div>
  )
}

export default HeaderKaryaGuru