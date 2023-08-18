import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import BottomNav from "@/components/ui/bottom-nav";
import {
  Dumbbell,
  LayoutDashboard,
  MapPin,
  Paperclip,
  PictureInPicture2,
} from "lucide-react";

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

  const routes = [
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      href: `/news`,
      label: "Overview",
    },
    {
      icon: <Paperclip className="w-6 h-6" />,
      href: `/news/articles`,
      label: "Articles",
    },
    {
      icon: <PictureInPicture2 className="w-6 h-6" />,
      href: `/news/pictures`,
      label: "Pictures",
    },
  ];

  return (
    <div className="relative w-full h-full flex">
      {children}
      <div className="absolute bottom-0 right-0 left-0 flex items-center justify-center">
        <BottomNav routes={routes} />
      </div>
    </div>
  );
}
