import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { name } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    const imageFolder = await prismadb.imageFolder.create({
      data: {
        name,
        adminId: userId,
      },
    });

    return NextResponse.json(imageFolder);
  } catch (error) {
    console.error("[IMAGEFOLDER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const imageFolder = await prismadb.imageFolder.findMany({
      where: {
        adminId: userId,
      },
    });

    return NextResponse.json(imageFolder);
  } catch (error) {
    console.error("[IMAGEFOLDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
