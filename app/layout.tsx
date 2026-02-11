import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Finnik - Tu curaduría financiera en WhatsApp",
  description:
    "Noticias clave, contexto y aprendizaje financiero directo en WhatsApp. Brief diario, radar de mercado y explicaciones sin humo.",
  openGraph: {
    title: "Finnik - Tu curaduría financiera en WhatsApp",
    description:
      "Noticias clave, contexto y aprendizaje financiero directo en WhatsApp.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0938BD",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
