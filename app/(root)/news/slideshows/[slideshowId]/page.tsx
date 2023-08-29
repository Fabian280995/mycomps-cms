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

  return (
    <div className="w-full mt-20 max-w-3xl mx-auto">
      <SlideshowClient slideshow={slideshow} slides={slides} />
    </div>
  );
};

export default AddressPage;
