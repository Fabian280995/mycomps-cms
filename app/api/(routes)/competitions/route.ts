import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      description,
      startDate,
      endDate,
      sportId,
      locationId,
      organizerId,
    } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Missing Name", { status: 400 });
    if (!description)
      return new NextResponse("Missing Description", { status: 400 });
    if (!startDate)
      return new NextResponse("Missing StartDate", { status: 400 });
    if (!endDate) return new NextResponse("Missing EndDate", { status: 400 });
    if (!sportId) return new NextResponse("Missing SportId", { status: 400 });
    if (!locationId)
      return new NextResponse("Missing LocationId", { status: 400 });
    if (!organizerId)
      return new NextResponse("Missing OrganizerId", { status: 400 });

    const competition = await prismadb.competition.create({
      data: {
        name,
        adminId: userId,
        description,
        startDate,
        endDate,
        sportId,
        locationId,
        organizerId,
      },
    });

    return NextResponse.json(competition);
  } catch (error) {
    console.error("[COMPETITIONS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const competitions = await prismadb.competition.findMany();

    return NextResponse.json(competitions);
  } catch (error) {
    console.error("[COMPETITIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
