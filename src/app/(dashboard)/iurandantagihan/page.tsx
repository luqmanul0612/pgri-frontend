"use client"
import React from 'react'
import useAuth from '@/store/useAuth';
import FeeAndBillsAdmin from './components/fee-and-bills-admin';
import FeeAndBillsFinanceAdmin from './components/fee-and-bills-finance-admin';

const IuranDanTagihan = () => {
  const { auth } = useAuth();
  return (
    <>
      {/* {auth.levelId === 1 && <FeeAndBillsAdmin />} */}
      {auth.levelId === 1 && <FeeAndBillsFinanceAdmin />}
    </>
  )
}

export default IuranDanTagihan;
