import React, { Dispatch, FC, SetStateAction } from 'react'
import { IFormData } from '../page';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Danger from '../../../../../public/assets/danger';
import { useRouter } from "next/navigation";
import { useRegistrationStepStore } from '@/store/use-registration-step-store';


interface UangPangkalProps {
    formData: IFormData; // nanti diedit
    setFormData: Dispatch<SetStateAction<IFormData>>;
  }

const UangPangkal: FC<UangPangkalProps> = ({
    formData,
    setFormData,
  }) => {
  const router = useRouter()
  const {setStep} = useRegistrationStepStore()
  return (
    <div className='w-full max-w-[600px] rounded-2xl border border-[#17a3b8]/20 p-4'>
        <div className='bg-[#17a3b8]/20 rounded-md text-[#17a3b8] items-center flex flex-col p-5'>
            <h2 className='text-[16px]'>Total Bayar</h2>
            <h1 className='text-[34px] font-bold'>Rp. 15.000</h1>
            <div className='flex text-[12px]'><Image alt='uang-pangkal' src={'/assets/money-tick.png'} width={14} height={14}/><span className='ml-1'>Uang Pangkal</span></div>
        </div>

        <div className='my-4'>
            <h1 className='text-xs text-[#17191C]'>Uang pangkal adalah uang komitmen untuk seluruh anggota baru PGRI (Persatuan Guru Republik Indonesia) dan wajib dibayarkan diawal pendaftaran. Kamu dapat melakukan Pembayaran dengan Via Bank, Alfamart dan Indomart</h1>
        </div>

        <div className="flex items-center rounded-lg bg-[#ff0000]/10 p-2.5">
              <Danger />
              <p className="ml-2.5 text-xs font-normal text-[#ff0000]">
                Pastikan anda mengisi semua form, jika terdapat form isian
                pendaftaran yang terlewatkan maka anda tidak dapat menekan
                tombol Selanjutnya!
              </p>
            </div>

        <div className="flex gap-4 mt-12 mb-4">
          <Button 
          className="rounded-2xl bg-white border-red text-[#17a3b8]  border ring-[#17a3b8] ring-1 w-full" 
          onClick = {()=> router.push('/')}>Lewati</Button>
        <Button className="rounded-2xl bg-[#17a3b8] w-full">Bayar</Button>
        </div>
        <Button className="rounded-2xl bg-[#ff0000] w-full"           
        onClick={() => {
            setStep(3);
          }}>Kembali</Button>
    </div>
  )
}

export default UangPangkal