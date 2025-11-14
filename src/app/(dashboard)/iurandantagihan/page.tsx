"use client"
import React from 'react'
import useAuth from '@/store/useAuth';
import FeeAndBillsAdmin from './components/fee-and-bills-admin';
import FeeAndBillsFinanceAdmin from './components/fee-and-bills-finance-admin';

const IuranDanTagihan = () => {
  const { user } = useAuth();
  return (
    <>
      {user.level_id === 1 && <FeeAndBillsAdmin />}
      {user.level_id === 2 && <FeeAndBillsFinanceAdmin />}
    </>
  )
}

export default IuranDanTagihan;
