import React from "react";
import {
  fetchSlidesBySlideshowId,
  fetchSlideshow,
} from "@/lib/actions/slideshows.actions";

import SlideshowClient from "./components/client";
import { redirect } from "next/navigation";

const AddressPage = async ({ params }: { params: { slideshowId: string } }) => {
  const slideshow = await fetchSlideshow(params.slideshowId);
  const slides = await fetchSlidesBySlideshowId(params.slideshowId);

  if (!slideshow) {
    redirect("/news/slideshows");
  }

  return <SlideshowClient slideshow={slideshow} slides={slides} />;
};

export default AddressPage;
