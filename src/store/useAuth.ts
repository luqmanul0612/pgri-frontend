import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthProps {
  auth: {
    id: string;
    isVerified: boolean;
    levelId: number;
    name: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    nik: string;
    npaNumber: string;
    dob: string;
    birthPlace: string;
    latestEducation: string;
    gender: string;
    religion: string;
    bloodType: string;
    address: string;
    postalCode: string;
  };
}

interface AuthState extends AuthProps {
  setAuth: (auth: Partial<AuthProps["auth"]>) => void;
}

const initialData: AuthProps = {
  auth: {
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    isVerified: false,
    levelId: 0,
    createdAt: "",
    address: "",
    nik: "",
    npaNumber: "",
    dob: "",
    birthPlace: "",
    latestEducation: "",
    gender: "",
    religion: "",
    bloodType: "",
    postalCode: "",
  },
};

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialData,
      setAuth: (values) =>
        set({ ...values, auth: { ...get().auth, ...values } }),
    }),
    {
      name: "auth-state",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuth;
