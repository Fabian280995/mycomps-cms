import prismadb from "../prismadb";

export const fetchLocations = async () => {
  try {
    const locations = await prismadb.location.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        address: true,
      },
    });
    return locations;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting locations!");
    await prismadb.$disconnect();
  }
};

export const fetchLocation = async (id: string) => {
  // Überprüfen, ob es sich um einen gültigen Hexadezimal-String handelt
  if (!/^[0-9a-fA-F]+$/.test(id)) {
    return null;
  }

  try {
    const location = await prismadb.location.findUnique({
      where: {
        id,
      },
      include: {
        address: true,
      },
    });
    return location;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Location!");
    await prismadb.$disconnect();
  }
};
