import ImageList from "@/components/gallery/image-list";
import {
  FolderWithImages,
  fetchFolderWithImages,
} from "@/lib/actions/images.actions";
import React from "react";
import FolderClient from "./components/client";

const FolderPage = async ({ params }: { params: { folderId: string } }) => {
  const folder = await fetchFolderWithImages(params.folderId);

  return (
    <section className="relative max-w-7xl mx-auto px-16 py-20">
      {folder ? (
        <FolderClient folder={folder} />
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p>Folder not found</p>
        </div>
      )}
    </section>
  );
};

export default FolderPage;
