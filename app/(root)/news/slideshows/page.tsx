import React from "react";

import { fetchSlideshows } from "@/lib/actions/slideshows.actions";
import SlideshowsClient from "./components/client";

export default async function GalleryPage() {
  const slideshows = await fetchSlideshows();

  return <SlideshowsClient slideshows={slideshows} />;
}
