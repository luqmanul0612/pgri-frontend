"use client";

import { FC } from 'react';
import { AddAndFilterWilayah } from './addAndFilter';
import { DataTable } from '@/components/table/DataTable';
import { useWilayahData } from '../hooks/useWilayahData';
import { LoadingState, ErrorState, EmptyState } from './DataStates';

interface WilayahScreenProps {
  type: 'provinces' | 'cities' | 'districts' | 'subdistricts';
  wilayahLabel: string;
  parentCode?: string;
  columns: any[];
  pageSize?: number;
}

export const WilayahScreen: FC<WilayahScreenProps> = ({
  type,
  wilayahLabel,
  parentCode,
  columns,
  pageSize = 10
}) => {
  const { data, loading, error, refetch } = useWilayahData({
    type,
    parentCode
  });

  if (loading) {
    return <LoadingState message={`Memuat data ${wilayahLabel}...`} />;
  }

  if (error) {
    return (
      <ErrorState
        message={`Gagal memuat data ${wilayahLabel}: ${error}`}
        onRetry={refetch}
      />
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState message={`Belum ada data ${wilayahLabel}`} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <AddAndFilterWilayah wilayah={wilayahLabel} />
      <DataTable
        data={data}
        columns={columns}
        pageSize={pageSize}
        paginationLabel={wilayahLabel}
      />
    </div>
  );
};