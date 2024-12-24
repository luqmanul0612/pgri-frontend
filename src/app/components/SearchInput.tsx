import React, { useState } from "react";
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, className, placeholder = 'Ketik Nama, NPA' }) =>{
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };
  return (
    <div className={cn("flex w-[300px] rounded-lg bg-white p-2", className)}>
      <Image
        src={"/assets/search.svg"}
        alt="search"
        width={18}
        height={18} />
      <input
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className="w-full px-3 outline-none text-sm" />
    </div>
  )
}

