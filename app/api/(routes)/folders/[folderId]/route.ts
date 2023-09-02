import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { folderId: string };
  }
) {
  try {
    if (!params.folderId) {
      return new NextResponse("Missing folderId", { status: 400 });
    }

    const imageFolder = await prismadb.imageFolder.findUnique({
      where: {
        id: params.folderId,
      },
    });

    return NextResponse.json(imageFolder);
  } catch (error) {
    console.log("[imageFolder_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { folderId: string };
  }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    const imageFolder = await prismadb.imageFolder.updateMany({
      where: {
        id: params.folderId,
      },
      data: { name },
    });

    return NextResponse.json(imageFolder);
  } catch (error) {
    console.log("[imageFolder_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { folderId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.folderId) {
      return new NextResponse("Missing folderId", { status: 400 });
    }

    const imageFolder = await prismadb.imageFolder.deleteMany({
      where: {
        id: params.folderId,
      },
    });

    return NextResponse.json(imageFolder);
  } catch (error) {
    console.log("[imageFolder_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
