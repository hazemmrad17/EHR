import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EHR Studio | RonDesignLab Aesthetic",
  description: "A premium EHR CRM Webapp with soft, high-end aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://developer.biodigital.com/builds/api/2/human-api.min.js" async></script>
      </head>
      <body
        className={`${outfit.variable} font-outfit antialiased font-light text-slate-900 bg-[#F4F7FA]`}
      >
        {children}
      </body>
    </html>
  );
}
