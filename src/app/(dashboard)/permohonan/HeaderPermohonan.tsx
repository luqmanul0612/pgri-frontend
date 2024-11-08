"use client"
import React, { useState } from 'react'
import { FaRegAddressCard } from "react-icons/fa";


const HeaderPermohonan = () => {
  const [activeButton, setActiveButton] = useState('kta-biasa');

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
  };
  return (
    <div className='p-4 flex items-center rounded-xl border border-custom-aqua bg-white gap-3'>
    <div className='flex-1'>
      <div className='text-primary text-[16px] font-semibold'>Permohonan Anggota PGRI</div>
      <div className='text-[42px] text-primary font-bold'>4</div>
    </div>

    <button
        onClick={() => handleButtonClick('kta-biasa')}
        className={`kta-biasa ${
          activeButton === 'kta-biasa' ? 'bg-primary text-white' : 'bg-white text-[#919191]'
        } rounded-xl w-[200px] p-4 border transition-all ${
          activeButton === 'kta-biasa' ? '' : 'border-custom-aqua'
        }`}
      >
        <div className="flex justify-between">
          <div className="text-lg font-semibold">2</div>
          <div>
            <FaRegAddressCard size={20} />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="font-bold text-[16px] text-left">Permohonan</div>
          <div className="text-xs text-left">Cetak KTA Biasa</div>
        </div>
      </button>

      <button
        onClick={() => handleButtonClick('kta-smart')}
        className={`kta-smart ${
          activeButton === 'kta-smart' ? 'bg-primary text-white' : 'bg-white text-[#919191]'
        } rounded-xl w-[200px] p-4 border ${
          activeButton === 'kta-smart' ? '' : 'border-custom-aqua'
        }`}
      >
        <div className="flex justify-between">
          <div className="text-lg font-semibold">2</div>
          <div>
            <FaRegAddressCard size={20}/>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="font-semibold text-[16px] text-left">Permohonan</div>
          <div className="text-xs text-left">Cetak KTA Smart Card</div>
        </div>
      </button>

  </div>
  )
}

export default HeaderPermohonan