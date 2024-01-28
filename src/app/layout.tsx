import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "../header";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/utils/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collections",
  description: "A Web-application for personal collection management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
          <Providers>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Header />
            {children}
          </Providers>
      </body>
    </html>
  );
}
