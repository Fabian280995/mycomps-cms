import { Image as PrismaImage } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Check, Sticker, Trash } from "lucide-react";
import { AlertModal } from "../modals/alert-modal";
import { cn } from "@/lib/utils";

interface Props {
  image: PrismaImage;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  selected: boolean;
  loading: boolean;
}

const ImageCard = ({ image, onDelete, onSelect, selected, loading }: Props) => {
  const [alertOpen, setAlertOpen] = React.useState(false);
  return (
    <>
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={() => onDelete(image.id)}
        loading={loading}
      />
      <div
        className="group relative w-full aspect-square overflow-hidden rounded-3xl shadow-md
          cursor-pointer"
      >
        <Image
          src={image.url}
          alt={image.url}
          fill
          priority
          className="object-cover object-center"
        />

        <div
          className="group-hover:flex justify-end p-4 hidden 
          absolute inset-0 bg-black/20 w-full h-full z-30"
        >
          <Button
            size="icon"
            variant="destructive"
            className="shadow-sm hover:opacity-80"
            onClick={() => setAlertOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>

        <Button
          size="icon"
          variant="outline"
          disabled={loading}
          onClick={() => onSelect(image.id)}
          className={cn(
            "absolute top-4 left-4 z-50 border-gray-100/30",
            selected
              ? "bg-teal-600/60 hover:bg-teal-600/100"
              : "bg-white/20 hover:bg-white/80"
          )}
        >
          {selected ? <Check className="w-4 h-4 text-white" /> : null}
        </Button>
      </div>
    </>
  );
};

export default ImageCard;
