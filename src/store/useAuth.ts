import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthProps {
  auth: {
    id: string;
    isVerified: boolean;
    levelId: number;
  };
}

interface AuthState extends AuthProps {
  setAuth: (auth: Partial<AuthProps>) => void;
}

const initialData: AuthProps = {
  auth: {
    id: "",
    isVerified: false,
    levelId: 3,
  },
};

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialData,
      setAuth: (values) =>
        set({ ...values, auth: { ...get().auth, ...values.auth } }),
    }),
    {
      name: "auth-state",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuth;
