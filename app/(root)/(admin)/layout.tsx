import prismadb from "@/lib/prismadb";

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
  if (userInfo.role.toString().toLowerCase() === "user") {
    redirect("/");
  }

  return <div className="w-full h-screen flex overflow-hidden">{children}</div>;
}
