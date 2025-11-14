import DashboardLayoutComponent from "./components/DashboardLayoutComponent";
import { redirect } from "next/navigation";
import { getAuthMe } from "../(auth)/login/serverAction/getAuthMe";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const renew_password = cookies().get("renew_password")?.value;
  if (renew_password) redirect("/renew-password");
  else {
    const identity = await getAuthMe();
    if (identity?.status !== 200) {
      redirect("/login");
    }
  }

  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
}
