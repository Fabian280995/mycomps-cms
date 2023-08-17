import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <main className="mx-auto flex max-2-3xl flex-col items-center px-10 py-20">
      <p className="text-gray-500">
        Welcome to the onboarding page, {user.firstName}.
      </p>
    </main>
  );
}
