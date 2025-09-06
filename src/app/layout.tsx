import "@ant-design/v5-patch-for-react-19";
import "@/assets/css/main.css";

import type { Metadata } from "next";
import { Geist, Ubuntu_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Header } from "@/components/Header";
import { Providers } from "./providers";
import dynamic from "next/dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ubuntuMono = Ubuntu_Mono({
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Awesome tools for developers",
  description:
    "A curated list of awesome tools and resources for developers to enhance productivity and streamline workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${ubuntuMono.variable} antialiased`}
      >
        <AntdRegistry>
          <Providers>
            <main className="flex flex-col">
              <Header />
              <div className="flex-1 min-h-0">{children}</div>
            </main>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
