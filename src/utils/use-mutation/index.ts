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
      setData(response);
      onSuccess?.(response);
    } catch (err) {
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
