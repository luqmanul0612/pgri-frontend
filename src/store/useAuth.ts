import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AuthProps {
  user: {
    id: string;
    npa: string;
    name: string;
    birth_place: string;
    birth_date: string;
    gender: string;
    blood_type: string;
    religion: string;
    phone_number: string;
    email: string;
    nik: string;
    address: string;
    postal_code: string;
    province: string;
    city: string;
    district: string;
    subdistrict: string;
    employee_status: string;
    membership_status: string;
    latest_education: string;
    member_photo: string;
    has_paid: boolean;
    is_verified: boolean;
    is_printed: boolean;
    is_validated: boolean;
    created_at: string;
    level_id: number;
    profile: string;
    expired: number;
    change_token: string;
  };
}

interface AuthState extends AuthProps {
  setUser: (auth: Partial<AuthProps["user"]>) => void;
}

const initialData: AuthProps = {
  user: {} as AuthProps["user"],
};

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialData,
      setUser: (values) =>
        set({ ...values, user: { ...get().user, ...values } }),
    }),
    {
      name: "auth-state",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuth;
