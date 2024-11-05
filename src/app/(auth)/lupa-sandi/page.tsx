"use client";
import { Footer } from "@/app/components/Footer";
import { FC, FormEvent, useState } from "react";
import { WAButton } from "@/app/components/WAButton";
import { Label } from "@/components/ui/label";
import Danger from "../../../../public/assets/danger";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface pageProps {
  params: {};
}

const Page: FC<pageProps> = ({ params: {} }) => {
  const [email, setEmail] = useState("");
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
  };

  return (
    <div className="flex h-screen flex-col items-center justify-between bg-[#f5f7fb]">
      <header className="flex h-20 w-full items-center justify-center bg-[#17a3b8] px-24 py-2.5">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-center text-2xl font-bold text-[#f5f7fb]">
            Perbaikan Kata Sandi
          </div>
          <div className="text-xs font-normal text-[#f5f7fb]">
            Kartu Tanda Anggota Persatuan Guru Republik Indonesia
          </div>
        </div>
      </header>

      <form
        onSubmit={onSubmit}
        className="flex max-w-[600px] flex-col items-start gap-12 rounded-2xl border border-[#17a3b8]/20 p-4"
      >
        <div className="flex w-full flex-col items-start gap-4">
          <h2 className="text-2xl font-bold text-[#17191c]">Lupa Kata Sandi</h2>
          <div className="flex w-full items-center gap-1 rounded-lg bg-[#ff0000]/10 px-2.5 py-1.5">
            <Danger />
            <p className="text-xs font-normal text-[#ff0000]">
              Silakan masukan email yang terdaftar kamu untuk melakukan
              perbaikan kata sandi
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-1">
            <Label className="text-xs font-normal text-[#17191c]">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              className={`rounded-2xl border bg-inherit py-3 pl-4 pr-3 text-sm ${email ? "text-[#17A3B8] ring-1 ring-[#17A3B8]" : "border-[#919191]"}`}
              placeholder="Masukan Email"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-4">
          <Button
            disabled={!email}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#17A3B8] p-4 text-center text-sm text-white"
          >
            Selanjutnya
          </Button>
          <Button className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#ff0000] p-4 text-center text-sm text-white">
            Kembali
          </Button>
        </div>
      </form>

      <Footer />
      <WAButton />
    </div>
  );
};

export default Page;
