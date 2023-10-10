import { verifyJwtToken } from "@/lib/middleware/verify-token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await verifyJwtToken(req);

    const origin = req.headers.get("origin");
    let message = `Hello ${origin}! Du hast es geschafft du Fuchs! Hier sind deine Favoriten :D ...nicht.`;

    return new NextResponse(JSON.stringify({ message }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ message: e.message }), {
      status: 401,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
