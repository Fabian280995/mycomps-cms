import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { set } from "date-fns";
import axios from "axios";
import { ImageFolder, Image as PImage } from "@prisma/client";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

interface Props {
  images: PImage[];
  isOpen: boolean;
  onClose: () => void;
}

const MoveImagesModal = ({ images, isOpen, onClose }: Props) => {
  const [folderId, setFolderId] = useState<string>("");
  const [folders, setFolders] = useState<ImageFolder[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const onUpdate = async () => {
    setLoading(true);
    images.forEach(async (image) => {
      try {
        await axios.patch(`/api/images/${image.id}`, {
          folderId,
        });
      } catch (error) {
        toast.error("Something went wrong moving image with id: " + image.id);
      }
    });
    setLoading(false);
    window.location.replace(`/gallery/${params.folderId}`);
  };

  const handleClose = () => {
    setLoading(false);
    onClose();
  };

  const getFolders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/folders`);
      setFolders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFolders();
    setIsMounted(true);
  }, []);

  if (!images || images.length <= 0) return null;
  if (!isMounted) return null;

  return (
    <Modal title="Verschiebe Bilder" isOpen={isOpen} onClose={handleClose}>
      <div className="space-y-4">
        <div className="flex gap-2 items-center flex-wrap w-full">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-gray-200 rounded-lg w-8 h-8 relative overflow-hidden"
            >
              <Image
                src={image.url}
                alt="Image"
                fill
                quality={30}
                className="rounded-md"
              />
            </div>
          ))}
        </div>
        {!loading ? (
          <div className="w-full">
            <Select
              disabled={loading}
              value={folderId}
              onValueChange={(value) => setFolderId(value)}
              defaultValue={folderId}
            >
              <SelectTrigger>
                <SelectValue
                  defaultValue={folderId}
                  placeholder="Wähle einen Ordner ..."
                ></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {folders.map((item) => (
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
            <p className="text-gray-500">loading folder...</p>
          </div>
        )}
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button disabled={loading} variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={onUpdate}
            className="bg-teal-500 hover:bg-teal-800"
          >
            Move
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MoveImagesModal;
