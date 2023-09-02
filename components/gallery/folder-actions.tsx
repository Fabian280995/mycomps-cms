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
  Trash,
} from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
  data: CardFolder;
}

const FolderActions = ({ data }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`${id}: ID copied to clipboard`);
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/folders/${id}`);
      router.refresh();
      window.location.reload();
      toast.success("Folder deleted successfully.");
    } catch (error) {
      toast.error(
        "Something went wrong. Please make sure to delete all Images first!"
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onOpen = (id: string) => {
    router.push(`${pathname}/${id}`);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(data.id)}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Donut className="h-6 w-6 text-gray-700" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onOpen(data.id)}>
            <FolderOpen className="mr-2 h-4 w-4" />
            Open
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => null}>
            <Edit className="mr-2 h-4 w-4" />
            Update
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

export default FolderActions;
