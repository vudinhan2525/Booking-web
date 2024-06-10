import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../../globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin - SunTravel",
  description: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <header>Admin Header</header>
        <main>{children}</main>
        <footer>Admin Footer</footer>
      </body>
    </html>
  );
}
