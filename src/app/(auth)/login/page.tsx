import { WAButton } from "@/app/components/WAButton";
import { Footer } from "../../components/Footer";
import { LeftSection } from "./component/leftSection";
import { RightSection } from "./component/rightSection";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const token = cookies().get("token")?.value;
  if (token) redirect("/admin");

  return (
    <div className="flex h-screen w-full flex-col bg-[#F5F7FB]">
      <main className="flex flex-1 items-center justify-center gap-[7.81%]">
        <LeftSection />
        <RightSection />
      </main>

      <Footer />

      <WAButton />
    </div>
  );
}
