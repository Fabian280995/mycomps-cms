import { fetchFoldersWithImages } from "@/lib/actions/images.actions";
import React from "react";

import PageHeader from "@/components/ui/page-header";
import GalleryClient from "./components/client";
import ClientContainer from "../../../components/ui/client-container";

export default async function GalleryPage() {
  const folders = await fetchFoldersWithImages();

  return (
    <ClientContainer>
      <PageHeader title="Gallerie">
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
    </ClientContainer>
  );
}
