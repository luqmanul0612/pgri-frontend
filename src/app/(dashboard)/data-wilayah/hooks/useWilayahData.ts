import { useState, useEffect, useCallback } from 'react';
import {
  getProvinces,
  getCities,
  getDistricts,
  getSubdistricts,
} from '../serverActions/wilayah-actions';

type WilayahType = 'provinces' | 'cities' | 'districts' | 'subdistricts';
type WilayahData = any[];

interface UseWilayahDataOptions {
  type: WilayahType;
  parentCode?: string;
  initialData?: WilayahData;
}

interface UseWilayahDataReturn {
  data: WilayahData;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useWilayahData = ({
  type,
  parentCode,
  initialData = [],
}: UseWilayahDataOptions): UseWilayahDataReturn => {
  const [data, setData] = useState<WilayahData>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let result: WilayahData = [];

      switch (type) {
        case 'provinces':
          result = await getProvinces();
          break;
        case 'cities':
          if (!parentCode) {
            throw new Error('Province code is required for cities');
          }
          result = await getCities(parentCode);
          break;
        case 'districts':
          if (!parentCode) {
            throw new Error('City code is required for districts');
          }
          result = await getDistricts(parentCode);
          break;
        case 'subdistricts':
          if (!parentCode) {
            throw new Error('District code is required for subdistricts');
          }
          result = await getSubdistricts(parentCode);
          break;
        default:
          throw new Error(`Invalid wilayah type: ${type}`);
      }

      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      console.error(`Error fetching ${type}:`, err);
    } finally {
      setLoading(false);
    }
  }, [type, parentCode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};