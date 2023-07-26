"use client";

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: DefaultLayoutProps) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
