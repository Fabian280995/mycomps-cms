import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "./globals.css";
import { ToasterProvider } from "@/providers/toast-provider";

export const metadata = {
  title: "mycomps - cms",
  description: "CMS for mycomps by Fabian Lessmann",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
