import { redirect } from "next/navigation";
import { getAuthCookies } from "@/serverActions/getAuthCookies";
import { cookies } from "next/headers";
import { decodeJwt } from "@/lib/utils";

interface TokenDecoded {
  is_verified: boolean;
  level_id: number;
}

export default async function AnggotaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("token")?.value;
  const decoded = decodeJwt<TokenDecoded>(token as string);
  // if (decoded?.is_verified) return children;
  // redirect("/dashboard");
  return children;
}
