import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Manrope,
  Montserrat,
  Poppins,
} from "next/font/google";

import "@/styles/index.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-editorial",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "Maven Projects | Architecture & Interior Design in Jaipur",
    template: "%s | Maven Projects",
  },
  description:
    "Maven Projects is a premier architecture and interior design studio in Jaipur, creating modern, functional, and sustainable homes across Rajasthan.",

  icons: {
    icon: [
      { url: "/assets/Image/favicon-3.svg" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        className={`${inter.variable} ${montserrat.variable} ${poppins.variable} ${manrope.variable} ${cormorant.variable} font-inter text-brand-text`}
      >
        {children}
      </body>
    </html>
  );
}