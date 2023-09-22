import Sidebar from "@/components/sidebar";
import prismadb from "@/lib/prismadb";

import { ToasterProvider } from "@/providers/toast-provider";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userInfo = await prismadb.user.findUnique({
    where: { clerkId: user.id },
  });
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <ToasterProvider />
      <Sidebar userInfo={userInfo} />
      {children}
    </div>
  );
}
