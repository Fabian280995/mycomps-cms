import { verifyJwtToken } from "@/lib/middleware/verify-token";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const decoded = await verifyJwtToken(req);

    if (!decoded || !decoded.sub) {
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

    const programs = await prismadb.trainingProgram.findMany({
      where: {
        appUserId: user.id,
      },
    });

    return NextResponse.json(programs);
  } catch (error) {
    console.log("[APP_USER_PROGRAMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
