import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "PGRI",
  description: "Persatuan Guru Republik Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            duration: 5000,
          }}
        />
      </body>
    </html>
  );
}
