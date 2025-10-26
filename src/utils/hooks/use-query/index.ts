import { ActionError, getLogActionServer } from "@/utils/action-error";
import { useEffect, useState, useRef } from "react";

interface UseQueryProps<RES, ERR, VAR> {
  queryFn: () => Promise<RES>;
  enabled?: boolean;
  onSuccess?: (data: RES) => void;
  onError?: (error: ERR) => void;
  queryKey?: any[];
}

const useQuery = <RES, ERR, VAR = unknown>({
  queryFn,
  enabled = true,
  onSuccess,
  onError,
  queryKey = [],
}: UseQueryProps<RES, ERR, VAR>) => {
  const [data, setData] = useState<RES | null>(null);
  const [error, setError] = useState<ERR | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const isFirstLoad = useRef(true);

  const fetchData = async (variables?: VAR) => {
    setIsFetching(true);
    if (isFirstLoad.current) setIsLoading(true);

    setError(null);
    try {
      const response = await queryFn();
      if (!(response as any).ok)
        throw new ActionError(
          (response as any).errors ||
            (response as any).errors?.[0] ||
            "Terjadi Kesalahan",
          {
            data: (response as any).data,
            pathname: (response as any).pathname,
            status: (response as any).status,
          },
        );
      getLogActionServer(variables, response, null);
      setData(response);
      onSuccess?.(response);
      isFirstLoad.current = false;
    } catch (err: any) {
      getLogActionServer(variables, null, err);
      setError(err as ERR);
      onError?.(err as ERR);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...queryKey]);

  return {
    data,
    error,
    isLoading,
    isFetching,
    refetch: fetchData,
  };
};

export default useQuery;
