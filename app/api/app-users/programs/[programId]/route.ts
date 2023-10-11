import { verifyJwtToken } from "@/lib/middleware/verify-token";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { programId: string };
  }
) {
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

    const program = await prismadb.trainingProgram.findUnique({
      where: {
        id: params.programId,
      },
    });

    return NextResponse.json(program);
  } catch (error) {
    console.log("[APP_USER_PROGRAM_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
