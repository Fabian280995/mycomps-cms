"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

import { useUploadThing } from "@/lib/uploadthing";
import { Image as PrismaImage } from "@prisma/client";

import ImageCard from "@/components/cards/image-card";
import { AlertModal } from "@/components/modals/alert-modal";
import { ImageUploadModal } from "@/components/modals/imageupload-modal";
import { Button } from "@/components/ui/button";
import UploadToast from "@/components/ui/upload-toast";

interface Props {
  images: PrismaImage[];
}

const GalleryClient = ({ images }: Props) => {
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [selectedImages, setSelectedImages] = React.useState<string[]>([]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);

  const router = useRouter();

  const onUploadEnd = () => {
    setUploadOpen(false);
    setProgress(0);
  };

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

  const handleUpload = async (files: File[]) => {
    setLoading(true);
    setUploadOpen(true);
    const imgRes = await startUpload(files);

    if (imgRes && imgRes[0].url) {
      await axios.post(`/api/images`, {
        url: imgRes[0].url,
      });
    }
    setLoading(false);
    router.refresh();
  };

  const onDeleteImage = async (id: string) => {
    setLoading(true);
    await axios.delete(`/api/images/${id}`);
    toast.success("Image deleted");
    setAlertOpen(false);
    router.refresh();
    setLoading(false);
  };

  const onSelectImage = (id: string) => {
    if (selectedImages.includes(id)) {
      setSelectedImages((prev) => prev.filter((i) => i !== id));
    } else {
      setSelectedImages((prev) => [...prev, id]);
    }
  };

  const onDeleteSelectedImages = (ids: string[]) => {
    setLoading(true);
    ids.forEach(async (id) => {
      const res = await axios.delete(`/api/images/${id}`);
      if (res.status !== 200) {
        toast.error("Something went wrong deleting images");
      } else {
        toast.success("Image deleted! " + id);
      }
    });
    setSelectedImages([]);
    setAlertOpen(false);
    router.refresh();
    setLoading(false);
  };

  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() => onDeleteSelectedImages(selectedImages)}
        loading={loading}
      />
      <ImageUploadModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onUpload={handleUpload}
        loading={loading}
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
        <div className="flex gap-x-8 items-center">
          <p className="text-xl font-semibold text-gray-400 items-center">
            Selected Pictures: {selectedImages.length}
          </p>
          <div className="flex gap-x-2 items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAlertOpen(true)}
              disabled={!selectedImages.length}
            >
              <Trash2 className="w-6 h-6 text-red-500" />
            </Button>
          </div>
        </div>
        {images.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => {
              const selected = selectedImages.includes(image.id);
              return (
                <div key={image.url}>
                  <ImageCard
                    image={image}
                    onDelete={onDeleteImage}
                    onSelect={onSelectImage}
                    loading={loading}
                    selected={selected}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-gray-500">No images yet</p>
          </div>
        )}
      </div>
      <div className="absolute mb-8 bottom-0 left-0 right-0 flex justify-center items-center z-30">
        <Button
          size="icon"
          className="shadow-lg bg-teal-600 hover:bg-teal-900"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
};

export default GalleryClient;
