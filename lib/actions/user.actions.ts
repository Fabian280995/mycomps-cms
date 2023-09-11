"use server";

import prismadb from "../prismadb";

interface createUserProps {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const createUser = async ({
  clerkId,
  email,
  firstName,
  lastName,
}: createUserProps) => {
  try {
    const user = await prismadb.user.create({
      data: {
        clerkId,
        email,
        firstName,
        lastName,
        onboarded: true,
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  } finally {
    console.log("finally: disconnecting User!");
    await prismadb.$disconnect();
  }
};
