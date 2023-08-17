import prismadb from "../prismadb";

export const fetchAddresses = async () => {
  try {
    const addresses = await prismadb.address.findMany({
      orderBy: {
        city: "asc",
      },
    });
    return addresses;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Addresses!");
    await prismadb.$disconnect();
  }
};

export const fetchAddress = async (id: string) => {
  // Überprüfen, ob es sich um einen gültigen Hexadezimal-String handelt
  if (!/^[0-9a-fA-F]+$/.test(id)) {
    return null;
  }

  try {
    const address = await prismadb.address.findUnique({
      where: {
        id,
      },
    });
    return address;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Address!");
    await prismadb.$disconnect();
  }
};
