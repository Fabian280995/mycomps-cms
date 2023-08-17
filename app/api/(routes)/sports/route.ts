import { fetchSports } from "@/lib/actions/sport.actions";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Missing Name", { status: 400 });

    const sport = await prismadb.sport.create({
      data: {
        name,
        adminId: userId,
      },
    });

    return NextResponse.json(sport);
  } catch (error) {
    console.error("[SPORTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const sports = await fetchSports();

    return NextResponse.json(sports);
  } catch (error) {
    console.error("[SPORTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
