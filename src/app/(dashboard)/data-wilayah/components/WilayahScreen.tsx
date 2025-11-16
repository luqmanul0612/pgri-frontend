"use client";

import { FC, useState, useEffect } from "react";
import { AddAndFilterWilayah } from "./addAndFilter";
import { DataTable } from "@/components/table/DataTable";
import { LoadingState, ErrorState, EmptyState } from "./DataStates";
import {
  getProvinces,
  getCities,
  getDistricts,
  getSubdistricts,
} from "../serverActions/wilayah-actions";

interface WilayahScreenProps {
  type: "provinces" | "cities" | "districts" | "subdistricts";
  wilayahLabel: string;
  parentCode?: string;
  columns: any[];
  pageSize?: number;
  AddAndFilterProps?: Omit<
    import("./addAndFilter").AddAndFilterWilayahProps,
    "wilayah"
  >;
}

export const WilayahScreen: FC<WilayahScreenProps> = ({
  type,
  wilayahLabel,
  parentCode,
  columns,
  pageSize = 10,
  AddAndFilterProps,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      let result: any[] = [];

      switch (type) {
        case "provinces":
          result = await getProvinces();
          break;
        case "cities":
          if (!parentCode) {
            throw new Error("Province ID is required for cities");
          }
          result = await getCities(parentCode);
          break;
        case "districts":
          if (!parentCode) {
            throw new Error("City ID is required for districts");
          }
          result = await getDistricts(parentCode);
          break;
        case "subdistricts":
          if (!parentCode) {
            throw new Error("District ID is required for subdistricts");
          }
          result = await getSubdistricts(parentCode);
          break;
        default:
          throw new Error(`Invalid wilayah type: ${type}`);
      }

      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch data";
      setError(errorMessage);
      console.error(`Error fetching ${type}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, parentCode]);

  if (loading) {
    return <LoadingState message={`Memuat data ${wilayahLabel}...`} />;
  }

  if (error) {
    return (
      <ErrorState
        message={`Gagal memuat data ${wilayahLabel}: ${error}`}
        onRetry={fetchData}
      />
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState message={`Belum ada data ${wilayahLabel}`} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <AddAndFilterWilayah wilayah={wilayahLabel} {...AddAndFilterProps} />
      <DataTable
        data={data}
        columns={columns}
        pageSize={pageSize}
        paginationLabel={wilayahLabel}
      />
    </div>
  );
};
