import React from 'react';
import Image from 'next/image';

interface CardDashboardProps {
  name: string;
  total: number;
}

const CardDashboard: React.FC<CardDashboardProps> = ({ name, total }) => {
  const getBackgroundColor = (name: string) => {
    switch (name) {
      case 'Data Anggota':
        return 'bg-[#007BFF]';
      case 'Karya Guru':
        return 'bg-[#FFC107]';
      case 'Aspirasi Guru':
        return 'bg-[#001F3F]';
      case 'Lindungi Guru':
        return 'bg-[#DC3545]';
      default:
        return 'bg-gray-200';
    }
  };

  const getIconSrc = (name: string) => {
    switch (name) {
      case 'Data Anggota':
        return '/icon/people.png';  
      case 'Karya Guru':
        return '/icon/pencil.png';    
      case 'Aspirasi Guru':
        return '/icon/box-file.png'; 
      case 'Lindungi Guru':
        return '/icon/security-user.png'; 
      default:
        return '/icon/people.png';       
    }
  };

  return (
    <div className={`flex items-center w-full  ${getBackgroundColor(name)} rounded-2xl p-5 shadow-custom-shadow`}>
      <div className="flex items-center gap-4">
        <div className='h-[50px] w-[50px] bg-white items-center flex justify-center rounded-xl'>
        <Image src={getIconSrc(name)} alt={`${name} icon`} width={40} height={40} priority/>            
        </div>
      </div>
      <div className='ml-5'>
      <span className="text-[16px] font-normal  text-white">{name}</span>
      <div className="text-xl font-bold text-white">{total}</div>        
      </div>

    </div>
  );
};

export default CardDashboard;
