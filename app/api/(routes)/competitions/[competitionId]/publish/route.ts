import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

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
    const { isPublished } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.competitionId) {
      return new NextResponse("Missing competitionId", { status: 400 });
    }

    console.log("PATCH_COMPETITION_BODY:", body);
    const competition = await prismadb.competition.updateMany({
      where: {
        id: params.competitionId,
      },
      data: {
        isPublished,
      },
    });
    return NextResponse.json(competition);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
