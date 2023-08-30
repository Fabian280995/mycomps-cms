"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CellLink } from "@/components/ui/cell-link";
import CellImage from "@/components/ui/cell-image";

export type SportColumn = {
  id: string;
  name: string;
  createdAt: string;
  image: {
    id: string;
    url: string;
  } | null;
};

export const columns: ColumnDef<SportColumn>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <CellImage
        image={{
          id: row.original.image?.id || "",
          url: row.original.image?.url || "",
        }}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <CellLink
        url={`/sport/${row.original.id}`}
        name={row.original.name}
        mode="main"
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
