import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { url, folderId, key } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!url) {
      return new NextResponse("Missing url", { status: 400 });
    }
    if (!key) {
      return new NextResponse("Missing key", { status: 400 });
    }

    const image = await prismadb.image.create({
      data: {
        url,
        key,
        folderId,
        adminId: userId,
      },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error("[IMAGES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const images = await prismadb.image.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error("[IMAGES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
