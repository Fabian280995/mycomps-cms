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
    <>
      {folder ? (
        <FolderClient folder={folder} />
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p>Folder not found</p>
        </div>
      )}
    </>
  );
};

export default FolderPage;
