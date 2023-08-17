import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { organizerId: string };
  }
) {
  try {
    if (!params.organizerId) {
      return new NextResponse("Missing organizerId", { status: 400 });
    }

    const organizer = await prismadb.organizer.findUnique({
      where: {
        id: params.organizerId,
      },
    });

    return NextResponse.json(organizer);
  } catch (error) {
    console.log("[ORGANIZER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { organizerId: string };
  }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, url, addressId } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Missing Name", { status: 400 });
    if (!url) return new NextResponse("Missing URL", { status: 400 });
    if (!addressId) return new NextResponse("Missing Address", { status: 400 });

    if (!params.organizerId) {
      return new NextResponse("Missing organizerId", { status: 400 });
    }

    const organizer = await prismadb.organizer.updateMany({
      where: {
        id: params.organizerId,
      },
      data: {
        name,
        url,
        addressId,
      },
    });
    return NextResponse.json(organizer);
  } catch (error) {
    console.log("[ORGANIZER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { organizerId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.organizerId) {
      return new NextResponse("Missing organizerId", { status: 400 });
    }

    const organizer = await prismadb.organizer.deleteMany({
      where: {
        id: params.organizerId,
      },
    });

    return NextResponse.json(organizer);
  } catch (error) {
    console.log("[ORGANIZER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
