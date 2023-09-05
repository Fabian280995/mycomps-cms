import prismadb from "../prismadb";

export const fetchCompetitions = async () => {
  try {
    const competitions = await prismadb.competition.findMany({
      orderBy: {
        startDate: "asc",
      },
      include: {
        logo: true,
        sport: true,
        location: true,
        organizer: true,
      },
    });
    return competitions;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting competitions!");
    await prismadb.$disconnect();
  }
};

export const fetchCompetition = async (id: string) => {
  // Überprüfen, ob es sich um einen gültigen Hexadezimal-String handelt
  if (!/^[0-9a-fA-F]+$/.test(id)) {
    return null;
  }

  try {
    const competition = await prismadb.competition.findUnique({
      where: {
        id,
      },
      include: {
        sport: true,
        location: true,
        organizer: true,
      },
    });
    return competition;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting competition!");
    await prismadb.$disconnect();
  }
};
