"use client";
import React from "react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import {
  Edit,
  Edit2,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Trash,
  X,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AlertModal } from "../modals/alert-modal";
import { set } from "date-fns";

interface Props {
  id: string;
  title: string;
  isPublished: boolean;
  onCreateNewSlide: () => void;
  loading: boolean;
}

const SlideshowHeader = ({
  id,
  title,
  isPublished,
  onCreateNewSlide,
  loading,
}: Props) => {
  const [name, setName] = React.useState(title);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [updatingSlide, setUpdatingSlide] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const router = useRouter();

  const handlePublish = async () => {
    try {
      setUpdatingSlide(true);
      await axios.patch(`/api/slideshows/${id}`, {
        name: name,
        isPublished: !isPublished,
      });
      toast.success("Slideshow updated.");
    } catch (error) {
      toast.error("Failed to update slideshow.");
    } finally {
      setUpdatingSlide(false);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    try {
      setUpdatingSlide(true);
      await axios.delete(`/api/slideshows/${id}`);
      toast.success("Slideshow deleted.");
      setAlertOpen(false);
      router.push("/news/slideshows");
    } catch (error) {
      toast.error("Failed to delete slideshow.");
    } finally {
      setUpdatingSlide(false);
    }
  };

  const onUpdate = async (id: string, name: string) => {
    try {
      setUpdatingSlide(true);
      await axios.patch(`/api/slideshows/${id}`, { name, isPublished });
      toast.success("Slideshow updated successfully.");
    } catch (error) {
      toast.error("Something went wrong updating the slideshow.");
    } finally {
      setEditMode(false);
      setUpdatingSlide(false);
    }
  };

  return (
    <>
      <AlertModal
        title="Achtung! Möchtest du das wirklich tun?"
        description="Beim löschen dieser Slideshow werden auch alle zugehörigen Slides gelöscht!
        Diese Aktion kann nicht rückgängig gemacht werden."
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={handleDelete}
        loading={updatingSlide}
      />

      <div className="flex flex-col md:flex-row w-full md:justify-between md:items-center gap-4">
        <div className="flex gap-4 items-center max-md:flex-row-reverse">
          <div>
            {updatingSlide || loading ? (
              <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
            ) : (
              <Switch
                checked={isPublished}
                onCheckedChange={handlePublish}
                disabled={updatingSlide || loading}
              />
            )}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-2xl font-semibold text-gray-700 px-4 py-2 rounded-xl transition-all
            disabled:bg-transparent focus:shadow-md focus:outline-none w-full"
              disabled={!editMode || loading}
            />
            {editMode && name !== title ? (
              <Button
                size="icon"
                variant="outline"
                onClick={() => onUpdate(id, name)}
                className="hover:bg-gray-200 ml-2"
              >
                {loading || updatingSlide ? (
                  <Loader2 className="w-6 h-6 text-gray-700 animate-spin" />
                ) : (
                  <Save className="w-6 h-6 text-gray-700" />
                )}
              </Button>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setEditMode(!editMode)}
            className="hover:bg-gray-200"
          >
            {editMode ? (
              <X className="w-6 h-6" />
            ) : (
              <Edit className="w-6 h-6" />
            )}
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={() => setAlertOpen(true)}
          >
            <Trash className="w-6 h-6" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onCreateNewSlide}
            disabled={updatingSlide || loading}
            type="button"
          >
            <ImagePlus className="w-6 h-6 mr-2" />
            Add a Slide
          </Button>
        </div>
      </div>
    </>
  );
};

export default SlideshowHeader;
