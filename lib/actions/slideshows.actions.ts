"use server";

import prismadb from "../prismadb";

// Slideshows

export const fetchSlideshows = async () => {
  try {
    const slideshows = await prismadb.slideshow.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return slideshows;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Slideshows!");
    await prismadb.$disconnect();
  }
};

export const fetchSlideshow = async (id: string) => {
  // Überprüfen, ob es sich um einen gültigen Hexadezimal-String handelt
  if (!/^[0-9a-fA-F]+$/.test(id)) {
    return null;
  }

  try {
    const slideshow = await prismadb.slideshow.findUnique({
      where: {
        id,
      },
    });
    return slideshow;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Slideshow!");
    await prismadb.$disconnect();
  }
};

export const fetchPublishedSlideshows = async () => {
  try {
    const slideshows = await prismadb.slideshow.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        slides: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            image: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    });
    return slideshows;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Slideshows!");
    await prismadb.$disconnect();
  }
};

// Slides

export const fetchSlidesBySlideshowId = async (id: string) => {
  // Überprüfen, ob es sich um einen gültigen Hexadezimal-String handelt
  if (!/^[0-9a-fA-F]+$/.test(id)) {
    return null;
  }

  try {
    const slides = await prismadb.slide.findMany({
      where: {
        slideshowId: id,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        image: true,
      },
    });
    return slides;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Slides!");
    await prismadb.$disconnect();
  }
};

export const fetchSlide = async (id: string) => {
  // Überprüfen, ob es sich um einen gültigen Hexadezimal-String handelt
  if (!/^[0-9a-fA-F]+$/.test(id)) {
    return null;
  }

  try {
    const slide = await prismadb.slide.findUnique({
      where: {
        id,
      },
      include: {
        image: true,
      },
    });
    return slide;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally: disconnecting Slide!");
    await prismadb.$disconnect();
  }
};
