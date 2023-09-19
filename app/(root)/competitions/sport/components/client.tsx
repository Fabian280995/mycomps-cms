"use client";

import AddButton from "@/components/ui/add-button";
import { SportColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

interface SportsClientProps {
  data: SportColumn[];
}

export const SportsClient: React.FC<SportsClientProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      AddNewButton={() => (
        <AddButton destination="competitions/sport" name="Sportart" />
      )}
    />
  );
};
