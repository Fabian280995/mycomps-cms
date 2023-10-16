import { fetchAddresses } from "@/lib/actions/addresses.actions";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

    const address = await prismadb.address.create({
      data: {
        country,
        state,
        zip,
        city,
        street,
        number,
        adminId: userId,
        lat,
        lng,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.error("[ADDRESSES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  } finally {
    await prismadb.$disconnect();
  }
}

export async function GET(req: Request) {
  try {
    const addresses = await fetchAddresses();

    return NextResponse.json(addresses);
  } catch (error) {
    console.error("[ADDRESSES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
