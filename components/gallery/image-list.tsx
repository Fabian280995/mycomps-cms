"use client";
import { Image } from "@prisma/client";
import React from "react";
import { AlertModal } from "../modals/alert-modal";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import ImageCard from "./image-card";
import { Button } from "../ui/button";
import { FolderSymlink, Loader, Trash } from "lucide-react";
import MoveImagesModal from "../modals/move-images-modal";
import { set } from "date-fns";

interface Props {
  images: Image[];
}

const ImageList = ({ images }: Props) => {
  const [selectedImages, setSelectedImages] = React.useState<Image[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [moveModalOpen, setMoveModalOpen] = React.useState(false);

  const router = useRouter();
  const params = useParams();

  const onSelectImage = (image: Image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages((prev) => prev.filter((img) => img !== image));
    } else {
      setSelectedImages((prev) => [...prev, image]);
    }
  };

  const onDeleteSelectedImages = (images: Image[]) => {
    setLoading(true);
    images.forEach(async (img) => {
      const res = await axios.delete(`/api/images/${img.id}`, {
        data: { key: img.key },
      });
      if (res.status !== 200) {
        toast.error(
          "Something went wrong... Please make sure to first remove all Slides using these images!"
        );
      } else {
        toast.success("Image deleted! " + img);
      }
    });
    setSelectedImages([]);
    setAlertOpen(false);
    router.push(`/gallery/${params.folderId}`);
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
      {moveModalOpen && (
        <MoveImagesModal
          images={selectedImages}
          isOpen={moveModalOpen}
          onClose={() => setMoveModalOpen(false)}
        />
      )}
      {images.length ? (
        <div className="space-y-4">
          <div
            className={`flex max-sm:flex-col items-center justify-between w-full`}
          >
            <p
              className={`text-xl font-semibold
            ${selectedImages.length ? "text-gray-500" : "text-gray-300"}
            `}
            >
              Selected Images: {selectedImages.length}
            </p>
            <div className={`flex items-center gap-2`}>
              <Button
                variant="outline"
                onClick={() => setMoveModalOpen(true)}
                disabled={!selectedImages.length}
              >
                <FolderSymlink className="w-5 h-5 mr-2" />
                In Ordner verschieben
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => setAlertOpen(true)}
                disabled={!selectedImages.length}
              >
                {loading ? (
                  <Loader className="w-5 h-5" />
                ) : (
                  <Trash className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => {
              const selected = selectedImages.includes(image);
              return (
                <div key={image.url}>
                  <ImageCard
                    image={image}
                    onSelect={onSelectImage}
                    loading={loading}
                    selected={selected}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-500">No images yet</p>
        </div>
      )}
    </>
  );
};

export default ImageList;
