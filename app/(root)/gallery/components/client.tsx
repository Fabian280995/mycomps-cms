"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { ImageUploadModal } from "@/components/modals/imageupload-modal";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { currentUser } from "@clerk/nextjs";
import { Image as PrismaImage } from "@prisma/client";
import axios from "axios";
import { Plus, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  images: PrismaImage[];
}

const GalleryClient = ({ images }: Props) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const { startUpload } = useUploadThing("media");

  const handleUpload = async (files: File[]) => {
    setLoading(true);
    const imgRes = await startUpload(files);

    if (imgRes && imgRes[0].url) {
      await axios.post(`/api/images`, {
        url: imgRes[0].url,
      });
      toast.success("Image uploaded");
      router.refresh();
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
    setModalOpen(false);
  };

  return (
    <>
      <ImageUploadModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          router.refresh();
        }}
        onUpload={handleUpload}
        loading={loading}
      />
      <div className="max-w-5xl mx-auto mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length ? (
            images.map((image) => {
              const onDelete = async () => {
                setLoading(true);
                await axios.delete(`/api/images/${image.id}`);
                toast.success("Image deleted");
                router.refresh();
                setLoading(false);
                setAlertOpen(false);
              };
              return (
                <div key={image.url}>
                  <AlertModal
                    isOpen={alertOpen}
                    onClose={() => setAlertOpen(false)}
                    onConfirm={() => onDelete()}
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
                    <div className="group-hover:flex justify-end p-4 hidden absolute inset-0 bg-black/20 w-full h-full">
                      <Button
                        size="icon"
                        variant="destructive"
                        className="shadow-sm hover:opacity-80"
                        onClick={() => setAlertOpen(true)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-gray-500">No images yet</p>
            </div>
          )}
        </div>
        <div className="absolute mb-8 bottom-0 left-0 right-0 flex justify-center items-center">
          <Button
            size="icon"
            className="shadow-lg bg-teal-600 hover:bg-teal-900"
            onClick={() => setModalOpen(true)}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default GalleryClient;
