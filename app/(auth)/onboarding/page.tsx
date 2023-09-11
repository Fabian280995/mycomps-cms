import OnboardingForm from "@/components/auth/onboarding-form";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userInfo = await prismadb.user.findUnique({
    where: { clerkId: user.id },
  });
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    clerkId: user.id,
    email: user.emailAddresses[0].emailAddress,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    image: user?.imageUrl || null,
  };

  return (
    <main>
      <div className="mx-auto flex max-w-3xl flex-col rounded-md shadow-md px-10 py-12 bg-white z-50">
        <h1 className="text-gray-900 font-semibold text-3xl">
          Willkommen bei <span>mycomps</span>.de, {user.firstName}.
        </h1>
        <p className="text-gray-600">
          Bevor es los geht müssen noch ein paar Schritte erledigen...
        </p>
        <OnboardingForm userData={userData} />
      </div>
    </main>
  );
}
