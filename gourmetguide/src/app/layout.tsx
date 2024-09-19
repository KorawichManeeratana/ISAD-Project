import Nav from "./components/Nav";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { 
  title: "GourmetGuide",
  description: "this site make my day", 
}; {/* เหมือน head ของ html ระบุข้อมูลของเว็บ กำหนดในหน้าอื่นได้*/}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-kanit" 
      > {/* กำหนด font เป็น kanit importมาจาก tailwind.config.js */}
      <Nav /> {/* กำหนด nav bar กับทุกหน้า */}
      {children} {/* เนื้อหาของแต่ละหน้า */}
      </body>
    </html>
  );
}
