import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/src/styles/globals.css";
import Navbar from "@/app/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Mert Arcan',
  description: 'Personal portfolio website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-surface text-on-surface`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}