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
      <div className="overflow-y-auto flex-1">{children}</div>
    </div>
  );
}
