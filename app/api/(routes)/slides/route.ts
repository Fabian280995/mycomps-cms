import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { fetchSlideshows } from "@/lib/actions/slideshows.actions";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { title, description, imageId, slideshowId } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!title) return new NextResponse("Title is required", { status: 400 });
    if (!imageId) return new NextResponse("Image is required", { status: 400 });
    if (!slideshowId)
      return new NextResponse("Slideshow is required", { status: 400 });

    const slide = await prismadb.slide.create({
      data: {
        title,
        description,
        imageId,
        slideshowId,
        adminId: userId,
      },
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.error("[SLIDES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const slideshows = await fetchSlideshows();
    return NextResponse.json(slideshows);
  } catch (error) {
    console.error("[SLIDES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
