import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import ShowModal from "@/components/modals/ShowModal";
import Header from "@/components/component/Header/Header";
import { Toaster } from "@/components/ui/toaster";
import "../../globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AdminProvider } from "./AdminProvider";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SunTravel - The world is yours to explore.",
  description: "Generated by create next app",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
    >
      <html lang="en" className="bg-[#F7F9FA] ">
        <body className={nunito.className}>
          ;
          <AdminProvider>
            <Header fromAdminPage={true} />
            {children}
            <ShowModal />
            <Toaster />
          </AdminProvider>
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}
