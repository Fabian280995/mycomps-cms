import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { competitionId: string };
  }
) {
  try {
    if (!params.competitionId) {
      return new NextResponse("Missing competitionId", { status: 400 });
    }

    const competition = await prismadb.competition.findUnique({
      where: {
        id: params.competitionId,
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
    });

    return NextResponse.json(competition);
  } catch (error) {
    console.log("[COMPETITION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { competitionId: string };
  }
) {
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

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }
    if (!startDate) {
      return new NextResponse("Missing startDate", { status: 400 });
    }
    if (!endDate) {
      return new NextResponse("Missing endDate", { status: 400 });
    }
    if (!sportId) {
      return new NextResponse("Missing sportId", { status: 400 });
    }
    if (!locationId) {
      return new NextResponse("Missing locationId", { status: 400 });
    }
    if (!organizerId) {
      return new NextResponse("Missing organizerId", { status: 400 });
    }

    if (!params.competitionId) {
      return new NextResponse("Missing competitionId", { status: 400 });
    }

    const competition = await prismadb.competition.updateMany({
      where: {
        id: params.competitionId,
      },
      data: {
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
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { competitionId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.competitionId) {
      return new NextResponse("Missing competitionId", { status: 400 });
    }

    const competition = await prismadb.competition.deleteMany({
      where: {
        id: params.competitionId,
      },
    });

    return NextResponse.json(competition);
  } catch (error) {
    console.log("[COMPETITION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
