"use client";
import { FC } from "react";
import useAuth from "@/store/useAuth";
import UserAdminSection from "./components/user-admin-section";
import UserSection from "./components/user-section";
import FinanceAdminSection from "./components/finance-admin-section";

interface pageProps {
  params: Promise<{}>;
}

const Page: FC<pageProps> = ({ params: {} }) => {
  const { user } = useAuth();

  return (
    <div>
      {[1, 4, 5, 6, 7, 8, 9].includes(user.level_id) && <UserAdminSection />}
      {user.level_id === 2 && <FinanceAdminSection />}
      {user.level_id === 3 && <UserSection />}
    </div>
  );
};

export default Page;
