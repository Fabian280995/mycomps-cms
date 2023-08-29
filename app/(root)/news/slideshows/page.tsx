import React from "react";

import PageHeader from "@/components/ui/page-header";
import { fetchSlideshows } from "@/lib/actions/slideshows.actions";
import SlideshowsClient from "./components/client";
import AddButton from "@/components/ui/add-button";

export default async function GalleryPage() {
  const slideshows = await fetchSlideshows();

  return (
    <section className="relative w-full px-16 py-20">
      <PageHeader title="Slideshows" subtitle="Erstelle und plane Slideshows" />
      <SlideshowsClient slideshows={slideshows} />
    </section>
  );
}
