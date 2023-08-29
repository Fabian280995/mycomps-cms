import React from "react";
import { SlideWithImage } from "./slide-card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Edit, Loader, Trash } from "lucide-react";
import { fetchImage } from "@/lib/actions/images.actions";
import { Image as PrismaImage } from "@prisma/client";
import toast from "react-hot-toast";

interface Props {
  slide: SlideWithImage;
  onEdit: (slide: SlideWithImage) => void;
  onDelete: (slideId: string) => void;
  loading: boolean;
}

const BigSlideCard = ({ slide, onEdit, onDelete, loading }: Props) => {
  const [loadingImage, setLoadingImage] = React.useState(false);

  console.log("SLIDE", slide);

  /* React.useEffect(() => {
    async function loadImage(imageId: string) {
      setLoadingImage(true);
      try {
        const image = await fetchImage(imageId);
        slide.image = image as PrismaImage;
      } catch (error) {
        toast.error("Error while loading Image. Please contact your admin!");
      } finally {
        setLoadingImage(false);
      }
    }

    if (slide.imageId && !slide.image) {
      loadImage(slide.imageId);
    }

    if (slide.imageId && slide.image) {
      setLoadingImage(false);
    }
  }, [slide.imageId, slide.image]); */

  return (
    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
      {!loadingImage ? (
        <>
          {slide.image ? (
            <Image
              src={slide.image.url}
              layout="fill"
              objectFit="cover"
              alt={slide.title}
              className="group-hover:scale-110 transition-all "
            />
          ) : (
            <div className="flex-1 flex flex-col gap-2 items-center justify-center">
              <p className="text-sm text-gray-400">
                No image found for this slide...
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex-1 flex flex-col gap-2 items-center justify-center">
          <p className="text-sm text-gray-400">Loading image...</p>
        </div>
      )}
      <div className="absolute bottom-0 left-0 py-4 px-6">
        <h3 className="text-white text-3xl font-bold truncate drop-shadow-dark">
          {slide.title}
        </h3>
        <p className="text-white/90 text-lg drop-shadow-dark-sm px-1">
          {slide.description}
        </p>
      </div>
      <div className="absolute top-2 right-2 bg-white rounded-md shadow-md">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(slide)}
          type="button"
        >
          <Edit className="w-6 h-6" />
        </Button>
        <Button
          size="icon"
          variant="destructive"
          onClick={() => onDelete(slide.id)}
          type="button"
        >
          <Trash className="w-6 h-6" />
        </Button>
      </div>
      {loading ? (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <Loader className="w-8 h-8 text-white animate-spin" />
        </div>
      ) : null}
    </div>
  );
};

export default BigSlideCard;
