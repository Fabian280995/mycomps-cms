import { createApiCall } from "@/lib/actions/apiCalls.actions";
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
      logoId,
      sportId,
      locationId,
      organizerId,
      isPublished,
    } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Missing Name", { status: 400 });
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
        logoId,
        sportId,
        locationId,
        organizerId,
        isPublished,
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
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || undefined;
    const limit = searchParams.get("limit") || undefined;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const sportIds = searchParams.getAll("sportId") || undefined;
    const locationId = searchParams.get("locationId") || undefined;
    const organizerId = searchParams.get("organizerId") || undefined;

    const competitions = await prismadb.competition.findMany({
      take: limit ? parseInt(limit) : undefined,
      skip: page && limit ? (parseInt(page) - 1) * parseInt(limit) : undefined,
      where: {
        startDate:
          startDate && endDate
            ? { gte: new Date(startDate), lte: new Date(endDate) }
            : startDate
            ? { gte: new Date(startDate) }
            : undefined,
        sportId: sportIds.length ? { in: sportIds } : undefined,
        locationId,
        organizerId,
        isPublished: true,
      },
      include: {
        sport: {
          include: {
            image: {
              select: {
                url: true,
              },
            },
          },
        },
        location: {
          include: {
            address: true,
          },
        },
        organizer: true,
        logo: true,
      },
      orderBy: {
        startDate: "asc",
      },
    });

    return NextResponse.json(competitions);
  } catch (error) {
    console.error("[COMPETITIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  } finally {
    await prismadb.$disconnect();
  }
}
