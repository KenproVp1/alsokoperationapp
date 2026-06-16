import type { Metadata } from "next";
import { Nunito_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--mono",
});

export const metadata: Metadata = {
  title: "ALSOK VSS — CRM Vận hành Bảo vệ PRO",
  description: "Phần mềm CRM Quản lý Vận hành An ninh Bảo vệ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${nunitoSans.variable} ${jetbrainsMono.variable}`}>
        {children}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
