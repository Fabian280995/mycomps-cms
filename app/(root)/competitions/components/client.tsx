"use client";

import { CompetitionColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

interface Props {
  data: CompetitionColumn[];
}

export const CompetitionsClient: React.FC<Props> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="h-full mb-[10rem]">
      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
};
