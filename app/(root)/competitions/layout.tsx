import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import BottomNav from "@/components/ui/bottom-nav";
import ClientContainer from "@/components/ui/client-container";
import { Dumbbell, Home, MapPin, Trophy, Users2 } from "lucide-react";
import Script from "next/script";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const routes = [
    {
      icon: <Trophy className="w-6 h-6 " />,
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
      <ClientContainer>{children}</ClientContainer>
      <div className="bottom-4 w-full absolute mx-auto z-20 flex items-center justify-center">
        <BottomNav routes={routes} />
      </div>
      <Script
        id="googlemaps"
        type="text/javascript"
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
      />
    </div>
  );
}
