import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "PranaFlow — Guided Yoga Sessions",
  description:
    "Premium step-by-step yoga with timed fullscreen sessions. Monthly plans or custom sequences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} min-h-screen antialiased`}
      >
        <ThemeProvider>
          <BackgroundOrbs />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
