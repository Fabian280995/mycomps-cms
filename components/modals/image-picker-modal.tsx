"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import ImagePicker from "../ui/image-picker";

interface ImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (imageId: string) => void;
  loading: boolean;
}

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  loading,
}) => {
  const [selectedImageId, setSelectedImageId] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  const handleSelectImage = (imageId: string) => {
    setSelectedImageId(imageId);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal title="Wähle ein passendes Logo" isOpen={isOpen} onClose={onClose}>
      <ImagePicker
        selectedImageId={selectedImageId}
        onSelectImage={handleSelectImage}
      />
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={loading || !selectedImageId}
          variant="destructive"
          onClick={() => onSelect(selectedImageId)}
        >
          Select
        </Button>
      </div>
    </Modal>
  );
};
