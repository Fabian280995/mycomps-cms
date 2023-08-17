import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { sportId: string };
  }
) {
  try {
    if (!params.sportId) {
      return new NextResponse("Missing sportId", { status: 400 });
    }

    const sport = await prismadb.sport.findUnique({
      where: {
        id: params.sportId,
      },
    });

    return NextResponse.json(sport);
  } catch (error) {
    console.log("[SPORT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { sportId: string };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    if (!params.sportId) {
      return new NextResponse("Missing sportId", { status: 400 });
    }

    const sport = await prismadb.sport.updateMany({
      where: {
        id: params.sportId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(sport);
  } catch (error) {
    console.log("[SPORT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { sportId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.sportId) {
      return new NextResponse("Missing sportId", { status: 400 });
    }

    const sport = await prismadb.sport.deleteMany({
      where: {
        id: params.sportId,
      },
    });

    return NextResponse.json(sport);
  } catch (error) {
    console.log("[SPORT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
