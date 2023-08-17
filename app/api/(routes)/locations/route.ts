import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { fetchLocations } from "@/lib/actions/location.actions";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, addressId, url } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!addressId)
      return new NextResponse("Address is required", { status: 400 });
    if (!url) return new NextResponse("URL is required", { status: 400 });

    const location = await prismadb.location.create({
      data: {
        name,
        url,
        addressId,
        adminId: userId,
      },
    });

    return NextResponse.json(location);
  } catch (error) {
    console.error("[LOCATIONS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const locations = await fetchLocations();

    return NextResponse.json(locations);
  } catch (error) {
    console.error("[LOCATIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
