import { fetchFoldersWithImages } from "@/lib/actions/images.actions";
import React from "react";

import PageHeader from "@/components/ui/page-header";
import GalleryClient from "./components/client";

export default async function GalleryPage() {
  const folders = await fetchFoldersWithImages();

  return (
    <section className="relative max-w-7xl mx-auto px-16 py-20">
      <PageHeader title="Gallery" subtitle="Übersicht aller verwendeten Bilder">
        <div className="flex">
          <p className="text-gray-400 ">using</p>
          <a
            href="https://uploadthing.com/dashboard/"
            className="px-2 hover:underline "
          >
            uploadthing.com
          </a>
        </div>
      </PageHeader>
      <GalleryClient folders={folders} />
    </section>
  );
}
