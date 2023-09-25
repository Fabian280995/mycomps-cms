import { createApiCall } from "@/lib/actions/apiCalls.actions";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
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
      enrollmentLink,
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
        enrollmentLink,
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
    const sportIds = searchParams.getAll("sportId") || undefined;
    const searchTerm = searchParams.get("searchTerm") || undefined;

    console.log("searchTerm", searchTerm);

    const query: Prisma.CompetitionFindManyArgs = {
      take: limit ? parseInt(limit) : undefined,
      skip: page && limit ? (parseInt(page) - 1) * parseInt(limit) : undefined,
      where: {
        name: searchTerm
          ? {
              contains: searchTerm,
              mode: "insensitive",
            }
          : undefined,
        startDate: startDate ? { gte: new Date(startDate) } : undefined,
        sportId: sportIds.length ? { in: sportIds } : undefined,
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
    };

    const [competitions, count, previous] = await prismadb.$transaction([
      prismadb.competition.findMany(query),
      prismadb.competition.count({
        where: query.where,
      }),
      prismadb.competition.count({
        where: {
          startDate: {
            // set new Date to 00:00:00
            lt: new Date(startDate || new Date().setHours(0, 0, 0, 0)),
          },
          sportId: sportIds.length ? { in: sportIds } : undefined,
        },
      }),
    ]);

    return NextResponse.json({
      pagination: { total: count, previous: previous },
      data: competitions,
    });
  } catch (error) {
    console.error("[COMPETITIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  } finally {
    await prismadb.$disconnect();
  }
}
