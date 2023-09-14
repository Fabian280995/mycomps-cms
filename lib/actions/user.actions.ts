"use server";

import { Prisma } from "@prisma/client";
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

/* const userWithApiCalls = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    apiCalls: {
      select: {
        method: true,
      },
    },
  },
});

export type UserWithApiCalls = Prisma.UserGetPayload<
  typeof userWithApiCalls
>; */

export const fetchUsers = async() => {
  try {
    const users = await prismadb.user.findMany();
    return users;
  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  } finally {
    console.log("finally: disconnecting User!");
    await prismadb.$disconnect();
  }
}
