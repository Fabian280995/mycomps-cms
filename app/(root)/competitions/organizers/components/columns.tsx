"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CellLink } from "@/components/ui/cell-link";

export type OrganizerColumn = {
  id: string;
  name: string;
  url: string;
  addressId: string | null;
  fullAddress: string;
  createdAt: string;
};

export const columns: ColumnDef<OrganizerColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <CellLink
        url={`/organizers/${row.original.id}`}
        name={row.original.name}
        mode="main"
      />
    ),
  },
  {
    accessorKey: "fullAddress",
    header: "Full Address",
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
