"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CellLink } from "@/components/ui/cell-link";

export type SportColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<SportColumn>[] = [
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
