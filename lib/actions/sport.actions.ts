import prismadb from "../prismadb";

export const fetchSports = async () => {
  try {
    const sports = await prismadb.sport.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return sports;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Sports!");
    await prismadb.$disconnect();
  }
};

export const fetchSport = async (id: string) => {
  // Überprüfen, ob es sich um einen gültigen Hexadezimal-String handelt
  if (!/^[0-9a-fA-F]+$/.test(id)) {
    return null;
  }

  try {
    const sport = await prismadb.sport.findUnique({
      where: {
        id,
      },
    });
    return sport;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Sport!");
    await prismadb.$disconnect();
  }
};

export const fetchSportsWithImage = async () => {
  try {
    const sports = await prismadb.sport.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        image: true,
      },
    });
    return sports;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Sports!");
    await prismadb.$disconnect();
  }
};
