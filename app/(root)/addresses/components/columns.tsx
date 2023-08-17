"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type AddressColumn = {
  id: string;
  country: string;
  state: string;
  street: string;
  city: string;
  createdAt: string;
};

export const columns: ColumnDef<AddressColumn>[] = [
  {
    accessorKey: "country",
    header: "Land",
  },
  {
    accessorKey: "state",
    header: "Bundesland",
  },
  {
    accessorKey: "street",
    header: "Straße",
  },
  {
    accessorKey: "city",
    header: "Stadt",
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
