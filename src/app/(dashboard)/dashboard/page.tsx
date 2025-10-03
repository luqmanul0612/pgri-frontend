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
  const { auth } = useAuth();
  return (
    <div>
      {auth.levelId === 1 && <UserAdminSection />}
      {auth.levelId === 2 && <UserSection />}
      {auth.levelId === 3 && <FinanceAdminSection />}
    </div>
  );
};

export default Page;
