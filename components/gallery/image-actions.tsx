import React from "react";
import { CardFolder } from "./folder-card";
import { AlertModal } from "../modals/alert-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Copy,
  Donut,
  Edit,
  FolderOpen,
  MoreHorizontal,
  MoreVertical,
  Trash,
} from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Image } from "@prisma/client";

interface Props {
  data: Image;
}

const ImageActions = ({ data }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`${id}: ID copied to clipboard`);
  };

  const onDelete = async (id: string, key: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/images/${id}`, {
        data: { key },
      });
      toast.success("Image deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error(
        "Something went wrong. Please make sure to delete all Slides using this Image first!"
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onOpen = (id: string) => {
    router.push(`/gallery/images/${id}`);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(data.id, data.key)}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 group/trigger hover:bg-white/20 transition-none"
          >
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-6 w-6 text-white/70 group-hover/trigger:text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onOpen(data.id)}>
            <FolderOpen className="mr-2 h-4 w-4" />
            Open
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ImageActions;
