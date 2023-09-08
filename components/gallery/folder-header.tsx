"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { Ban, ChevronLeft, Edit, Loader, Save, Trash, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "date-fns";

interface Props {
  id: string;
  title: string;
}

const FolderHeader = ({ id, title }: Props) => {
  const [name, setName] = React.useState(title);
  const [editMode, setEditMode] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onEditEnd = () => {
    setEditMode(!editMode);
    if (name !== title) {
      setName(title);
    }
  };

  const onUpdate = async (id: string, name: string) => {
    try {
      setLoading(true);
      await axios.patch(`/api/folders/${id}`, { name });
      router.refresh();
      toast.success("Folder updated successfully.");
    } catch (error) {
      toast.error("Something went wrong updating the folder.");
    } finally {
      setEditMode(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center select-none">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => router.back()}
            className="hover:bg-gray-200 transition-all duration-500 group"
          >
            <ChevronLeft
              className="w-8 h-8 text-gray-700 transition
            group-hover:translate-x-0 translate-x-1 duration-500"
            />
          </Button>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-3xl font-semibold text-gray-700 px-4 py-2 rounded-xl transition-all
          disabled:bg-transparent focus:shadow-md focus:outline-none focus:-translate-y-1
          focus:scale-[1.02] "
            disabled={!editMode || loading}
          />
          {editMode && name !== title ? (
            <Button
              size="icon"
              variant="outline"
              onClick={() => onUpdate(id, name)}
              className="hover:bg-gray-200"
            >
              {loading ? (
                <Loader className="w-6 h-6 text-gray-700 animate-spin" />
              ) : (
                <Save className="w-6 h-6 text-gray-700" />
              )}
            </Button>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="outline"
            onClick={onEditEnd}
            className="hover:bg-gray-200"
          >
            {editMode ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Edit className="w-6 h-6 text-gray-700" />
            )}
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={() => null}
            className="hover:bg-gray-200"
          >
            <Trash className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Ban className="w-5 h-5 text-red-500 drop-shadow-dark-sm" />
        <p className="text-sm"> - No filekey available.</p>
      </div>
    </div>
  );
};

export default FolderHeader;
