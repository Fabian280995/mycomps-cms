import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { locationId: string };
  }
) {
  try {
    if (!params.locationId) {
      return new NextResponse("Missing locationId", { status: 400 });
    }

    const location = await prismadb.location.findUnique({
      where: {
        id: params.locationId,
      },
    });

    return NextResponse.json(location);
  } catch (error) {
    console.log("[LOCATION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { locationId: string };
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

    if (!params.locationId) {
      return new NextResponse("Missing locationId", { status: 400 });
    }

    const location = await prismadb.location.updateMany({
      where: {
        id: params.locationId,
      },
      data: {
        name,
        url,
        addressId,
      },
    });
    return NextResponse.json(location);
  } catch (error) {
    console.log("[LOCATION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request, // Unused, params has to be second argument
  {
    params,
  }: {
    params: { locationId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.locationId) {
      return new NextResponse("Missing locationId", { status: 400 });
    }

    const location = await prismadb.location.deleteMany({
      where: {
        id: params.locationId,
      },
    });

    return NextResponse.json(location);
  } catch (error) {
    console.log("[LOCATION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
