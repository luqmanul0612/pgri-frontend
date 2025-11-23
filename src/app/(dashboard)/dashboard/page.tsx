"use client";
import { FC } from "react";
import useAuth from "@/store/useAuth";
import DashboardMemberAdmin from "./containers/dashboard-member-admin";
import UserSection from "./containers/user-section";
import FinanceAdminSection from "./containers/finance-admin-section";

interface pageProps {
  params: Promise<{}>;
}

const Page: FC<pageProps> = ({ params: {} }) => {
  const { user } = useAuth();

  return (
    <div>
      {[1, 4, 5, 6, 7, 8, 9].includes(user.level_id) && (
        <DashboardMemberAdmin />
      )}
      {user.level_id === 2 && <FinanceAdminSection />}
      {user.level_id === 3 && <UserSection />}
    </div>
  );
};

export default Page;
