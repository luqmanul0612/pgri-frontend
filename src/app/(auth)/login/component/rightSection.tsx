"use client";

import { FC, FormEvent, useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Eye, EyeOff } from "lucide-react";
import { handleLogin } from "../serverAction/login";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import useAuth from "@/store/useAuth";
import PgriLogo from "../../../../../public/pgri-logo.svg";

interface RightSectionProps {}

export const RightSection: FC<RightSectionProps> = () => {
  const { setAuth } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await handleLogin(email, password, rememberMe);
      toast({ title: "Berhasil Login" });
      setAuth({ auth: res.data });
      router.push("/dashboard");
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error?.message || "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-[76vh] max-h-[500px] min-h-[456px] w-[31%] max-w-[500px] flex-col items-center justify-between">
      <div className="flex flex-col items-center space-y-[0.3rem]">
        <PgriLogo width={80} height={80} />
        <p className="text-[1.6rem] font-bold">Welcome back!</p>
        <p className="text-center">
          Kartu Tanda Anggota Persatuan Guru Republik Indonesia
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex h-fit w-full flex-col gap-1"
      >
        <div className="space-y-[0.25rem]">
          <Label htmlFor="email" className="text-[0.75rem]">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value); // Update state on change
            }}
            onInput={(e) => {
              setEmail((e.target as HTMLInputElement).value); // Update state on input
            }}
            placeholder="Masukkan Email"
            className={`rounded-[16px] px-4 py-[0.75rem] ${
              email.length
                ? "text-[#17A3B8] ring-1 ring-[#17A3B8]"
                : "border-[#919191]"
            }`}
            required
          />
        </div>
        <div className="h-[3%]" />
        <div className="space-y-[0.25rem]">
          <Label htmlFor="password" className="text-[0.75rem]">
            Kata Sandi
          </Label>
          <div className="relative flex items-center">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan Kata Sandi"
              className={`rounded-[16px] px-4 py-[0.75rem] ${
                password
                  ? "text-[#17A3B8] ring-1 ring-[#17A3B8]"
                  : "border-[#919191]"
              }`}
              required
            />
            <div
              className="absolute right-[12px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff color="#919191" />
              ) : (
                <Eye color="#919191" />
              )}
            </div>
          </div>
        </div>
        <div className="h-[2%]" />
        <div className="flex justify-between text-[0.75rem]">
          <div className="flex items-center gap-2">
            {/* <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <p>Ingat Saya</p> */}
          </div>
          <Link href="/lupa-sandi" className="text-[#17A3B8]">
            Lupa Kata Sandi?
          </Link>
        </div>
        <Button
          type="submit"
          className="mt-4 w-full rounded-[16px] bg-[#17A3B8] py-[1em]"
          disabled={!email || !password || isLoading}
        >
          {!isLoading ? "Masuk" : <ScaleLoader color="#ffffff" height={20} />}
        </Button>
        {isError && (
          <p className="mt-2 text-center text-[0.75rem] text-red-500">
            {errorMessage}
          </p>
        )}
        <p className="mt-2 text-center text-[0.75rem]">
          Belum punya akun?{" "}
          <span
            onClick={() => router.push("/register")}
            className="cursor-pointer text-[#17A3B8]"
          >
            Daftar di sini
          </span>
        </p>
      </form>
    </section>
  );
};
