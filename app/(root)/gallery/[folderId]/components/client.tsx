"use client";
import FolderHeader from "@/components/gallery/folder-header";
import ImageList from "@/components/gallery/image-list";
import { FolderWithImages } from "@/lib/actions/images.actions";
import React from "react";

interface Props {
  folder: FolderWithImages;
}
const FolderClient = ({ folder }: Props) => {
  return (
    <div className="space-y-6">
      <FolderHeader id={folder.id} title={folder.name} />
      <hr className="my-4" />
      <ImageList images={folder.images} />
    </div>
  );
};

export default FolderClient;
