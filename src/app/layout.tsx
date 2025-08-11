import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Youssef Tounekti - Développeur Cybersécurité",
  description: "Portfolio de Youssef Tounekti, développeur spécialisé en cybersécurité et sécurité offensive. Expert en tests de pénétration et développement d'outils de sécurité.",
  keywords: ["cybersécurité", "pentesting", "développeur", "sécurité", "hacking éthique"],
  authors: [{ name: "Youssef Tounekti" }],
  icons: { icon: [{ url: "/logo-YT.jpeg", type: "image/jpeg" }] },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${geist.variable} dark`}>
      <body className="bg-slate-900 text-white">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
