import { verifyJwtToken } from "@/lib/middleware/verify-token";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const decoded = await verifyJwtToken(req);

    if (!decoded) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const clerkId = decoded.sub;
    const user = await prismadb.appUser.findUnique({
      where: {
        clerkId: clerkId as string,
      },
    });

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log("[APP_USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const decoded = await verifyJwtToken(req);

    if (!decoded) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const clerkId = decoded.sub;

    const user = await prismadb.appUser.findUnique({
      where: {
        clerkId: clerkId as string,
      },
    });

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const body = await req.json();
    const { compIds } = body;
    if (compIds === user.compIds) {
      return new NextResponse("No changes", { status: 200 });
    }

    const updatedUser = await prismadb.appUser.update({
      where: {
        clerkId: clerkId as string,
      },
      data: {
        compIds: compIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("[APP_USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
