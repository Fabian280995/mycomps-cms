import React from "react";
import {
  fetchSlidesBySlideshowId,
  fetchSlideshow,
} from "@/lib/actions/slideshows.actions";

import SlideshowClient from "./components/client";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

const AddressPage = async ({ params }: { params: { slideshowId: string } }) => {
  const slideshow = await fetchSlideshow(params.slideshowId);
  const slides = await fetchSlidesBySlideshowId(params.slideshowId);

  if (!slideshow) {
    redirect("/news/slideshows");
  }

  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const userInfo = await prismadb.user.findUnique({
    where: { clerkId: userId },
  });
  if (!userInfo) redirect("/");

  return (
    <SlideshowClient
      slideshow={slideshow}
      slides={slides}
      userInfo={userInfo}
    />
  );
};

export default AddressPage;
