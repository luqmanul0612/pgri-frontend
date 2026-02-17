"use client";
import React from "react";
import useAuth from "@/store/useAuth";
import FeeAndBillsAdmin from "./components/fee-and-bills-admin";
import FeeAndBillsFinanceAdmin from "./components/fee-and-bills-finance-admin";

const IuranDanTagihan = () => {
  const { user } = useAuth();
  return (
    <>
      {[1, 3].includes(user.level_id) && <FeeAndBillsAdmin />}
      {user.level_id === 2 && <FeeAndBillsFinanceAdmin />}
    </>
  );
};

export default IuranDanTagihan;
