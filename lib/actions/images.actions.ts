"use server";
import prismadb from "../prismadb";

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
