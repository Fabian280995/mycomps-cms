"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CellLink } from "@/components/ui/cell-link";

export type LocationColumn = {
  id: string;
  url: string;
  name: string;
  addressId: string | null;
  fullAddress: string;
  createdAt: string;
};

export const columns: ColumnDef<LocationColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <CellLink
        url={`/locations/${row.original.id}`}
        name={row.original.name}
        mode="main"
      />
    ),
  },
  {
    accessorKey: "fullAddress",
    header: "Full Address",
    cell: ({ row }) => (
      <>
        {row.original.addressId ? (
          <CellLink
            url={`/addresses/${row.original.addressId}`}
            name={row.original.fullAddress}
            mode="link"
          />
        ) : (
          <span className="text-gray-400">Keine Adresse hinterlegt</span>
        )}
      </>
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
