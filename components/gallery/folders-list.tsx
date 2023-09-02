import { FolderWithImages } from "@/lib/actions/images.actions";
import { ImageFolder } from "@prisma/client";
import React from "react";
import FolderCard, { CardFolder } from "./folder-card";

interface Props {
  folders: CardFolder[] | null;
}

const FoldersList = ({ folders }: Props) => {
  return (
    <div>
      {folders ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <FolderCard key={folder.id} folder={folder} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full justify-center items-center">
          <p className="text-gray-400 font-semibold text-sm">No folders</p>
        </div>
      )}
    </div>
  );
};

export default FoldersList;
