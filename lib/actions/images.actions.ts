"use server";
import { Prisma } from "@prisma/client";
import prismadb from "../prismadb";

// Images

export const fetchImages = async () => {
  try {
    const images = await prismadb.image.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return images;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Images!");
    await prismadb.$disconnect();
  }
};

// Image

export const fetchImage = async (id: string) => {
  // Überprüfen, ob es sich um einen gültigen Hexadezimal-String handelt
  if (!/^[0-9a-fA-F]+$/.test(id)) {
    return null;
  }

  try {
    const image = await prismadb.image.findUnique({
      where: {
        id,
      },
    });
    return image;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Image!");
    await prismadb.$disconnect();
  }
};

export const fetchImagesByFolderId = async (folderId: string) => {
  try {
    const images = await prismadb.image.findMany({
      where: {
        folderId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return images;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Images!");
    await prismadb.$disconnect();
  }
};

// Folders

const folderWithImages = Prisma.validator<Prisma.ImageFolderDefaultArgs>()({
  include: {
    images: true,
  },
});

export type FolderWithImages = Prisma.ImageFolderGetPayload<
  typeof folderWithImages
>;

export const fetchFoldersWithImages = async () => {
  try {
    const foldersWithImages = await prismadb.imageFolder.findMany({
      include: {
        images: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return foldersWithImages;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Folders!");
    await prismadb.$disconnect();
  }
};

export const fetchFolders = async () => {
  try {
    const folders = await prismadb.imageFolder.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return folders;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Folders!");
    await prismadb.$disconnect();
  }
};

export const fetchFolderWithImages = async (id: string) => {
  // Überprüfen, ob es sich um einen gültigen Hexadezimal-String handelt
  if (!/^[0-9a-fA-F]+$/.test(id)) {
    return null;
  }

  try {
    const folderWithImages = await prismadb.imageFolder.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });
    return folderWithImages;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Folder!");
    await prismadb.$disconnect();
  }
};
