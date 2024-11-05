import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
export function SearchInput({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-[300px] rounded-lg bg-white p-2", className)}>
      <Image
        src={"/assets/search.svg"}
        alt="search"
        width={18}
        height={18} />
      <input
        placeholder="Ketik Nama, NPA"
        className="w-full px-3 outline-none text-sm" />
    </div>
  )
}

