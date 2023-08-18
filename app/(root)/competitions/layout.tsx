import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import BottomNav from "@/components/ui/bottom-nav";
import { Dumbbell, Home, LayoutDashboard, MapPin, Users2 } from "lucide-react";

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
      icon: <LayoutDashboard className="w-6 h-6 " />,
      href: `/competitions`,
      label: "Overview",
    },
    {
      icon: <Dumbbell className="w-6 h-6 " />,
      href: `/competitions/sport`,
      label: "Sport",
    },
    {
      icon: <MapPin className="w-6 h-6 " />,
      href: `/competitions/locations`,
      label: "Locations",
    },
    {
      icon: <Users2 className="w-6 h-6 " />,
      href: `/competitions/organizers`,
      label: "Organizers",
    },
    {
      icon: <Home className="w-6 h-6 " />,
      href: `/competitions/addresses`,
      label: "Addresses",
    },
  ];

  return (
    <div className="relative w-full h-full flex">
      {children}
      <div className="bottom-0 right-0 left-0 absolute flex items-center justify-center">
        <BottomNav routes={routes} />
      </div>
    </div>
  );
}
