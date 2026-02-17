import type { Metadata } from "next";
import "@/utils/styles/fonts.scss";
import "@/utils/styles/globals.scss";
import { Toaster } from "@/components/ui/sonner";
import ModalConfirmPayment from "@/components/modal-confirm-payment";
import ModalUnderDevelopment from "@/components/modal-underdevelopment";

export const metadata: Metadata = {
  title: "PGRI",
  description: "Persatuan Guru Republik Indonesia",
  icons: {
    icon: "/pgri-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            duration: 5000,
          }}
        />
        <ModalConfirmPayment />
        <ModalUnderDevelopment />
      </body>
    </html>
  );
}
