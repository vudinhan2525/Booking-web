import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { AppProvider } from "./AppProvider";
import ShowModal from "@/components/modals/ShowModal";
import Header from "@/components/component/Header/Header";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import Footer from "@/components/component/Footer/Footer";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SunTravel - The world is yours to explore.",
  description: "Generated by create next app",
};

export default async function UserAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <AppProvider>
          <Header />
          {children}
          <ShowModal />
        </AppProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
