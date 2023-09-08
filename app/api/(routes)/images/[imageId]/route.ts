import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { utapi } from "uploadthing/server";

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
    const { folderId } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!folderId) {
      return new NextResponse("Missing url", { status: 400 });
    }

    const image = await prismadb.image.updateMany({
      where: {
        id: params.imageId,
      },
      data: { folderId },
    });
    return NextResponse.json(image);
  } catch (error) {
    console.log("[IMAGE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { imageId: string };
  }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const body = await req.json();
    const { key } = body;

    if (!params.imageId) {
      return new NextResponse("Missing imageId", { status: 400 });
    }
    if (!key) return new NextResponse("Missing key", { status: 400 });

    const result = await utapi.deleteFiles(key);

    console.log("[UTAPI_DELETE]", result);

    if (!result) {
      return new NextResponse("Internal error", { status: 500 });
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
