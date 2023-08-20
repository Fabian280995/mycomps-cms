import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { imageId: string };
  }
) {
  try {
    if (!params.imageId) {
      return new NextResponse("Missing imageId", { status: 400 });
    }

    const image = await prismadb.image.findUnique({
      where: {
        id: params.imageId,
      },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.log("[IMAGE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { imageId: string };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { url } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!url) {
      return new NextResponse("Missing url", { status: 400 });
    }

    const image = await prismadb.image.updateMany({
      where: {
        id: params.imageId,
      },
      data: { url },
    });
    return NextResponse.json(image);
  } catch (error) {
    console.log("[IMAGE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { imageId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.imageId) {
      return new NextResponse("Missing imageId", { status: 400 });
    }

    const image = await prismadb.image.deleteMany({
      where: {
        id: params.imageId,
      },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.log("[IMAGE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
