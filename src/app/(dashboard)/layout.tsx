import DashboardLayoutComponent from "./components/DashboardLayoutComponent";
import { redirect } from "next/navigation";
import { getIdentity } from "../(auth)/login/serverAction/getIdentity";
import { getAuthCookies } from "@/serverActions/getAuthCookies";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const identity = await getIdentity();
  if (identity?.status !== 200) {
    redirect("/login");
  }

  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
}
