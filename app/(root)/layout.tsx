import "../globals.css";
import "@uploadthing/react/styles.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import Sidebar from "@/components/sidebar";

import { ToasterProvider } from "@/providers/toast-provider";

export const metadata = {
  title: "mycomps - cms",
  description: "CMS for mycomps by Fabian Lessmann",
};

const inter = Inter({ subsets: ["latin"] });

export default async function SetupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="w-full h-screen flex overflow-hidden">
            <ToasterProvider />
            <Sidebar />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
