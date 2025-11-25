import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Alma de Granja | Productos de campo",
  description: "E-commerce rural moderno para huevos, quesos y frutos secos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-body text-accent-brown">
        {children}
      </body>
    </html>
  );
}
