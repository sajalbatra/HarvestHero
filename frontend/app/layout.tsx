import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Bitter } from "next/font/google";
import ClientRootLayout from "./ClientRootLayout";
const inter = Inter({ subsets: ["latin"] });
const bitter = Bitter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harvest Hero",
  description: "HarvestHero is a platform designed to bridge the gap between donors and NGOs, ensuring resources reach those who need them most",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={bitter.className}>
        <ClientRootLayout>
        {children}
        </ClientRootLayout>
      </body>
    </html>
  );
}
