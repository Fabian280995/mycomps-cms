import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import {
  fetchPublishedSlideshows,
  fetchSlideshows,
} from "@/lib/actions/slideshows.actions";
import { createApiCall } from "@/lib/actions/apiCalls.actions";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, isPublished } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!name) return new NextResponse("Name is required", { status: 400 });

    const slideshow = await prismadb.slideshow.create({
      data: {
        name,
        isPublished,
        adminId: userId,
      },
    });

    return NextResponse.json(slideshow);
  } catch (error) {
    console.error("[SLIDESHOWS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const slideshows = await fetchPublishedSlideshows();

    return NextResponse.json(slideshows);
  } catch (error) {
    console.error("[SLIDESHOWS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
