"use server";
import prismadb from "../prismadb";

// Actions for handling AppUser data from Clerk-Webhooks

interface appUserProps {
  clerkId: string;
  email: string;
  imageUrl?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  banned?: boolean;
}

// Create AppUser
export const createAppUser = async ({
  clerkId,
  email,
  imageUrl,
  username,
  firstName,
  lastName,
  banned,
}: appUserProps) => {
  try {
    const user = await prismadb.appUser.create({
      data: {
        clerkId,
        email,
        imageUrl,
        username,
        firstName,
        lastName,
        banned,
      },
    });
    return user;
  } catch (error) {
    throw error;
  } finally {
    await prismadb.$disconnect();
  }
};

// Update AppUser
export const updateAppUser = async ({
  clerkId,
  email,
  imageUrl,
  username,
  firstName,
  lastName,
  banned,
}: appUserProps) => {
  try {
    const user = await prismadb.appUser.update({
      where: {
        clerkId,
      },
      data: {
        email,
        imageUrl,
        username,
        firstName,
        lastName,
        banned,
      },
    });
    return user;
  } catch (error) {
    throw error;
  } finally {
    await prismadb.$disconnect();
  }
};

// Delete AppUser
export const deleteAppUser = async (id: string) => {
  try {
    const user = await prismadb.appUser.findUnique({
      where: {
        clerkId: id,
      },
    });
    if (!user) return null;
    await prismadb.appUser.update({
      where: {
        clerkId: id,
      },
      data: {
        isDeleted: true,
      },
    });
    return user;
  } catch (error) {
    throw error;
  } finally {
    await prismadb.$disconnect();
  }
};
