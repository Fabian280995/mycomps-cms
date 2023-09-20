import SidebarToggle from "@/components/sidebar/sidebar-toggle";
import ClientContainer from "@/components/ui/client-container";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function GalleryLayout({
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
    <div className="relative w-full h-full flex">
      <ClientContainer>{children}</ClientContainer>
      <SidebarToggle />
    </div>
  );
}
