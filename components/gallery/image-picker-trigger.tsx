import { fetchImage } from "@/lib/actions/images.actions";
import { Image as PrismaImage } from "@prisma/client";
import { tr } from "date-fns/locale";
import { get } from "http";
import { Loader } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ImagePickerModal } from "../modals/image-picker-modal";
import { set } from "date-fns";

interface Props {
  imageId: string;
  onImageChange: (imageId: string) => void;
}

const ImagePickerTrigger = ({ imageId, onImageChange }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<PrismaImage | null>(null);

  const getImage = async () => {
    try {
      setLoading(true);
      const image = await fetchImage(imageId);
      setImage(image);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (imageId: string) => {
    onImageChange(imageId);
    setModalOpen(false);
  };

  useEffect(() => {
    if (imageId) {
      getImage();
    }
  }, [imageId]);

  return (
    <>
      <ImagePickerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelect}
        loading={loading}
      />
      <button
        type="button"
        className="relative w-32 h-32 border rounded-xl overflow-hidden bg-gray-100"
        onClick={() => setModalOpen(true)}
      >
        {image ? (
          <Image
            src={image?.url as string}
            alt={image?.url as string}
            fill
            sizes="100%"
            className="object-cover object-center"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-gray-400">No Image</p>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Loader className="text-white animate-spin" />
          </div>
        )}
      </button>
    </>
  );
};

export default ImagePickerTrigger;
