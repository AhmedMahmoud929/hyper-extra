import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Sidebar from "@/components/shared/Sidebar";
import Navbar from "@/components/shared/Navbar";
import { SidebarProvider } from "@/contexts/SidebarContext";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hyper Extra",
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SidebarProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex overflow-hidden w-screen h-screen bg-gray-100`}
        >
          <Sidebar />
          <main className="flex flex-col flex-grow">
            {children}
          </main>
        </body>
      </SidebarProvider>
    </html>
  );
}