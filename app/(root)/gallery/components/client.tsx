"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { Ban, FolderPlus, ImagePlus, Trash2 } from "lucide-react";

import { useUploadThing } from "@/lib/uploadthing";

import { ImageUploadModal } from "@/components/modals/imageupload-modal";
import { Button } from "@/components/ui/button";
import UploadToast from "@/components/ui/upload-toast";
import FolderModal from "@/components/modals/folder-modal";
import { FolderWithImages } from "@/lib/actions/images.actions";
import FoldersList from "@/components/gallery/folders-list";

interface Props {
  folders: FolderWithImages[];
}

const GalleryClient = ({ folders }: Props) => {
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const [imageModalOpen, setImageModalOpen] = React.useState(false);
  const [folderModalOpen, setFolderModalOpen] = React.useState(false);

  const router = useRouter();

  const cardFolders = folders.map((folder) => ({
    id: folder.id,
    name: folder.name,
    images: folder.images,
    createdAt: folder.createdAt.toLocaleDateString(),
  }));

  const { startUpload } = useUploadThing("media", {
    onClientUploadComplete: () => {
      toast.success("Image uploaded to Uploadthing.com!");
      onUploadEnd();
    },
    onUploadError: () => {
      toast.error("Something went wrong uploading to Uploadthing.com!");
      onUploadEnd();
    },
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
  });

  const handleUpload = async (files: File[], folderId: string) => {
    setLoading(true);

    if (!files.length) return toast.error("No files selected");
    if (!folderId) return toast.error("No folder selected");

    setUploadOpen(true);
    const imgRes = await startUpload(files);

    if (imgRes && imgRes[0].url) {
      await axios.post(`/api/images`, {
        url: imgRes[0].url,
        key: imgRes[0].key,
        folderId,
      });
    }
    setLoading(false);
    router.refresh();
  };

  const onUploadEnd = () => {
    setUploadOpen(false);
    setProgress(0);
  };

  return (
    <>
      <ImageUploadModal
        isOpen={imageModalOpen}
        onClose={() => {
          setImageModalOpen(false);
        }}
        onUpload={handleUpload}
        loading={loading}
      />
      <FolderModal
        isOpen={folderModalOpen}
        onClose={() => {
          setFolderModalOpen(false);
        }}
      />
      <AnimatePresence mode="wait">
        {uploadOpen ? (
          <UploadToast
            isOpen={uploadOpen}
            message="Uploading image."
            progress={progress}
          />
        ) : null}
      </AnimatePresence>
      <div className="max-w-5xl mx-auto mt-4 space-y-4 mb-14">
        <div className="flex justify-end">
          <div className="flex gap-x-2 items-center">
            <Button
              variant="outline"
              onClick={() => setImageModalOpen(true)}
              disabled={loading}
            >
              <ImagePlus className="w-6 h-6 mr-2" />
              Upload Image
            </Button>
            <Button
              onClick={() => setFolderModalOpen(true)}
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-900"
            >
              <FolderPlus className="w-6 h-6 mr-2" />
              Create Folder
            </Button>
          </div>
        </div>
        <FoldersList folders={cardFolders} />
      </div>
    </>
  );
};

export default GalleryClient;
