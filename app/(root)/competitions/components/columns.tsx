"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CellLink } from "../../../../components/ui/cell-link";

export type CompetitionColumn = {
  id: string;
  name: string;
  date: string;
  sportId: string;
  sportName: string;
  locationId: string;
  locationName: string;
  organizerId: string;
  organizerName: string;
  createdAt: string;
};

export const columns: ColumnDef<CompetitionColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <CellLink
        url={`/competitions/${row.original.id}`}
        name={row.original.name}
        mode="main"
      />
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    header: "Sport",
    id: "sport",
    cell: ({ row }) => (
      <CellLink
        url={`/sport/${row.original.sportId}`}
        name={row.original.sportName}
      />
    ),
  },
  {
    header: "Location",
    id: "location",
    cell: ({ row }) => (
      <CellLink
        url={`/locations/${row.original.locationId}`}
        name={row.original.locationName}
      />
    ),
  },
  {
    header: "Organizer",
    id: "organizer",
    cell: ({ row }) => (
      <CellLink
        url={`/organizers/${row.original.organizerId}`}
        name={row.original.organizerName}
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
