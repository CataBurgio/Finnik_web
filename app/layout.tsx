import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Finnik - Tu curaduría financiera en WhatsApp",
  description:
    "Noticias clave, contexto y aprendizaje financiero directo en WhatsApp. Brief diario, radar de mercado y explicaciones sin humo.",
  openGraph: {
    title: "Finnik - Tu curaduría financiera en WhatsApp",
    description:
      "Noticias clave, contexto y aprendizaje financiero directo en WhatsApp. Sin apps, sin newsletters. Solo lo que importa.",
    type: "website",
    siteName: "Finnik",
    locale: "es_AR",
  },
  twitter: {
    card: "summary",
    title: "Finnik - Tu curaduría financiera en WhatsApp",
    description:
      "Noticias clave, contexto y aprendizaje financiero directo en WhatsApp. Sin apps, sin newsletters. Solo lo que importa.",
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
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
