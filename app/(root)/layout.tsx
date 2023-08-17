import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Sidebar from "@/components/sidebar";

export default async function SetupLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full h-full flex">
      <Sidebar />
      {children}
    </div>
  );
}
