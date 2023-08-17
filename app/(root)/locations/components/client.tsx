"use client";

import { LocationColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

interface LocationsClientProps {
  data: LocationColumn[];
}

export const LocationsClient: React.FC<LocationsClientProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
