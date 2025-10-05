import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserIdentity } from "../serverActions/getUserIdentity";
import {
  submitPayment,
  checkStatusPayment,
  IPaymentStatusResponse,
} from "@/app/(auth)/register/serverActions/payment";
import { useDebouncedCallback } from "@/utils/use-debounce-callback";

// Reusable Components
interface InfoFieldProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const InfoField: FC<InfoFieldProps> = ({ label, value, icon }) => (
  <div className="flex w-full flex-col gap-1">
    <label className="text-xs font-normal text-gray-800">{label}</label>
    <div className="flex h-10 w-full items-center gap-2.5 rounded-lg border border-teal-500/20 px-4 py-2.5">
      {icon}
      <span className="flex-1 text-xs font-normal text-gray-800">{value}</span>
    </div>
  </div>
);

interface PaymentOptionProps {
  label: string;
  isExpanded?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const PaymentOptionItem: FC<PaymentOptionProps> = ({
  label,
  isExpanded = false,
  children,
  onClick,
}) => (
  <div className="flex w-full flex-col gap-2">
    <div
      className="flex w-full cursor-pointer items-center justify-between"
      onClick={onClick}
    >
      <span className="flex-1 text-xs font-normal text-gray-800">{label}</span>
      {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </div>
    {isExpanded && children && (
      <div className="flex w-full flex-col gap-2 px-4">{children}</div>
    )}
  </div>
);

interface VirtualAccountOptionProps {
  name: string;
  isSelected?: boolean;
  onClick?: () => void;
}

interface PaymentOptionComponentProps {
  setActiveScreen: (
    screen: "initial" | "paymentOption" | "paymentSuccess",
  ) => void;
}

const VirtualAccountOption: FC<VirtualAccountOptionProps> = ({
  name,
  isSelected = false,
  onClick,
}) => (
  <div
    className="flex w-full cursor-pointer items-center gap-2.5"
    onClick={onClick}
  >
    {isSelected ? <CheckboxChecked /> : <CheckboxUnchecked />}
    <span className="flex-1 text-xs font-normal text-gray-800">{name}</span>
  </div>
);

const initialPaymentStatus: IPaymentStatusResponse["data"] = {
  expiry_date: "",
  payment_page: "",
  status: "pending",
  total_amount: "",
  transaction_id: "",
  virtual_account_name: "",
  virtual_account_no: "",
};

export const PaymentOption: FC<PaymentOptionComponentProps> = ({
  setActiveScreen,
}) => {
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    phoneNumber: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState("bri");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] =
    useState<IPaymentStatusResponse["data"]>(initialPaymentStatus);

  const fetchCheckStatusPayment = useDebouncedCallback(async () => {
    try {
      const res = await checkStatusPayment();
      const paymentModal = document.getElementById("jokul_checkout_modal");
      console.log("Payment status check:", res);

      if (res.status === 200) {
        setPaymentStatus(res.data);
        if (res.data.status === "pending" && !paymentModal) {
          window.loadJokulCheckout(res.data?.payment_page);
        } else if (res.data.status === "succeeded") {
          if (paymentModal) {
            paymentModal.remove();
          }
          setActiveScreen("paymentSuccess");
        }
      }
    } catch (error) {
      console.error("Failed to check payment status:", error);
    }
  }, 500);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserIdentity();
        // data dari api hanya nama, email dan nomor tidak dapat
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Gagal memuat data pengguna");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://sandbox.doku.com/jokul-checkout-js/v1/jokul-checkout-1.0.0.js";
    script.async = true;
    script.onerror = () => {
      console.error("Failed to load script");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    fetchCheckStatusPayment();
    const interval = setInterval(() => {
      fetchCheckStatusPayment();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchCheckStatusPayment]);

  const showNotImplementedToast = (method: string) => {
    toast.warning("Fitur Belum Tersedia", {
      description: `Maaf, ${method} belum diimplementasikan. Untuk saat ini baru VA BRI yang tersedia.`,
    });
  };

  const handleVASelection = (vaName: string) => {
    if (vaName !== "VA BRI") {
      showNotImplementedToast(vaName);
    }
  };

  const handlePayment = async () => {
    if (!selectedChannel) {
      toast.error("Silakan pilih metode pembayaran");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await submitPayment({
        channel: selectedChannel,
        payment_method: "virtual_account",
      });
      window.loadJokulCheckout(res.data?.payment_page);
      // Start monitoring payment status immediately after payment submission
      fetchCheckStatusPayment();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Gagal memproses pembayaran");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col gap-4 p-4 sm:max-h-[727px] sm:min-h-0">
      <div className="flex flex-1 flex-col gap-2">
        <h1 className="text-sm font-bold text-teal-600">
          Pembayaran Uang Pangkal
        </h1>

        <div className="flex flex-1 flex-col gap-6">
          {/* Member Information Section */}
          <section className="flex flex-col gap-2">
            <h2 className="text-sm font-bold text-gray-800">
              Informasi Anggota
            </h2>
            <div className="flex flex-col gap-4">
              <InfoField
                label="Nama Anggota"
                value={
                  loading ? "Loading..." : userData?.name || "Tidak tersedia"
                }
                icon={<UserIcon />}
              />
              <InfoField
                label="Email"
                value={
                  loading ? "Loading..." : userData?.email || "Tidak tersedia"
                }
                icon={<MailIcon />}
              />
              <InfoField
                label="Nomor Handphone"
                value={
                  loading
                    ? "Loading..."
                    : userData?.phoneNumber || "Tidak tersedia"
                }
                icon={<PhoneIcon />}
              />
            </div>
          </section>

          {/* Payment Methods Section */}
          <section className="flex flex-col gap-2">
            <h2 className="text-sm font-bold text-gray-800">
              Metode Pembayaran
            </h2>
            <div className="flex flex-col gap-2">
              <PaymentOptionItem
                label="Bayar Tunai di Mitra/Agen"
                onClick={() =>
                  showNotImplementedToast("Bayar Tunai di Mitra/Agen")
                }
              />

              <PaymentOptionItem label="Virtual Account" isExpanded>
                <VirtualAccountOption name="VA BRI" isSelected />
                <VirtualAccountOption
                  name="VA BCA"
                  onClick={() => handleVASelection("VA BCA")}
                />
                <VirtualAccountOption
                  name="VA Mandiri"
                  onClick={() => handleVASelection("VA Mandiri")}
                />
                <VirtualAccountOption
                  name="VA BNI"
                  onClick={() => handleVASelection("VA BNI")}
                />
                <VirtualAccountOption
                  name="VA BSI"
                  onClick={() => handleVASelection("VA BSI")}
                />
                <VirtualAccountOption
                  name="VA Bank Jago"
                  onClick={() => handleVASelection("VA Bank Jago")}
                />
              </PaymentOptionItem>

              <PaymentOptionItem
                label="Transfer Bank"
                onClick={() => showNotImplementedToast("Transfer Bank")}
              />
              <PaymentOptionItem
                label="E-Wallet"
                onClick={() => showNotImplementedToast("E-Wallet")}
              />
              <PaymentOptionItem
                label="Kartu Kredit/Debit"
                onClick={() => showNotImplementedToast("Kartu Kredit/Debit")}
              />
            </div>
          </section>
        </div>
      </div>

      {/* OK Button */}
      <button
        className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-primary p-4 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handlePayment}
        disabled={isProcessing || loading || !selectedChannel}
      >
        <span className="text-sm font-normal text-white">
          {isProcessing ? "Memproses..." : "OK"}
        </span>
      </button>
    </div>
  );
};

// ANCHOR: Icons
// #region Icons

const UserIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.08906 9.58499C9.03656 9.57749 8.96906 9.57749 8.90906 9.58499C7.58906 9.53999 6.53906 8.45999 6.53906 7.13249C6.53906 5.77499 7.63406 4.67249 8.99906 4.67249C10.3566 4.67249 11.4591 5.77499 11.4591 7.13249C11.4516 8.45999 10.4091 9.53999 9.08906 9.58499Z"
      stroke="#17A3B8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.0553 14.535C12.7203 15.7575 10.9503 16.5 9.00031 16.5C7.05031 16.5 5.28031 15.7575 3.94531 14.535C4.02031 13.83 4.47031 13.14 5.27281 12.6C7.32781 11.235 10.6878 11.235 12.7278 12.6C13.5303 13.14 13.9803 13.83 14.0553 14.535Z"
      stroke="#17A3B8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
      stroke="#17A3B8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.75 15.375H5.25C3 15.375 1.5 14.25 1.5 11.625V6.375C1.5 3.75 3 2.625 5.25 2.625H12.75C15 2.625 16.5 3.75 16.5 6.375V11.625C16.5 14.25 15 15.375 12.75 15.375Z"
      stroke="#17A3B8"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.75 6.75L10.4025 8.625C9.63 9.24 8.3625 9.24 7.59 8.625L5.25 6.75"
      stroke="#17A3B8"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4775 13.7475C16.4775 14.0175 16.4175 14.295 16.29 14.565C16.1625 14.835 15.9975 15.09 15.78 15.33C15.4125 15.735 15.0075 16.0275 14.55 16.215C14.1 16.4025 13.6125 16.5 13.0875 16.5C12.3225 16.5 11.505 16.32 10.6425 15.9525C9.78 15.585 8.9175 15.09 8.0625 14.4675C7.2 13.8375 6.3825 13.14 5.6025 12.3675C4.83 11.5875 4.1325 10.77 3.51 9.915C2.895 9.06 2.4 8.205 2.04 7.3575C1.68 6.5025 1.5 5.685 1.5 4.905C1.5 4.395 1.59 3.9075 1.77 3.4575C1.95 3 2.235 2.58 2.6325 2.205C3.1125 1.7325 3.6375 1.5 4.1925 1.5C4.4025 1.5 4.6125 1.545 4.8 1.635C4.995 1.725 5.1675 1.86 5.3025 2.055L7.0425 4.5075C7.1775 4.695 7.275 4.8675 7.3425 5.0325C7.41 5.19 7.4475 5.3475 7.4475 5.49C7.4475 5.67 7.395 5.85 7.29 6.0225C7.1925 6.195 7.05 6.375 6.87 6.555L6.3 7.1475C6.2175 7.23 6.18 7.3275 6.18 7.4475C6.18 7.5075 6.1875 7.56 6.2025 7.62C6.225 7.68 6.2475 7.725 6.2625 7.77C6.3975 8.0175 6.63 8.34 6.96 8.73C7.2975 9.12 7.6575 9.5175 8.0475 9.915C8.4525 10.3125 8.8425 10.68 9.24 11.0175C9.63 11.3475 9.9525 11.5725 10.2075 11.7075C10.245 11.7225 10.29 11.745 10.3425 11.7675C10.4025 11.79 10.4625 11.7975 10.53 11.7975C10.6575 11.7975 10.755 11.7525 10.8375 11.67L11.4075 11.1075C11.595 10.92 11.775 10.7775 11.9475 10.6875C12.12 10.5825 12.2925 10.53 12.48 10.53C12.6225 10.53 12.7725 10.56 12.9375 10.6275C13.1025 10.695 13.275 10.7925 13.4625 10.92L15.945 12.6825C16.14 12.8175 16.275 12.975 16.3575 13.1625C16.4325 13.35 16.4775 13.5375 16.4775 13.7475Z"
      stroke="#17A3B8"
      strokeWidth="1.5"
      strokeMiterlimit="10"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9405 6.71252L10.0505 11.6025C9.47305 12.18 8.52805 12.18 7.95055 11.6025L3.06055 6.71252"
      stroke="#17A3B8"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9405 11.2875L10.0505 6.39748C9.47305 5.81998 8.52805 5.81998 7.95055 6.39748L3.06055 11.2875"
      stroke="#17A3B8"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckboxChecked = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V6.75C16.5 3 15 1.5 11.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5Z"
      fill="#17A3B8"
      stroke="#17A3B8"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.8125 9L7.935 11.1225L12.1875 6.8775"
      stroke="#F5F7FB"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckboxUnchecked = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V6.75C16.5 3 15 1.5 11.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5Z"
      stroke="#919191"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
// #endregion
