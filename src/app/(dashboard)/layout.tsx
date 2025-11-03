import DashboardLayoutComponent from "./components/DashboardLayoutComponent";
import { redirect } from "next/navigation";
import { getAuthMe } from "../(auth)/login/serverAction/getAuthMe";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const identity = await getAuthMe();
  // if (identity?.status !== 200) {
  //   redirect("/login");
  // }

  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
}
