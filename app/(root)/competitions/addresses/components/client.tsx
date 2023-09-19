"use client";

import AddButton from "@/components/ui/add-button";
import { AddressColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";

interface Props {
  data: AddressColumn[];
}

export const AddressesClient: React.FC<Props> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        searchKey="street"
        AddNewButton={() => (
          <AddButton destination="competitions/addresses" name="Adresse" />
        )}
      />
    </>
  );
};
