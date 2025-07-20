"use client";

import TextField from "@/components/customs/textfield";
import Search from "../assets/search.svg";
import Grid from "../assets/grid.svg";
import List from "../assets/list.svg";
import ArrowRight from "../assets/arrow-right.svg";
import ArrowUp from "../assets/arrow-up.svg";
import ArrowDown from "../assets/arrow-down.svg";
import { cn } from "@/lib/utils";
import { useState } from "react";
import example1 from "../assets/dummy/example-1.png";
import example2 from "../assets/dummy/example-2.png";
import example3 from "../assets/dummy/example-3.png";
import example4 from "../assets/dummy/example-4.png";
import Image from "next/image";
import Button from "@/components/customs/button";
import { useRouter } from "next/navigation";

const exampleActivities = [
  {
    id: "1",
    title: "WEBINAR SERIES 2 - HARDIKNAS 2025",
    content:
      "Dalam rangka memperingati Hari Pendidikan Nasional 2025, PGRI Muaro Jambi bekerja sama dengan PSLLC Pusat dan Maxy Academy menyelenggarakan Webinar Series 2 dengan tema:",
    image: example1,
  },
  {
    id: "2",
    title: "Parade Inovasi Guru Nusantara (PINTAR) edisi Mei Tahun 2025.",
    content:
      "Menyambut HARDIKNAS, HARKITNAS dan Hari Kesaktian Pancasila Tahun 2025, SLCC PB PGRI bersama SLCC PGRI Provinsi, Kabupaten dan Kota di seluruh Nusantara serta didukung Intan Pariwara, menyelenggarakan Parade Inovasi Guru Nusantara (PINTAR) edisi Mei Tahun 2025.",
    image: example2,
  },
  {
    id: "3",
    title:
      "Merancang Media Pembelajaran Mendalam dengan Canva AI dan Quizizz AI",
    content:
      "Menyambut HARDIKNAS, HARKITNAS dan Hari Kesaktian Pancasila Tahun 2025, SLCC PB PGRI bersama SLCC PGRI Provinsi Bantenmenyelenggarakan Parade Inovasi Guru Nusantara (PINTAR) edisi Mei Tahun 2025. ",
    image: example3,
  },
  {
    id: "4",
    title: "Diklat APKS PB PGRI: Bulan Guru Bulan PGRI",
    content:
      "Pendidikan dan pelatihan melalui moda daring selama 12 kali pertemuan dengan tema beragam.",
    image: example4,
  },
];

const tabs = [
  { label: "Grid", icon: <Grid /> },
  { label: "List", icon: <List /> },
];

const UserSection = () => {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  return (
    <div className="flex flex-col">
      <p className="text-base font-semibold text-black">
        Kegiatan Terkini PGRI (Persatuan Guru Republik Indonesia)
      </p>
      <p className="text-primary-500 text-sm font-normal">
        Tersedia untuk kegiatan PGRI Pusat dan daerah
      </p>
      <div className="mt-5 flex justify-between">
        <div className="flex gap-3">
          {tabs.map((tabItem, idx) => (
            <button
              key={tabItem.label}
              className={cn(
                "flex items-center gap-1 border-b-[3px] border-transparent text-lg font-bold text-slate-400 transition-all",
                {
                  "text-primary-500 border-primary-500": idx === tab,
                },
              )}
              onClick={() => setTab(idx)}
            >
              {tabItem.icon}
              {tabItem.label}
            </button>
          ))}
        </div>
        <div className="flex">
          <TextField
            placeholder="Cari Postingan"
            endIcon={<Search className="text-slate-400" />}
          />
        </div>
      </div>
      {tab === 0 && (
        <div className="mt-[20px] grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-[30px]">
          {exampleActivities.map((activity) => (
            <div key={activity.id} className="flex h-full flex-col">
              <div className="bg-primary-500 rounded-[14px] p-[25px]">
                <Image
                  alt="image"
                  src={activity.image}
                  className="aspect-[4/5] w-full rounded-[14px] object-cover"
                />
              </div>
              <p className="mt-3 truncate text-base font-bold text-black">
                {activity.title}
              </p>
              <p className="mb-3 mt-1 line-clamp-3 text-xs font-normal text-slate-500">
                {activity.content}
              </p>
              <Button
                fullWidth
                className="mt-auto w-full !justify-between"
                variant="secondary"
                endIcon={<ArrowRight />}
                onClick={() =>
                  router.push(`/dashboard/activity/${activity.id}`)
                }
              >
                Selengkapnya
              </Button>
            </div>
          ))}
        </div>
      )}
      {tab === 1 && (
        <div className="mt-[20px] flex flex-col gap-6">
          {exampleActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <div className="bg-primary-500 rounded-[8px] p-[10px]">
                <div className="relative aspect-[4/5] w-[80px] rounded-[8px] p-[10px]">
                  <Image
                    alt="image"
                    src={activity.image}
                    fill
                    className="rounded-[8px] object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="mt-3 truncate text-base font-bold text-black">
                  {activity.title}
                </p>
                <p className="mb-3 mt-1 line-clamp-3 text-xs font-normal text-slate-500">
                  {activity.content}
                </p>
              </div>
              <Button
                className="ml-auto !min-w-[150px] !justify-between"
                variant="secondary"
                endIcon={<ArrowRight />}
                onClick={() =>
                  router.push(`/dashboard/activity/${activity.id}`)
                }
              >
                Selengkapnya
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-black">Total Kegiatan</p>
          <p className="text-primary-500 text-xs font-normal">150 Kegiatan</p>
        </div>
        <div className="flex gap-7">
          <button
            className="bg-primary-500 aspect-square rounded-full border border-transparent p-2 text-white disabled:border-slate-400 disabled:bg-slate-100 disabled:text-slate-400"
            disabled
          >
            <ArrowUp />
          </button>
          <button className="bg-primary-500 aspect-square rounded-full border border-transparent p-2 text-white disabled:border-slate-400 disabled:bg-slate-100 disabled:text-slate-400">
            <ArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSection;
