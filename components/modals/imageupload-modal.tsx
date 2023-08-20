"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { Loader } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
  loading: boolean;
}

export const ImageUploadModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onUpload,
  loading,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [image, setImage] = useState<any | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) {
        return;
      }

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        setImage(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onEnd = () => {
    onClose();
    setFiles([]);
    setImage(null);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Image Upload"
      description="Lade ein neues Bild hoch!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-[40%] aspect-square relative">
          {image ? (
            <Image
              src={image}
              alt="Uploading Image"
              fill
              priority
              className="rounded-3xl object-cover"
            />
          ) : (
            <div
              className="flex items-center justify-center w-full h-full border-2 border-gray-200 
            rounded-3xl border-dashed"
            >
              <p className="text-gray-200">kein Bild ausgewählt...</p>
            </div>
          )}
        </div>
        <Input
          type="file"
          accept="image/*"
          placeholder="Upload a photo"
          className="cursor-pointer hover:bg-gray-200"
          onChange={(e) => handleImage(e)}
        />
      </div>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onEnd}>
          Cancel
        </Button>
        <Button
          disabled={loading || !files.length}
          onClick={() => {
            onUpload(files);
            onEnd();
          }}
          className="bg-teal-600 hover:bg-teal-900"
        >
          {loading && (
            <div className="mr-2">
              <Loader className="w-6 h-6 animate-spin" />
            </div>
          )}
          Upload
        </Button>
      </div>
    </Modal>
  );
};
