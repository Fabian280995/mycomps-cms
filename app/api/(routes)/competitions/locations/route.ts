import { filterCompsByDistance } from "@/lib/filter-comps-by-distance";
import prismadb from "@/lib/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import * as z from "zod";

const LocationInputSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  radius: z.number().min(0),
});

function validateLocationInput(
  lat: number,
  lng: number,
  radius: number
): boolean {
  return LocationInputSchema.safeParse({ lat, lng, radius }).success;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const startDate = searchParams.get("startDate");
    const searchTerm = searchParams.get("searchTerm");
    const sportIds = searchParams.getAll("sportId");
    const lat = parseFloat(searchParams.get("lat") || "");
    const lng = parseFloat(searchParams.get("lng") || "");
    const radius = parseFloat(searchParams.get("radius") || "");

    if (!validateLocationInput(lat, lng, radius)) {
      return new NextResponse("Invalid or missing arguments", { status: 400 });
    }

    const query: Prisma.CompetitionFindManyArgs = {
      where: {
        name: searchTerm
          ? { contains: searchTerm, mode: "insensitive" }
          : undefined,
        startDate: startDate ? { gte: new Date(startDate) } : undefined,
        sportId: sportIds.length ? { in: sportIds } : undefined,
        isPublished: true,
      },
      orderBy: { startDate: "asc" },
      select: {
        id: true,
        location: { select: { address: { select: { lat: true, lng: true } } } },
      },
    };

    const partialComps = await prismadb.competition.findMany(query);

    const filteredCompIds = filterCompsByDistance(
      // @ts-ignore
      partialComps,
      lat,
      lng,
      radius
    );

    const comps = await prismadb.competition.findMany({
      where: { id: { in: filteredCompIds } },
      include: {
        sport: { include: { image: { select: { url: true } } } },
        location: { include: { address: true } },
        organizer: true,
        logo: true,
      },
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json(comps);
  } catch (error) {
    console.error("[COMPETITIONS_LOCATIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  } finally {
    await prismadb.$disconnect();
  }
}

/* import {
  CompetitionLocation,
  filterCompsByDistance,
} from "@/lib/filter-comps-by-distance";
import prismadb from "@/lib/prismadb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import * as z from "zod";

const LocationInputSchema = z.object({
  lat: z.number().min(-90).max(90), // Breitengrad sollte zwischen -90 und 90 liegen
  lng: z.number().min(-180).max(180), // Längengrad sollte zwischen -180 und 180 liegen
  radius: z.number().min(0), // Radius sollte positiv sein
});

function validateLocationInput(
  lat: number,
  lng: number,
  radius: number
): boolean {
  const validationResult = LocationInputSchema.safeParse({ lat, lng, radius });

  console.log(validationResult);

  if (!validationResult.success) {
    return false;
  }

  return true;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate") || undefined;
    const sportIds = searchParams.getAll("sportId") || undefined;
    const searchTerm = searchParams.get("searchTerm") || undefined;
    const latString = searchParams.get("lat") || undefined;
    const lngString = searchParams.get("lng") || undefined;
    const radiusString = searchParams.get("radius") || undefined;

    if (!latString || !lngString || !radiusString) {
      return new NextResponse("Missing required arguments", { status: 400 });
    }

    const lat = parseFloat(latString);
    const lng = parseFloat(lngString);
    const radius = parseFloat(radiusString);

    if (isNaN(lat) || isNaN(lng) || isNaN(radius)) {
      return new NextResponse("Invalid arguments", { status: 400 });
    }

    if (!validateLocationInput(lat, lng, radius)) {
      return new NextResponse("Invalid arguments", { status: 400 });
    }

    const query: Prisma.CompetitionFindManyArgs = {
      where: {
        name: searchTerm
          ? { contains: searchTerm, mode: "insensitive" }
          : undefined,
        startDate: startDate ? { gte: new Date(startDate) } : undefined,
        sportId: sportIds.length ? { in: sportIds } : undefined,
        isPublished: true,
      },
      orderBy: {
        startDate: "asc",
      },
      select: {
        id: true,
        location: {
          select: {
            address: {
              select: {
                lat: true,
                lng: true,
              },
            },
          },
        },
      },
    };

    const partialComps = await prismadb.competition.findMany(query);

    const filteredCompIds = filterCompsByDistance(
      // @ts-ignore
      partialComps,
      lat,
      lng,
      radius
    );

    const comps = await prismadb.competition.findMany({
      where: {
        id: { in: filteredCompIds },
      },
      include: {
        sport: {
          include: {
            image: {
              select: {
                url: true,
              },
            },
          },
        },
        location: {
          include: {
            address: true,
          },
        },
        organizer: true,
        logo: true,
      },
      orderBy: {
        startDate: "asc",
      },
    });

    return NextResponse.json(comps);
  } catch (error) {
    console.error("[COMPETITIONS_LOCATIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  } finally {
    await prismadb.$disconnect();
  }
}
 */
