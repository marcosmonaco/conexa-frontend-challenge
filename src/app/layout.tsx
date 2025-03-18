import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick & Morty - Frontend Challenge",
  description: "Desafio Frontend realizado por Marcos Monaco para Conexa",
  icons: {
    icon: "/svg/favicon.svg", // Basico
    apple: "/svg/favicon.svg", // Para dispositivos Apple
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center h-dvh relative !bg-[url(/images/space-background.png)]`}
      >
        {children}
      </body>
    </html>
  );
}
