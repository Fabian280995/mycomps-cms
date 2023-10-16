import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { addressId: string };
  }
) {
  try {
    if (!params.addressId) {
      return new NextResponse("Missing addressId", { status: 400 });
    }

    const address = await prismadb.address.findUnique({
      where: {
        id: params.addressId,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { addressId: string };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { country, state, zip, city, street, number, lat, lng } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!country) return new NextResponse("Missing Country", { status: 400 });
    if (!state) return new NextResponse("Missing State", { status: 400 });
    if (!zip) return new NextResponse("Missing Zip", { status: 400 });
    if (!city) return new NextResponse("Missing City", { status: 400 });
    if (!street) return new NextResponse("Missing Street", { status: 400 });
    if (!number) return new NextResponse("Missing Number", { status: 400 });
    if (!lat) return new NextResponse("Missing Latitude", { status: 400 });
    if (!lng) return new NextResponse("Missing Longitude", { status: 400 });

    if (!params.addressId) {
      return new NextResponse("Missing competitionId", { status: 400 });
    }

    const address = await prismadb.address.updateMany({
      where: {
        id: params.addressId,
      },
      data: {
        country,
        state,
        zip,
        city,
        street,
        number,
        lat,
        lng,
      },
    });
    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { addressId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.addressId) {
      return new NextResponse("Missing addressId", { status: 400 });
    }

    const address = await prismadb.address.deleteMany({
      where: {
        id: params.addressId,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
