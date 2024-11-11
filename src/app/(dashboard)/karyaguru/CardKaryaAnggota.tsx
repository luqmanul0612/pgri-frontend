import React from 'react'

const CardKaryaAnggota = () => {
  return (
    <div className="w-[calc(33.333%-16px)] rounded-2xl border border-custom-aqua bg-white mb-0" >
        <div className='flex justify-between pt-4'>
            <div className='flex pl-4 pr-0'>
                <div className='h-[36px] w-[36px] rounded-md bg-[#d9d9d9] flex'>
                    {/* <img src='' alt='img'/> */}
                </div>
                <div className='ml-2'>
                    <div className='text-sm font-semibold'>Mohammad Alfath, MM, S.Kom </div>
                    <div className='text-[10px] text-[#919191]'><span>NPA 20323222</span><span className='text-[#FF5A00]'> | Banyumas</span></div>
                </div>
            </div>
            <div className='text-white bg-[#ff5a00] text-xs flex items-center justify-center rounded-bl-full rounded-tl-full px-2 h-[32px] !min-w-[100px]'>
                10 Karya
            </div>
        </div>
        
        <div className='mt-4 p-4'>
            <div className='text-sm font-semibold'>Metode Belajar Lama VS Baru</div>
            <div className='text-sm'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur impedit, inventore reiciendis doloremque consequatur adipisci vel! Modi autem perspiciatis nobis explicabo, temporibus soluta quae? Odit sit enim fuga id earum?
            </div>
            <div className='text-xs text-[#ff5a00] mt-4'>
                Update terbaru : Senin 11 November 2024
            </div>

        </div>
    </div>
  )
}

export default CardKaryaAnggota