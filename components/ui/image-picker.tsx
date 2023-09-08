import {
  fetchFolderWithImages,
  fetchFolders,
  fetchImages,
  fetchImagesByFolderId,
} from "@/lib/actions/images.actions";
import { ImageFolder, Image as PrismaImage } from "@prisma/client";
import Image from "next/image";
import React, { useEffect } from "react";
import { CardFolder } from "../gallery/folder-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Loader } from "lucide-react";

interface Props {
  selectedImageId: string;
  onSelectImage: (imageId: string) => void;
  defaultFolder?: string;
}

const ImagePicker = ({
  selectedImageId,
  onSelectImage,
  defaultFolder,
}: Props) => {
  const [selectedFolderId, setSelectedFolderId] = React.useState<string>("");
  const [folders, setFolders] = React.useState<ImageFolder[]>([]);
  const [images, setImages] = React.useState<PrismaImage[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getImages = async (folderId: string) => {
    setLoading(true);
    try {
      const images = await fetchImagesByFolderId(folderId);
      setImages(images);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getFolders = async () => {
    setLoading(true);
    try {
      const folders = await fetchFolders();
      setFolders(folders);
      if (defaultFolder)
        setSelectedFolderId(
          folders.find(
            (f) => f.name.toLowerCase() === defaultFolder.toLowerCase()
          )?.id as string
        );
      else setSelectedFolderId(folders[0].id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFolders();
  }, []);

  useEffect(() => {
    if (!selectedFolderId) return;
    getImages(selectedFolderId);
  }, [selectedFolderId]);

  if (!images) return <div>No images found.</div>;

  return (
    <div className="w-full space-y-4">
      {!loading ? (
        <div className="w-full">
          <Select
            disabled={loading}
            value={selectedFolderId}
            onValueChange={(value) => setSelectedFolderId(value)}
            defaultValue={selectedFolderId}
          >
            <SelectTrigger>
              <SelectValue
                defaultValue={selectedFolderId}
                placeholder="Wähle einen Ordner ..."
              ></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {folders &&
                folders.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.id}
                    className="truncate"
                  >
                    {item.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <Loader className="w-6 h-6 animate-spin mr-2" />
          <p className="text-gray-500">loading ...</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-h-52 overflow-y-auto no-scrollbar">
        {images.map((image) => {
          const selected = image.id === selectedImageId;
          return (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden"
              onClick={() => onSelectImage(image.id)}
            >
              <Image
                src={image.url}
                fill
                sizes="100%"
                alt={image.id}
                className="hover:scale-110 transition-all cursor-pointer object-cover object-center"
              />
              {selected && <div className="absolute inset-0 border-2  m-2" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImagePicker;
