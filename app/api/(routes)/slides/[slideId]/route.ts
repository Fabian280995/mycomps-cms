import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { slideId: string };
  }
) {
  try {
    if (!params.slideId) {
      return new NextResponse("Missing slideId", { status: 400 });
    }

    const slide = await prismadb.slide.findUnique({
      where: {
        id: params.slideId,
      },
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.log("[SLIDE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { slideId: string };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { title, description, imageId } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!title) return new NextResponse("Missing Title", { status: 400 });
    if (!imageId) return new NextResponse("Missing Image", { status: 400 });

    if (!params.slideId) {
      return new NextResponse("Missing slideId", { status: 400 });
    }

    const slide = await prismadb.slide.updateMany({
      where: {
        id: params.slideId,
      },
      data: {
        title,
        description,
        imageId,
      },
    });

    console.log("SLIDE_PATCH:", slide);

    return NextResponse.json(slide);
  } catch (error) {
    console.log("[SLIDE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { slideId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.slideId) {
      return new NextResponse("Missing slideId", { status: 400 });
    }

    const slide = await prismadb.slide.deleteMany({
      where: {
        id: params.slideId,
      },
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.log("[SLIDE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
