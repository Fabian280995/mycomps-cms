import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { slideshowId: string };
  }
) {
  try {
    if (!params.slideshowId) {
      return new NextResponse("Missing slideshowId", { status: 400 });
    }

    const slideshow = await prismadb.slideshow.findUnique({
      where: {
        id: params.slideshowId,
      },
    });

    return NextResponse.json(slideshow);
  } catch (error) {
    console.log("[SLIDESHOW_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { slideshowId: string };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, isPublished } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Missing name", { status: 400 });

    if (!params.slideshowId) {
      return new NextResponse("Missing slideshowId", { status: 400 });
    }

    const slideshow = await prismadb.slideshow.updateMany({
      where: {
        id: params.slideshowId,
      },
      data: {
        name,
        isPublished,
      },
    });

    return NextResponse.json(slideshow);
  } catch (error) {
    console.log("[SLIDESHOW_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { slideshowId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.slideshowId) {
      return new NextResponse("Missing slideshowId", { status: 400 });
    }

    const slideshow = await prismadb.slideshow.deleteMany({
      where: {
        id: params.slideshowId,
      },
    });

    return NextResponse.json(slideshow);
  } catch (error) {
    console.log("[SLIDESHOW_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
