import { ActionError, getLogActionServer } from "@/utils/action-error";
import { useState } from "react";

interface UseMutationProps<RES, ERR = unknown, VAR = unknown> {
  mutationFn: (data: VAR) => Promise<RES>;
  onSuccess?: (data: RES) => void;
  onError?: (error: ERR) => void;
}

const useMutation = <RES, ERR = unknown, VAR = unknown>({
  mutationFn,
  onSuccess,
  onError,
}: UseMutationProps<RES, ERR, VAR>) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<ERR | null>(null);
  const [data, setData] = useState<RES | null>(null);

  const mutate = async (variables: VAR) => {
    setIsPending(true);
    setError(null);
    try {
      const response = await mutationFn(variables);
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
    } catch (err: any) {
      getLogActionServer(variables, null, err);
      setError(err as ERR);
      onError?.(err as ERR);
    } finally {
      setIsPending(false);
    }
  };

  return {
    mutate,
    isPending,
    error,
    data,
  };
};

export default useMutation;
