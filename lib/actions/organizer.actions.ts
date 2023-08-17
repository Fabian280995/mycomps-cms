import prismadb from "../prismadb";

export const fetchOrganizers = async () => {
  try {
    const organizers = await prismadb.organizer.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        address: true,
      },
    });
    return organizers;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Organizers!");
    await prismadb.$disconnect();
  }
};

export const fetchOrganizer = async (id: string) => {
  // Überprüfen, ob es sich um einen gültigen Hexadezimal-String handelt
  if (!/^[0-9a-fA-F]+$/.test(id)) {
    return null;
  }

  try {
    const organizer = await prismadb.organizer.findUnique({
      where: {
        id,
      },
      include: {
        address: true,
      },
    });
    return organizer;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Organizer!");
    await prismadb.$disconnect();
  }
};
