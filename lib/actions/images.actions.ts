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
