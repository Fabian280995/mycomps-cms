import { fetchImages } from "@/lib/actions/images.actions";
import { Loader } from "lucide-react";
import React from "react";

import PageHeader from "@/components/ui/page-header";
import GalleryClient from "./components/client";

export default async function GalleryPage() {
  const images = await fetchImages();

  return (
    <section className="relative w-full px-16 py-20">
      <PageHeader title="Gallery" subtitle="Übersicht aller verwendeten Bilder">
        <div className="hover:bg-gray-200 rounded-md ">
          <a
            href="https://uploadthing.com/dashboard/tjbcl11obr/files"
            className="px-2 hover:underline"
          >
            uploadthing.com
          </a>
        </div>
      </PageHeader>
      <GalleryClient images={images} />
    </section>
  );
}
